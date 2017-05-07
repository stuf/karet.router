import React from 'karet';
import { Context, atom, fromKefir, lift1Shallow, view, withContext } from 'karet.util';
import U__default from 'karet.util';
import * as U from 'karet.util';
import { arrayOf, func, object, string } from 'prop-types';
import * as P from 'prop-types';
import { assoc, compose, curry, equals, join, map, pipe, prop, sortBy, tail, toPairs, zipObj } from 'ramda';
import * as R from 'ramda';
import toRegex from 'path-to-regexp';
import { stream } from 'kefir';
import * as Kefir from 'kefir';
import { createBrowserHistory } from 'history';
import * as H from 'history';
import { collect, props, values } from 'partial.lenses';
import * as L from 'partial.lenses';

var preventDefault = function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
};

var isExternal = lift1Shallow(function (href) {
  return (/^https?:\/\//.test(href)
  );
});

var expandRoutes = compose(map(zipObj(['route', 'Component'])), toPairs);

var addRegexes = map(function (entry) {
  var regex = toRegex(entry.route);
  regex.keys = regex.keys.map(prop('name'));

  return assoc('regex', regex, entry);
});

var sortStaticFirst = sortBy(function (_ref) {
  var regex = _ref.regex;
  return regex.keys.length === 0 ? 0 : 1;
});

var prepareRoutes = compose(sortStaticFirst, addRegexes, expandRoutes);

var CONTEXT_PROP_NAME = 'karet.router';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//

var isModifiedEvent = function isModifiedEvent(e) {
  return !!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey);
};

var handleClickWith = curry(function (location, href, e) {
  preventDefault(e);

  if (isModifiedEvent(e)) {
    return;
  }

  var internal = /^((\/[^?#]*)([?][^#]*)?)?([#].*)?$/.exec(href);

  var _internal = _slicedToArray(internal, 5),
      _internal$ = _internal[2],
      pathname = _internal$ === undefined ? '' : _internal$,
      _internal$2 = _internal[3],
      search = _internal$2 === undefined ? '' : _internal$2,
      _internal$3 = _internal[4],
      hash = _internal$3 === undefined ? '' : _internal$3;

  location.set({ pathname: pathname, search: search, hash: hash });
});

var Link = withContext(function (_ref, _ref2) {
  var location = _ref2[CONTEXT_PROP_NAME].location;

  var href = _ref.href,
      onClick = _ref.onClick,
      props$$1 = _objectWithoutProperties(_ref, ['href', 'onClick']);

  return React.createElement('a', _extends({ href: href,
    onClick: handleClickWith(location, href)
  }, props$$1));
});

//

Link.propTypes = {
  href: string,
  onClick: func
};

//

var createPathString = pipe(collect([props('pathname', 'search', 'hash'), values]), join(''));

//

var history = createBrowserHistory();

var getLocation = function getLocation() {
  return history.location;
};

var location = atom(getLocation());

var location$ = stream(function (e) {
  history.listen(function (next, action) {
    return e.emit({ next: next, action: action });
  });
});

//

location$.observe(function (_ref) {
  var next = _ref.next,
      action = _ref.action;
  return action === 'POP' && location.set(next);
});

location.observe(function (next) {
  if (!equals(next, getLocation())) {
    history.push(createPathString(next));
  }
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//

var context = _defineProperty({}, CONTEXT_PROP_NAME, {
  location: location,
  pathname: view('pathname', location)
});

//

var findMatchingRoute = curry(function (routes, pathname) {
  for (var i = 0, rs = routes.length; i < rs; i++) {
    var _routes$i = routes[i],
        Component = _routes$i.Component,
        regex = _routes$i.regex;

    var match = regex.exec(pathname);

    if (match) {
      return React.createElement(Component, { params: zipObj(regex.keys, tail(match)) });
    }
  }
});

var RouteRoot = withContext(function (_ref, _ref2) {
  var routes = _ref.routes;
  var pathname = _ref2[CONTEXT_PROP_NAME].pathname;
  return fromKefir(U__default(pathname, findMatchingRoute(routes)));
});

RouteRoot.propTypes = {
  routes: arrayOf(object)
};

//

var Router = function Router(_ref3) {
  var routes = _ref3.routes;

  var rs = prepareRoutes(routes);
  return React.createElement(
    Context,
    { context: context },
    React.createElement(RouteRoot, { routes: rs })
  );
};

Router.propTypes = {
  routes: object
};

export { Link, Router };
