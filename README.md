# Karet Router

A router component for use with [Karet][karet].

[karet]: https://github.com/calmm-js/karet

[![npm version](https://badge.fury.io/js/karet.router.svg)](https://badge.fury.io/js/karet.router)
[![Build Status](https://travis-ci.org/stuf/karet.router.svg?branch=master)](https://travis-ci.org/stuf/karet.router)
[![codecov](https://codecov.io/gh/stuf/karet.router/branch/master/graph/badge.svg)](https://codecov.io/gh/stuf/karet.router)
[![](https://david-dm.org/stuf/karet.router.svg)](https://david-dm.org/stuf/karet.router)
[![](https://david-dm.org/stuf/karet.router/dev-status.svg)](https://david-dm.org/stuf/karet.router?type=dev)

## Contents

 * [Getting Started](#getting-started)

## Getting Started

```jsx
import React from 'karet';
import { render } from 'react-dom';
import { Router } from 'karet.router';

import HomePage from './pages/home';
import AnotherPage from './pages/another';
import NotFoundPage from './pages/not-found';

const routes = {
  '/': HomePage,
  '/another': AnotherPage
};

const Root = () =>
  <div>
    <Router routes={routes} />
  </div>;

render(
  <Root />,
  document.getElementById('root'));
```

## Components

### `Router`

```typescript
props {
  routes: { [path: string]: ReactElement }
}
```

### `Link`

```typescript
props {
  href: string,
  children: string | ReactElement
}
```

## Notes

Currently, the router library is in a fairly early state, and will most likely go through a number of big changes.

Planned features:

 * Express-like routing of paths
