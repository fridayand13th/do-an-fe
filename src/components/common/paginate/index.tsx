import styles from '@styles/components/page-list.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';

export interface IPaginateProps {
  totalPage: number;
}

export default function Paginate({ totalPage = 100 }: Readonly<IPaginateProps>) {
  const router = useRouter();
  const { query } = router;
  const currentPage = Number(query.page) || 1;
  const [pages, setPages] = useState<number[]>([]);
  const displayedAmount = 7;

  const canMovePre = useMemo(() => currentPage > 1, [currentPage]);
  const canMoveNext = useMemo(() => currentPage < totalPage, [currentPage, totalPage]);

  function onClickPage(page: number) {
    if (currentPage !== page) {
      router.push({ query: { ...query, page: String(page) } });
    }
  }

  function onClickPrePage() {
    if (canMovePre) {
      onClickPage(currentPage - 1);
    }
  }

  function onClickNextPage() {
    if (canMoveNext) {
      onClickPage(currentPage + 1);
    }
  }

  function onClickFirstPage() {
    if (canMovePre) {
      onClickPage(1);
    }
  }

  function onClickLastPage() {
    if (canMoveNext) {
      onClickPage(totalPage);
    }
  }

  useEffect(() => {
    const displayedPages = [];
    const pageEachSide = Math.floor(displayedAmount / 2);

    // Total pages less than the displayed amount
    if (totalPage <= displayedAmount) {
      for (let i = 1; i <= totalPage; i++) {
        displayedPages.push(i);
      }
    }
    // First pages
    else if (currentPage <= pageEachSide + 1) {
      for (let i = 1; i <= displayedAmount; i++) {
        displayedPages.push(i);
      }
    }
    // Last pages
    else if (currentPage > totalPage - pageEachSide) {
      for (let i = totalPage - displayedAmount + 1; i <= totalPage; i++) {
        displayedPages.push(i);
      }
    }
    // Middle pages
    else {
      for (let i = currentPage - pageEachSide; i <= currentPage + pageEachSide; i++) {
        displayedPages.push(i);
      }
    }

    setPages(displayedPages);
  }, [currentPage, totalPage, displayedAmount]);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationWrapper}>
        {/* Prev Button */}
        {canMovePre && (
          <div className={styles.paginationControlWrapper}>
            <>
              <button className={styles.paginationIconWrapper} onClick={onClickFirstPage}>
                <RxDoubleArrowLeft size="18" />
              </button>
              <button className={styles.paginationIconWrapper} onClick={onClickPrePage}>
                <MdKeyboardArrowLeft size="18" />
              </button>
            </>
          </div>
        )}
        {/* Page Button */}
        <ul className={styles.paginationNumberContainer}>
          {pages.map((num) => (
            <li
              key={num}
              className={`${styles.paginationNumber}${currentPage === num ? ' ' + styles.select : ''}`}
              onClick={() => onClickPage(num)}
            >
              {num}
            </li>
          ))}
        </ul>
        {/* Next Button */}
        {canMoveNext && (
          <div className={styles.paginationControlWrapper}>
            <button className={styles.paginationIconWrapper} onClick={onClickNextPage}>
              <MdKeyboardArrowRight size="18" />
            </button>
            <button className={styles.paginationIconWrapper} onClick={onClickLastPage}>
              <RxDoubleArrowRight size="18" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
