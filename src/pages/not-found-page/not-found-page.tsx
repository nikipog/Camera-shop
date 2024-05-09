import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage () : JSX.Element {
  return (

    <h1>
      <Helmet>
        <title>Oops! Not found</title>
      </Helmet>
     404 Not Found
      <nav>
        <Link to={AppRoute.Catalog}>Click here</Link>
      </nav>
    </h1>
  );

}

export default NotFoundPage;
