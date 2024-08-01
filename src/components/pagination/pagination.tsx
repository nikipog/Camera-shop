import { useAppSelector } from '../../hooks/store';
import { selectCurrentPage, selectTotalPages } from '../../store/selectors/pagination-selectors';
import { Link } from 'react-router-dom';
import PaginationTextButton from '../pagination-text-button/pagination-text-button';
import { PaginationConstant } from '../../const';

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
    if (totalPages <= PaginationConstant.PagesPerGroup) {
      visiblePages = Array.from({ length: totalPages }, (_, i) => i + PaginationConstant.FirstPage);
    } else {
      const currentRangeStart = Math.floor((currentPage - PaginationConstant.FirstPage) / PaginationConstant.PagesPerGroup) * PaginationConstant.PagesPerGroup + PaginationConstant.FirstPage;
      const currentRangeEnd = Math.min(currentRangeStart + PaginationConstant.AdditionalPages, totalPages);

      visiblePages = Array.from({ length: currentRangeEnd - currentRangeStart + PaginationConstant.FirstPage }, (_, i) => currentRangeStart + i);
    }
  }


  const currentGroupIndex = Math.floor((currentPage - PaginationConstant.FirstPage) / PaginationConstant.PagesPerGroup);
  const totalGroups = totalPages !== null ? Math.ceil(totalPages / PaginationConstant.PagesPerGroup) : PaginationConstant.NoGroups;

  const hasNextPageRange = currentGroupIndex < totalGroups - PaginationConstant.FirstPage;
  const hasPreviousPageRange = currentGroupIndex > PaginationConstant.NoGroups;

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
