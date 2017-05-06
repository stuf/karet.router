import React from 'karet'; // eslint-disable-line
import * as U from 'karet.util';
import * as P from 'prop-types';
import * as R from 'ramda';

import { preventDefault } from './util';
import { CONTEXT_PROP_NAME } from './constants';

//

const isModifiedEvent = e => !!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey);

const handleClickWith = R.curry((location, href, e) => {
  preventDefault(e);

  if (isModifiedEvent(e)) {
    return;
  }

  const internal = /^((\/[^?#]*)([?][^#]*)?)?([#].*)?$/.exec(href);
  const [,, pathname = '', search = '', hash = ''] = internal;

  location.set({ pathname, search, hash });
});

const Link = U.withContext(({ href, onClick, ...props }, { [CONTEXT_PROP_NAME]: { location } }) =>
  <a href={href}
     onClick={handleClickWith(location, href)}
     {...props } />);

//

Link.propTypes = {
  href: P.string,
  onClick: P.func
};

export default Link;
