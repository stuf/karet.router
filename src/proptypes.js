import * as Kefir from 'kefir';
import * as P from 'prop-types';

export const KefirProperty = P.instanceOf(Kefir.Property);
export const KefirStream = P.instanceOf(Kefir.Stream);
export const KefirObservable = P.instanceOf(Kefir.Observable);
