import {PseudonimysationClientImpl} from "./PseudonimysationClientImpl";
import {PseudonymInTransit, PseudonymisationHelper, Value, EHealthProblem} from "../../src";
import {Curve} from "../../src/lib/Curve";

describe('End to end testing', () => {
  const bearer = 'redacted';
  const helper = new PseudonymisationHelper(new PseudonimysationClientImpl(bearer));
  const domain = helper.createDomain('uhmep_v1', Curve.P521, 'https://api-acpt.ehealth.fgov.be/pseudo/v1/domains/uhmepv1', 8);

  test('pseudonymize/identify', async () => {
    const inputSsin = '12587488890';
    try {
      let data = await domain.valueFactory.fromString(inputSsin).pseudonymize();
      if (!(data instanceof EHealthProblem)) {
        data = data as PseudonymInTransit;
        let value = await data.identify();
        if (!(value instanceof EHealthProblem)) {
          expect(value.asString()).toBe(inputSsin);
        }
      }
    } catch (e) {
      throw e;
    }
  });

  test('pseudonymizeMultiple/IdentifyMultiple', async () => {
    const inputSsins = ['12587488890', '99545454444', '12345678977']
    const values = [domain.valueFactory.fromString(inputSsins[0])
      , domain.valueFactory.fromString(inputSsins[1])
      , domain.valueFactory.fromString(inputSsins[2])];

    const pseudoInTransitCollection = await domain.valueFactory.multiple(values).pseudonymize();

    for (let i = 0; i < pseudoInTransitCollection.lengthPoints(); i++) {
      if (!('x' in pseudoInTransitCollection.getPoint(i) && 'y' in pseudoInTransitCollection.getPoint(i))) {
        console.log('Pseudo in error.  Removing from the list to identify ==>' + pseudoInTransitCollection.splicePoints(i, 1));
      }
    }

    const valueCollection = await pseudoInTransitCollection.identify();

    for (let i = 0; !(valueCollection instanceof EHealthProblem) && i < valueCollection.lengthPoints(); i++) {
      const tempValue = valueCollection.getPoint(i) as Value;
      expect(tempValue.asString()).toBe(inputSsins[i]);
    }
  });

});

