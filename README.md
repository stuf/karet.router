# Karet Router

Routing component for use with [Karet][karet].

[karet]: https://github.com/calmm-js/karet

[![npm version](https://badge.fury.io/js/karet.router.svg)](https://badge.fury.io/js/karet.router)
[![Build Status](https://travis-ci.org/stuf/karet.router.svg?branch=master)](https://travis-ci.org/stuf/karet.router)
[![codecov](https://codecov.io/gh/stuf/karet.router/branch/master/graph/badge.svg)](https://codecov.io/gh/stuf/karet.router)
[![](https://david-dm.org/stuf/karet.router.svg)](https://david-dm.org/stuf/karet.router)
[![](https://david-dm.org/stuf/karet.router/dev-status.svg)](https://david-dm.org/stuf/karet.router?type=dev)

## Usage

```jsx
// app.js
import React from 'karet';
import { Router } from 'karet.router';
import { render } from 'react-dom';

const routes = {
  '/': () =>
    <div>Root page</div>,

  '/subpage': () =>
    <div>Sub-route</div>,

  '/with-params/:id': ({ params }) =>
    <div>Route with ID {params.id}</div>
};

const App = () => <Router routes={routes} />

render(
  <App />,
  document.getElementById('root'));
```
