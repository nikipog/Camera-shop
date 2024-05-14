import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header" id="header">
        <div className="container">
          <a
            className="header__logo"
            href="index.html"
            aria-label="Переход на главную"
          >
            <svg width={100} height={36} aria-hidden="true">
              <use xlinkHref="#icon-logo" />
            </svg>
          </a>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <a className="main-nav__link" href="catalog.html">
                  Каталог
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  Гарантии
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  Доставка
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  О компании
                </a>
              </li>
            </ul>
          </nav>
          {/*<div class="form-search">
      <form>
        <label>
          <svg class="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlink:href="#icon-lens"></use>
          </svg>
          <input class="form-search__input" type="text" autocomplete="off" placeholder="Поиск по сайту">
        </label>
        <ul class="form-search__select-list">
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 8i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 7i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 6i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 5i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 4i</li>
        </ul>
      </form>
      <button class="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg><span class="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
    <a class="header__basket-link" href="#">
      <svg width="16" height="16" aria-hidden="true">
        <use xlink:href="#icon-basket"></use>
      </svg></a>*/}
        </div>
      </header>
      <Outlet/>
      <footer className="footer">
        <div className="container">
          <div className="footer__info">
            <a
              className="footer__logo"
              href="index.html"
              aria-label="Переход на главную"
            >
              <svg width={100} height={36} aria-hidden="true">
                <use xlinkHref="#icon-logo-mono" />
              </svg>
            </a>
            <p className="footer__description">
              Интернет-магазин фото- и видеотехники
            </p>
            <ul className="social">
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу вконтатке"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-vk" />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу pinterest"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-pinterest" />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу reddit"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-reddit" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <ul className="footer__nav">
            <li className="footer__nav-item">
              <p className="footer__title">Навигация</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    Каталог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Гарантии
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Доставка
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    О компании
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Ресурсы</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    Курсы операторов
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Блог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Сообщество
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Поддержка</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    FAQ
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Задать вопрос
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
