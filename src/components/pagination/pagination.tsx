import { useAppSelector } from '../../hooks/store';
import { selectCurrentPage, selectTotalPages } from '../../store/selectors/pagination-selectors';
import { Link } from 'react-router-dom';
import PaginationTextButton from '../pagination-text-button/pagination-text-button';
import { PaginationConstants } from '../../const';

type PaginationProps = {
  onPageChange: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const PaginationTextButtonDirections = {
  Previous: 'prev',
  Next : 'next'
} as const;


const Pagination = ({ onPageChange }: PaginationProps): JSX.Element => {
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);

  let visiblePages: number[] = [];

  if (totalPages !== null) {
    if (totalPages <= PaginationConstants.PagesPerGroup) {
      visiblePages = Array.from({ length: totalPages }, (_, i) => i + PaginationConstants.FirstPage);
    } else {
      const currentRangeStart = Math.floor((currentPage - PaginationConstants.FirstPage) / PaginationConstants.PagesPerGroup) * PaginationConstants.PagesPerGroup + PaginationConstants.FirstPage;
      const currentRangeEnd = Math.min(currentRangeStart + PaginationConstants.AdditionalPages, totalPages);

      visiblePages = Array.from({ length: currentRangeEnd - currentRangeStart + PaginationConstants.FirstPage }, (_, i) => currentRangeStart + i);
    }
  }


  const currentGroupIndex = Math.floor((currentPage - PaginationConstants.FirstPage) / PaginationConstants.PagesPerGroup);
  const totalGroups = totalPages !== null ? Math.ceil(totalPages / PaginationConstants.PagesPerGroup) : PaginationConstants.NoGroups;

  const hasNextPageRange = currentGroupIndex < totalGroups - PaginationConstants.FirstPage;
  const hasPreviousPageRange = currentGroupIndex > PaginationConstants.NoGroups;

  return (

    <div className="pagination">
      <ul className="pagination__list">
        {
          hasPreviousPageRange &&
          totalPages !== null &&
          (
            <PaginationTextButton
              type={PaginationTextButtonDirections.Previous}
              onPageChange={onPageChange}
            />
          )
        }
        {visiblePages.map((page) => (
          <li key={page} className="pagination__item"
            data-page={page}
            onClick={onPageChange}
          >
            <Link
              className={`pagination__link ${currentPage === page ? 'pagination__link--active' : ''}`}
              to={`?page=${page}`}
            >
              {page}
            </Link>
          </li>
        ))}
        {hasNextPageRange && (
          <PaginationTextButton
            type={PaginationTextButtonDirections.Next}
            onPageChange={onPageChange}
          />
        )}

      </ul>
    </div>

  );
};


export default Pagination;
