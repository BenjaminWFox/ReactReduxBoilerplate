'use strict';

require('babel-polyfill');

require('bootstrap');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouterDom = require('react-router-dom');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _app = require('../shared/app');

var _app2 = _interopRequireDefault(_app);

var _hello = require('../shared/reducer/hello');

var _hello2 = _interopRequireDefault(_hello);

var _config = require('../shared/config');

var _util = require('../shared/util');

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
var composeEnhancers = (_util.isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || _redux.compose;

var preloadedState = window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */

// eslint-disable-next-line function-paren-newline, max-len
var store = (0, _redux.createStore)((0, _redux.combineReducers)({ hello: _hello2.default }), { hello: _immutable2.default.fromJS(preloadedState.hello) }, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));

var rootEl = document.querySelector(_config.APP_CONTAINER_SELECTOR);

var wrapApp = function wrapApp(AppComponent, reduxStore) {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: reduxStore },
    _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      _react2.default.createElement(
        _reactHotLoader.AppContainer,
        null,
        _react2.default.createElement(AppComponent, null)
      )
    )
  );
};

_reactDom2.default.render(wrapApp(_app2.default, store), rootEl);

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', function () {
    // eslint-disable-next-line global-require
    var NextApp = require('../shared/app').default;
    _reactDom2.default.render(wrapApp(NextApp, store), rootEl);
  });
}

var jssServerSide = document.querySelector(_config.JSS_SSR_SELECTOR);
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide);

(0, _socket2.default)(store);