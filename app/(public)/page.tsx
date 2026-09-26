import { Reveal } from "@/components/patterns/reveal";
import { HeroSection } from "@/components/sections/home/hero";
import { PremierListing } from "@/components/sections/home/premier-listing";
import { FeaturedGallery } from "@/components/sections/home/featured-gallery";
import { ListingsUnavailable } from "@/components/sections/home/listings-unavailable";
import { BrowseIndex } from "@/components/sections/home/browse-index";
import { JustListed } from "@/components/sections/home/just-listed";
import { StatsBand } from "@/components/sections/home/stats-band";
import { GuaranteesSection } from "@/components/sections/home/guarantees";
import { ConciergeSection } from "@/components/sections/home/concierge";
import { LatestSales } from "@/components/sections/home/latest-sales";
import { CtaBanner } from "@/components/sections/home/cta-banner";
import { propertiesServerAPI } from "@/lib/api/server";
import { toListing } from "@/lib/utils/to-listing";
import { toGalleryTile } from "@/lib/utils/to-gallery-tile";
import { hasSoldAt, toLatestSale } from "@/lib/utils/to-latest-sale";
import {
    HOME_FACET_FILTERS,
    HOME_FACET_OPTIONS,
    HOME_QUERIES,
    MIN_HOME_STATS,
    selectJustListed,
    selectPopularCities,
    selectShowcase,
    toHomeStats,
} from "@/lib/data/home";
import { toBrowseGroups } from "@/lib/data/home-browse";

export const metadata = {
    title: "Home | Luxury Real Estate Marketplace",
    description:
        "A quiet, considered approach to extraordinary property — estates, villas and penthouses, presented with discretion.",
};

export default async function Home() {
    const [promoted, popular, newest, sold, facets, localityCounts] =
        await Promise.all([
            propertiesServerAPI.list(HOME_QUERIES.promoted),
            propertiesServerAPI.list(HOME_QUERIES.popular),
            propertiesServerAPI.list(HOME_QUERIES.newest),
            propertiesServerAPI.list(HOME_QUERIES.sold),
            propertiesServerAPI.facets(HOME_FACET_FILTERS, HOME_FACET_OPTIONS),
            propertiesServerAPI.localities(),
        ]);

    const unavailable = promoted === null && popular === null;
    const localities = localityCounts ?? [];
    const showcase = selectShowcase(
        promoted?.items ?? [],
        popular?.items ?? [],
    );
    const premier = showcase[0];
    const gallery = showcase.map(toGalleryTile);
    const justListed = selectJustListed(newest?.items ?? [], showcase).map(
        toGalleryTile,
    );
    const browseGroups = toBrowseGroups(facets, localities);
    const sales = (sold?.items ?? []).filter(hasSoldAt).map(toLatestSale);
    const stats = toHomeStats({
        available: newest?.total,
        sold: sold?.total,
        localities: localityCounts?.length,
    });

    return (
        <>
            <HeroSection cities={selectPopularCities(localities)} />
            {unavailable && <ListingsUnavailable />}
            {premier && (
                <Reveal>
                    <PremierListing listing={toListing(premier)} />
                </Reveal>
            )}
            {gallery.length > 0 && (
                <Reveal>
                    <FeaturedGallery tiles={gallery} />
                </Reveal>
            )}
            {browseGroups.length > 0 && (
                <Reveal>
                    <BrowseIndex groups={browseGroups} />
                </Reveal>
            )}
            {justListed.length > 0 && (
                <Reveal>
                    <JustListed tiles={justListed} />
                </Reveal>
            )}
            <Reveal>
                <ConciergeSection />
            </Reveal>
            {stats.length >= MIN_HOME_STATS && (
                <Reveal>
                    <StatsBand stats={stats} />
                </Reveal>
            )}
            <Reveal>
                <GuaranteesSection />
            </Reveal>
            {sales.length > 0 && (
                <Reveal>
                    <LatestSales sales={sales} />
                </Reveal>
            )}
            <Reveal>
                <CtaBanner />
            </Reveal>
        </>
    );
}
