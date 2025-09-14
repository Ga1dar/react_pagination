interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);

  const pages: number[] = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const goTo = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= pagesCount) {
      onPageChange(page);
    }
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === pagesCount;

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={e => {
            e.preventDefault();
            if (!isFirst) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(p => (
        <li
          key={p}
          className={`page-item ${p === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${p}`}
            onClick={e => {
              e.preventDefault();
              goTo(p);
            }}
          >
            {p}
          </a>
        </li>
      ))}

      <li className={`page-item ${isLast ? 'disable' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={e => {
            e.preventDefault();
            if (!isLast) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
