import {Value} from "../Value";
import {DomainImpl} from "./DomainImpl";
import {Domain} from "../Domain";
import {MultiplePseudonymInTransit} from "../MultiplePseudonymInTransit";
import {MultiplePseudonymInTransitImpl} from "./MultiplePseudonymInTransitImpl";
import BN from "bn.js";
import {ValuePayload} from "./ValuePayload";
import {ValueImpl} from "./ValueImpl";
import {PseudonymInTransitFactoryImpl} from "./PseudonymInTransitFactoryImpl";
import {MultipleValue} from "../MultipleValue";
import {MultiplePointImpl} from "./MultiplePointImpl";
import {EHealthProblem} from "../EHealthProblem";

export class MultipleValueImpl extends MultiplePointImpl<Value> implements MultipleValue {


  constructor(domain: Domain, values?: Array<Value | EHealthProblem>) {
    super(domain as DomainImpl, values);
  }

  pseudonymize(): Promise<MultiplePseudonymInTransit> {
    if (this._points.length === 0) {
      return Promise.resolve(new MultiplePseudonymInTransitImpl(this._domain));
    }

    const nbValues = this._points.length;
    if (nbValues === 1) {
      const value = this._points[0] as Value;
      return value.pseudonymize()
      .then(pseudonymInTransit => new MultiplePseudonymInTransitImpl(this._domain, Array.of(pseudonymInTransit)));
    }

    const randoms = new Array<BN>();
    const payload = {inputs: []};

    payload.inputs = new Array<ValuePayload>();

    for (let i = 0; i < nbValues; i++) {
      const random = this._domain.createRandom();
      payload.inputs.push(this._domain.createPayload((this._points[i] as ValueImpl).multiply(random)));
      randoms.push(random);
    }

    return this._domain.pseudonymisationClient
    .pseudonymizeMultiple(this._domain.key, JSON.stringify(payload))
    .then(rawResponse => {
      const response = JSON.parse(rawResponse);
      const outputs = response.outputs;
      const pseudonymsInTransit = new MultiplePseudonymInTransitImpl(this._domain);
      const pseudonymInTransitFactory = this._domain.pseudonymInTransitFactory as PseudonymInTransitFactoryImpl;

      for (let i = 0; i < nbValues; i++) {
        pseudonymsInTransit.pushPoint(pseudonymInTransitFactory.fromResponse(outputs[i], randoms[i]));
      }

      return pseudonymsInTransit;
    });
  }

  override validate(value: Value): Value {
    // Ensures that the pseudonym in transit is from the expected domain
    if (value.domain.key !== this._domain.key) {
      throw new Error("All given values are not from the domain `" + this._domain.key + "`");
    }
    return value;
  }

  override checkCollectionSize(futureSize: number): void {
    if (futureSize > 10) {
      throw new Error("The number of values in this collection must be less or equal to 10");
    }
  }

}