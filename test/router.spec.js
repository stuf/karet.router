import React from 'karet'; // eslint-disable-line
import { expect } from 'chai';
import { mount } from 'enzyme';

import Router, { RouteRoot } from '../src/router';
import location from '../src/location';
import { RootPage, SubRoutePage, NotFoundPage } from './fixtures/pages';

const routes = {
  '/sub-route/:id': SubRoutePage,
  '/': RootPage,
  '*': NotFoundPage
};

describe('Router', () => {
  it('should create a router successfully', () => {
    const wrapper = mount(<Router routes={routes} />);
    expect(wrapper.exists()).to.be.true;
  });

  it('should pass path params to the route rendered', () => {
    const wrapper = mount(<Router routes={routes} />);

    let page;
    location.set({ pathname: '/sub-route/1234' });
    page = wrapper.find(SubRoutePage);
    expect(page.props()).to.eql({ params: { id: '1234' }});
    expect(page.exists()).to.be.true;

    location.set({ pathname: '/' });
    page = wrapper.find(RootPage);
    expect(page.props()).to.eql({ params: {}});
    expect(page.exists()).to.be.true;
  });
});
