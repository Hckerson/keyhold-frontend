import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListingLoading() {
    return (
        <Container className="py-8">
            <div className="flex w-full flex-col gap-6">
                <Skeleton className="h-[300px] w-full rounded-xl md:h-[460px]" />

                <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map((thumb) => (
                        <Skeleton
                            key={thumb}
                            className="h-16 w-24 shrink-0 rounded-lg"
                        />
                    ))}
                </div>

                <Skeleton className="h-24 w-full rounded-xl" />

                <div className="detail-split gap-8">
                    <div className="detail-main flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {[0, 1, 2, 3, 4, 5].map((fact) => (
                                <Skeleton
                                    key={fact}
                                    className="h-16 rounded-lg"
                                />
                            ))}
                        </div>
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-48 w-full rounded-xl" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-56 w-full rounded-xl" />
                        <Skeleton className="h-56 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </Container>
    );
}
