import { BasicPage, HomePage, ParamsPage } from './pages';

export default {
  '/': HomePage,
  '/page': BasicPage,
  '/page-with-params/:id': ParamsPage
};
