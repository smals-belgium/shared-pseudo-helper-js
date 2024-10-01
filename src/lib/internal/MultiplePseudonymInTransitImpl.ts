import {PseudonymInTransit} from "../PseudonymInTransit";
import {DomainImpl} from "./DomainImpl";
import {Domain} from "../Domain";
import {MultipleValue} from "../MultipleValue";
import BN from "bn.js";
import {PseudonymPayload} from "./PseudonymPayload";
import {PseudonymInTransitImpl} from "./PseudonymInTransitImpl";
import {MultiplePseudonymInTransit} from "../MultiplePseudonymInTransit";
import {ValueImpl} from "./ValueImpl";
import {MultipleValueImpl} from "./MultipleValueImpl";
import {MultiplePointImpl} from "./MultiplePointImpl";
import {EHealthProblem} from "../EHealthProblem";

export class MultiplePseudonymInTransitImpl extends MultiplePointImpl<PseudonymInTransit | EHealthProblem> implements MultiplePseudonymInTransit {

  constructor(domain: Domain, pseudonymsInTransit?: Array<PseudonymInTransit | EHealthProblem>) {
    super(domain as DomainImpl, pseudonymsInTransit);
  }


  identify(): Promise<MultipleValue | EHealthProblem> {
    if (this._points.length === 0) {
      return Promise.resolve(new MultipleValueImpl(this._domain));
    }

    const nbPseudonymsInTransit = this._points.length;
    if (nbPseudonymsInTransit === 1) {
      const pseudonymInTransitToIdentify = this._points[0] as PseudonymInTransit;
      return pseudonymInTransitToIdentify.identify()
      .then(value => {
        return new MultipleValueImpl(this._domain, Array.of(value));
      });
    }

    const randoms = new Array<BN>();
    const payload = {inputs: []};
    payload.inputs = new Array<PseudonymPayload>();

    for (let i = 0; i < nbPseudonymsInTransit; i++) {

      const random = this._domain.createRandom();
      const pseudoInTransit = this._points[i] as PseudonymInTransitImpl;
      payload.inputs.push(this._domain.createPayload(pseudoInTransit.multiply(random), pseudoInTransit.transitInfo.asString()));
      randoms.push(random);
    }
    return this._domain.pseudonymisationClient
    .identifyMultiple(this._domain.key, JSON.stringify(payload))
    .then(rawResponse => {
      const response = JSON.parse(rawResponse);
      const outputs = response.outputs;
      const values = new MultipleValueImpl(this._domain);
      const pseudonymFactory = this._domain.pseudonymFactory;

      for (let i = 0; i < nbPseudonymsInTransit; i++) {
        let valueAsPseudonym = pseudonymFactory.fromResponse(outputs[i], randoms[i]);
        if (!(valueAsPseudonym instanceof EHealthProblem)) {
          values.pushPoint(new ValueImpl(valueAsPseudonym.ecPoint, this._domain));
        } else {
          values.pushPoint(valueAsPseudonym);
        }
      }

      return values;
    });
  }

  override validate(pseudonymInTransit: PseudonymInTransit): PseudonymInTransit {

    // Ensures that the pseudonym in transit is from the expected domain
    if (pseudonymInTransit.domain.key !== this._domain.key) {
      throw new Error("All given pseudonyms in transit are not from the domain `" + this._domain.key + "`");
    }
    return pseudonymInTransit;
  }

  override checkCollectionSize(futureSize: number): void {
    if (futureSize > 10) {
      throw new Error("The number of pseudonyms in transit in this collection must be less or equal to 10");
    }
  }
}