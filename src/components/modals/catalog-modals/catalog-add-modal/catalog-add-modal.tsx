import { useRef } from 'react';
import { useModalRules } from '../../../../hooks/modal-rules';
import { ModalName } from '../../../../const';
import { useSelectedProduct } from '../../../../hooks/select-product';
import { useModalContext } from '../../../../hooks/modal-context';
import { useAppDispatch } from '../../../../hooks/store';
import { addProduct } from '../../../../store/slices/shopping-cart/shopping-cart';

function CatalogAddModal(): JSX.Element | null {

  const dispatch = useAppDispatch();
  const { openModal } = useModalContext();

  const addProductInCartRef = useRef<HTMLButtonElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { modalRef, overlayRef, handleCloseModal } = useModalRules([addProductInCartRef, closeButtonRef]);
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();

  if (!selectedProduct) {
    return null;
  }
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, category, price, vendorCode, level, type } = selectedProduct;


  const handleAddProductButtonClick = () => {

    openModal(ModalName.CatalogAddSuccessModal);

    if (selectedProduct) {
      dispatch(addProduct(selectedProduct));
    }
  };

  const handleCloseButtonClick = () => {
    handleCloseModal();
    setSelectedProduct(null);
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={overlayRef} />
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">
                {name.includes('Ретрокамера') ? `${name}` : `${category} ${name}`}
              </p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">
                  {type} {category.includes('Фотоаппарат') ? 'фотокамера' : category.toLowerCase()}
                </li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={addProductInCartRef}
              onClick={handleAddProductButtonClick}
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            ref={closeButtonRef}
            onClick={handleCloseButtonClick}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>


  );
}

export default CatalogAddModal;
