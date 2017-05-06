import React from 'karet'; // eslint-disable-line
import { expect } from 'chai';
import { render } from 'enzyme';

import Router from '../src/router';

const routes = {
  '/': () => <div />
};

describe('Router', () => {
  it('creates a router', () => {
    const wrapper = render(<Router routes={routes} />);
    expect(wrapper.find(Router)).to.not.throw;
  });
});
