import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.max(1, Math.ceil(total / perPage));
  const isFirst = currentPage === 1;
  const isLast = currentPage === pagesCount;

  const pages: number[] = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const goTo = (page: number) => {
    if (page < 1 || page > pagesCount || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFirst) {
      goTo(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLast) {
      goTo(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      {/* Prev */}
      <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst ? 'true' : 'false'}
          onClick={handlePrev}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              goTo(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${isLast ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast ? 'true' : 'false'}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
