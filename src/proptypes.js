import * as Kefir from 'kefir';
import * as P from 'prop-types';
import * as R from 'ramda';

const KefirProps = [
  ['KefirProperty', Kefir.Property]
];

const xs = KefirProps.reduce((o, [k, x]) => R.assoc(k, x, o), {});

console.log({ xs });

export const KefirProperty = P.instanceOf(Kefir.Property);
export const KefirStream = P.instanceOf(Kefir.Stream);
export const KefirObservable = P.instanceOf(Kefir.Observable);
