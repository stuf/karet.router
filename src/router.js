import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as P from 'prop-types';
import location from './location';
import { CONTEXT_PROP_NAME } from './constants';
import { invariant } from './util';

//

const context = {
  [CONTEXT_PROP_NAME]: {
    location,
    pathname: U.view('pathname', location)
  }
};

//

const NotFound = () =>
  <div>
    Not Found
  </div>;

//

const routeOrNotFound = (routes, path) => L.get([path, L.define(NotFound)], routes);

const RouteRoot = U.withContext(({ routes }, { [CONTEXT_PROP_NAME]: { pathname } }) =>
  U.fromKefir(K(pathname, path => React.createElement(routeOrNotFound(routes, path)))));

RouteRoot.propTypes = {
  routes: P.object.isRequired
};

//

const Router = ({ routes }) => {
  invariant(routes, '<Router> requires a route configuration');

  return (
    <U.Context context={context}>
      <RouteRoot routes={routes} />
    </U.Context>
  );
}

Router.propTypes = {
  routes: P.object.isRequired
};

export default Router;
