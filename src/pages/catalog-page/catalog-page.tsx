import { memo, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import CatalogCardsContainer from '../../components/catalog-cards-container/catalog-cards-container';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import { selectProducts, selectProductsStatus } from '../../store/selectors/products-selectors';
import { setPriceRange } from '../../store/slices/filters/filter';
import { useModalContext } from '../../hooks/modal-context';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useSelectedProduct } from '../../hooks/select-product';
import { scrollController } from '../../utils/scroll-controller';
import { Product } from '../../types/product';
import { EmptyFilters, RequestStatus, SortTypesAndOrder } from '../../const';
import CatalogSort from '../../components/catalog-sort/cataog-sort';
import { selectFilters } from '../../store/selectors/filter-selectors';
import { selectSort } from '../../store/selectors/sort-selectors';
import Pagination from '../../components/pagination/pagination';
import { selectCurrentPage, selectMaxProductsPerPage } from '../../store/selectors/pagination-selectors';
import { setCurrentPage, setTotalPages } from '../../store/slices/pagination/pagination';
import { useLocation, useNavigate } from 'react-router-dom';


const CatalogPage = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const currentPage = useAppSelector(selectCurrentPage);
  const navigate = useNavigate();
  const location = useLocation();


  const maxProductsPerPage = useAppSelector(selectMaxProductsPerPage);

  const { openModal } = useModalContext();
  const { setSelectedProduct } = useSelectedProduct();

  const handleBuyButtonClick = (modalName: string, product: Product) => {
    setSelectedProduct(product);
    openModal(modalName);
    scrollController.disableScroll();
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;

    if (!isNaN(pageNumber) && pageNumber !== currentPage) {
      dispatch(setCurrentPage(pageNumber));
    }
  }, [dispatch, location.search, currentPage]);

  const filters = useAppSelector(selectFilters);

  const filteredProducts = useMemo(() => products.filter((product: Product) => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesType = filters.type.length === EmptyFilters.NoFilters || filters.type.includes(product.type);
    const matchesLevel = filters.level.length === EmptyFilters.NoFilters || filters.level.includes(product.level);
    const matchesPrice = (filters.priceInputValues.minPriceInputValue === null || product.price >= filters.priceInputValues.minPriceInputValue) &&
      (filters.priceInputValues.maxPriceInputValue === null || product.price <= filters.priceInputValues.maxPriceInputValue);

    return matchesCategory && matchesType && matchesLevel && matchesPrice;
  }), [filters.category, filters.level, filters.priceInputValues.maxPriceInputValue, filters.priceInputValues.minPriceInputValue, filters.type, products]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / maxProductsPerPage);

    if (currentPage > totalPages) {

      navigate('?page=1');
    } else {
      navigate(`?page=${currentPage}`);
    }
  }, [filteredProducts, currentPage, maxProductsPerPage, navigate, dispatch]);

  const productPrices = useMemo(() => filteredProducts.map((product: Product) => product.price), [filteredProducts]);
  const min = useMemo(() => Math.min(...productPrices), [productPrices]);
  const max = useMemo(() => Math.max(...productPrices), [productPrices]);

  useEffect(() => {

    if (filteredProducts.length === EmptyFilters.NoProducts) {
      return;
    }

    const prevMinPriceValue = filters.priceRange.min;
    const prevMaxPriceValue = filters.priceRange.max;


    if (prevMinPriceValue === min && prevMaxPriceValue === max) {
      return;
    }
    dispatch(setPriceRange({ min, max }));

  }, [dispatch, filteredProducts, filters.priceRange.max, filters.priceRange.min, min, max]);

  const sort = useAppSelector(selectSort);

  const sortedProducts = useMemo(() => {
    let sortedArray = [...filteredProducts];

    if (sort.sortType === SortTypesAndOrder.SortByPrice) {
      sortedArray = sortedArray.sort((a, b) => sort.sortOrder === SortTypesAndOrder.SortOrderUp ? a.price - b.price : b.price - a.price);
    } else if (sort.sortType === SortTypesAndOrder.SortByPopular) {
      sortedArray = sortedArray.sort((a, b) => sort.sortOrder === SortTypesAndOrder.SortOrderUp ? a.rating - b.rating : b.rating - a.rating);
    }

    return sortedArray;
  }, [filteredProducts, sort]);

  const totalPages = Math.ceil(sortedProducts.length / maxProductsPerPage);
  const startPaginationIndex = (currentPage - 1) * maxProductsPerPage;
  const endPaginationIndex = startPaginationIndex + maxProductsPerPage;

  useEffect(() => {

    dispatch(setTotalPages(totalPages));
  }, [dispatch, totalPages]);

  const sortedProductsWithPagination = sortedProducts.slice(startPaginationIndex, endPaginationIndex);

  const onPageChange = (event: React.MouseEvent<HTMLLIElement>) => {
    const newPage = Number(event.currentTarget.dataset.page);
    dispatch(setCurrentPage(newPage));
  };

  return (
    < main >
      <Helmet>
        <title>Camera-shop. Catalog</title>
      </Helmet>
      <div className="banner">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
          />
          <img
            src="img/content/banner-bg.jpg"
            srcSet="img/content/banner-bg@2x.jpg 2x"
            width={1280}
            height={280}
            alt="баннер"
          />
        </picture>
        <p className="banner__info">
          <span className="banner__message">Новинка!</span>
          <span className="title title--h1">
            Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
          </span>
          <span className="banner__text">
            Профессиональная камера от&nbsp;известного производителя
          </span>
          <a className="btn" href="#">
            Подробнее
          </a>
        </p>
      </div>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="index.html">
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Каталог
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <CatalogFilter />
              </div>
              <div className="catalog__content">
                <CatalogSort />
                {status === RequestStatus.Loading ? (
                  <div> Загрузка ... </div>
                ) : (
                  <CatalogCardsContainer
                    products={sortedProductsWithPagination}
                    onProductClick={handleBuyButtonClick}
                  />
                )}
                {products.length >= maxProductsPerPage &&
                  <Pagination
                    onPageChange={onPageChange}
                  />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main >
  );
}


);

CatalogPage.displayName = 'CatalogPage';


export default CatalogPage;
