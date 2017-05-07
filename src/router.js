import React from 'karet';
import K, * as U from 'karet.util';
import * as P from 'prop-types';
import * as R from 'ramda';
import location from './location';
import { prepareRoutes } from './util';
import { CONTEXT_PROP_NAME } from './constants';

//

const context = {
  [CONTEXT_PROP_NAME]: {
    location,
    pathname: U.view('pathname', location)
  }
};

//

const findMatchingRoute = R.curry((routes, pathname) => {
  for (let i = 0, rs = routes.length; i < rs; i++) {
    const { Component, regex } = routes[i];
    const match = regex.exec(pathname);

    if (match) {
      return React.createElement(
        Component,
        { params: R.zipObj(regex.keys, R.tail(match)) });
    }
  }
});

const RouteRoot = U.withContext(({ routes }, { [CONTEXT_PROP_NAME]: { pathname } }) =>
  U.fromKefir(K(pathname, findMatchingRoute(routes))));

RouteRoot.propTypes = {
  routes: P.arrayOf(P.object)
};

//

const Router = ({ routes }) => {
  const rs = prepareRoutes(routes);
  return (
    <U.Context context={context}>
      <RouteRoot routes={rs} />
    </U.Context>
  );
};

Router.propTypes = {
  routes: P.object
};

export default Router;
