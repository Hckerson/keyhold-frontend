const FIRST_PAGE = 1;
const PAGE_SIZE = 100;

export interface Paging {
    page: number;
    limit: number;
}

export const allPages = async <T>(
    fetchPage: (paging: Paging) => Promise<{ items: T[]; pageCount: number }>,
) => {
    const first = await fetchPage({ page: FIRST_PAGE, limit: PAGE_SIZE });
    const rest = await Promise.all(
        Array.from({ length: first.pageCount - FIRST_PAGE }, (_, index) =>
            fetchPage({ page: FIRST_PAGE + index + 1, limit: PAGE_SIZE }),
        ),
    );
    return [first, ...rest].flatMap((page) => page.items);
};
