import * as React from 'karet';
import { expect } from 'chai';
import { render } from 'enzyme';

import Router from '../src/router';

describe('Router', () => {
  it('creates a router', () => {
    const wrapper = render(<Router />);
    expect(wrapper.find(Router)).to.have.length(1);
    expect(true).to.be.true;
  });
});
