import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { selectCurrentPage, selectTotalPages } from '../../store/selectors/pagination-selectors';
import { PaginationConstant } from '../../const';

type PaginationTextButton = {
  type: string;
  onPageChange: (event: React.MouseEvent<HTMLLIElement>) => void;

}


function PaginationTextButton({ type, onPageChange }: PaginationTextButton): JSX.Element {
  const currentPage = useAppSelector(selectCurrentPage);

  const totalPages = useAppSelector(selectTotalPages);
  // Определяем начало текущего диапазона страниц, округляя текущую страницу вниз до ближайшей группы по три, и преобразуем в 1-индексированный формат.
  const currentRangeStart = Math.floor((currentPage - PaginationConstant.FirstPage) / PaginationConstant.PagesPerGroup) * PaginationConstant.PagesPerGroup + PaginationConstant.FirstPage;

  // Определение новой страницы в зависимости от типа кнопки
  let newPage: number;
  if (type === 'prev') {
    newPage = currentRangeStart - PaginationConstant.PagesPerGroup;
  } else {
    newPage = currentRangeStart + PaginationConstant.PagesPerGroup;
  }

  // Убедимся, что новая страница не выходит за пределы диапазона страниц
  if (newPage < PaginationConstant.FirstPage) {
    newPage = PaginationConstant.FirstPage;
  }
  if (totalPages !== null && newPage > totalPages) {
    newPage = totalPages;
  }

  return (

    <li
      className="pagination__item"
      data-type={type}
      data-page={newPage}
      onClick={onPageChange}
    >
      <Link
        className="pagination__link pagination__link--text"
        to={`?page=${newPage}`}
      >
        {type === 'prev' ? 'Назад' : 'Далее'}
      </Link>
    </li>
  );
}


export default PaginationTextButton;
