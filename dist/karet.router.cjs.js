'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('karet'));
var U = require('karet.util');
var U__default = U['default'];
var P = require('prop-types');
var R = require('ramda');
var L = require('partial.lenses');
var Kefir = require('kefir');
var H = require('history');

var preventDefault = function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
};

var isExternal = U.lift1Shallow(function (href) {
  return (/^https?:\/\//.test(href)
  );
});

var invariant = function invariant(cond, format) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV !== 'production') {
    if (!format) {
      throw new Error('message argument required');
    }
  }

  if (!cond) {
    var error = void 0;
    if (!format) {
      error = new Error('Minified exception');
    } else {
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1;
    throw error;
  }
};

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

var NotFound = function NotFound() {
  return React.createElement(
    'div',
    null,
    'Not Found'
  );
};

//

var routeOrNotFound = function routeOrNotFound(routes, path) {
  return L.get([path, L.define(NotFound)], routes);
};

var RouteRoot = U.withContext(function (_ref, _ref2) {
  var routes = _ref.routes;
  var pathname = _ref2[CONTEXT_PROP_NAME].pathname;
  return U.fromKefir(U__default(pathname, function (path) {
    return React.createElement(routeOrNotFound(routes, path));
  }));
});

RouteRoot.propTypes = {
  routes: P.object.isRequired
};

//

var Router = function Router(_ref3) {
  var routes = _ref3.routes;

  invariant(routes, '<Router> requires a route configuration');

  return React.createElement(
    U.Context,
    { context: context },
    React.createElement(RouteRoot, { routes: routes })
  );
};

Router.propTypes = {
  routes: P.object.isRequired
};

exports.Link = Link;
exports.Router = Router;
