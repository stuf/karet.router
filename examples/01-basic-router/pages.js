import React from 'karet';
import { Router, Link } from '../../src';

const Navigation = () =>
  <ul>
    <li>
      <Link href="/page">Page</Link>
    </li>
    <li>
      <Link href="/page-with-params/1234">Page with params</Link>
    </li>
  </ul>;

export const HomePage = () =>
  <div>
    <h1>Home page</h1>
    <Navigation />
  </div>;

export const BasicPage = () =>
  <div>
    <h1>Basic page</h1>
    <Navigation />
  </div>;

export const ParamsPage = ({ params }) =>
  <div>
    <h1>Page with params</h1>
    <pre>{JSON.stringify(params)}</pre>
    <Navigation />
  </div>;
