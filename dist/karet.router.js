(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('karet'), require('karet.util'), require('prop-types'), require('ramda'), require('path-to-regexp'), require('kefir'), require('history'), require('partial.lenses')) :
	typeof define === 'function' && define.amd ? define(['exports', 'karet', 'karet.util', 'prop-types', 'ramda', 'path-to-regexp', 'kefir', 'history', 'partial.lenses'], factory) :
	(factory((global.karet = global.karet || {}, global.karet.router = global.karet.router || {}),global.karet,global.U,global.P,global.R,global.toRegex,global.Kefir,global.H,global.L));
}(this, (function (exports,React,U,P,R,toRegex,Kefir,H,L) { 'use strict';

React = 'default' in React ? React['default'] : React;
var U__default = U['default'];
toRegex = 'default' in toRegex ? toRegex['default'] : toRegex;

var preventDefault = function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
};

var isExternal = U.lift1Shallow(function (href) {
  return (/^https?:\/\//.test(href)
  );
});

var expandRoutes = R.compose(R.map(R.zipObj(['route', 'Component'])), R.toPairs);

var addRegexes = R.map(function (entry) {
  var regex = toRegex(entry.route);
  regex.keys = regex.keys.map(R.prop('name'));

  return R.assoc('regex', regex, entry);
});

var sortStaticFirst = R.sortBy(function (_ref) {
  var regex = _ref.regex;
  return regex.keys.length === 0 ? 0 : 1;
});

var prepareRoutes = R.compose(sortStaticFirst, addRegexes, expandRoutes);

var CONTEXT_PROP_NAME = 'karet.router';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//

var isModifiedEvent = function isModifiedEvent(e) {
  return !!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey);
};

var handleClickWith = R.curry(function (location, href, e) {
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

var Link = U.withContext(function (_ref, _ref2) {
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
  href: P.string,
  onClick: P.func
};

//

var createPathString = R.pipe(L.collect([L.props('pathname', 'search', 'hash'), L.values]), R.join(''));

//

var history = H.createBrowserHistory();

var getLocation = function getLocation() {
  return history.location;
};

var location = U.atom(getLocation());

var location$ = Kefir.stream(function (e) {
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
  if (!R.equals(next, getLocation())) {
    history.push(createPathString(next));
  }
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//

var context = _defineProperty({}, CONTEXT_PROP_NAME, {
  location: location,
  pathname: U.view('pathname', location)
});

//

var findMatchingRoute = R.curry(function (routes, pathname) {
  for (var i = 0, rs = routes.length; i < rs; i++) {
    var _routes$i = routes[i],
        Component = _routes$i.Component,
        regex = _routes$i.regex;

    var match = regex.exec(pathname);

    if (match) {
      return React.createElement(Component, { params: R.zipObj(regex.keys, R.tail(match)) });
    }
  }
});

var RouteRoot = U.withContext(function (_ref, _ref2) {
  var routes = _ref.routes;
  var pathname = _ref2[CONTEXT_PROP_NAME].pathname;
  return U.fromKefir(U__default(pathname, findMatchingRoute(routes)));
});

RouteRoot.propTypes = {
  routes: P.arrayOf(P.object)
};

//

var Router = function Router(_ref3) {
  var routes = _ref3.routes;

  var rs = prepareRoutes(routes);
  return React.createElement(
    U.Context,
    { context: context },
    React.createElement(RouteRoot, { routes: rs })
  );
};

Router.propTypes = {
  routes: P.object
};

exports.Link = Link;
exports.Router = Router;

Object.defineProperty(exports, '__esModule', { value: true });

})));
