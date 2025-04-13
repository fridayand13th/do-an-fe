import { useRouter } from "next/router";
import { useMemo } from "react";

const useSearchParams = () => {
  const router = useRouter();
  const { query } = router;

  const currentPage = useMemo(() => {
    return Number(query.page) || 1;
  }, [query.page]);

  const perPage = useMemo(() => {
    const perPageValue = Number(query.perPage) || 6;
    return perPageValue > 48 ? 48 : perPageValue;
  }, [query.perPage]);

  return { router, currentPage, perPage };
};

export default useSearchParams;
