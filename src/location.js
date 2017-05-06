import * as Kefir from 'kefir';
import * as H from 'history';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

//

const createPathString = R.pipe(L.collect([L.props('pathname', 'search', 'hash'), L.values]),
                                R.join(''));

//

const history = H.createBrowserHistory();

const getLocation = () => history.location;

const location = U.atom(getLocation());

const location$ = Kefir.stream(e => {
  history.listen((next, action) => e.emit({ next, action }));
});

//

location$.observe(({ next, action }) => action === 'POP' && location.set(next));

location.observe(next => {
  if (!R.equals(next, getLocation())) {
    history.push(createPathString(next));
  }
});

export default location;
