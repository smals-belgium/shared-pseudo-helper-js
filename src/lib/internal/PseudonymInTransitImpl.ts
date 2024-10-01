import {PseudonymImpl} from "./PseudonymImpl";
import {TransitInfo} from "../TransitInfo";
import {Pseudonym} from "../Pseudonym";
import {Value} from "../Value";
import {PseudonymInTransit} from "../PseudonymInTransit";
import {ValueImpl} from "./ValueImpl";
import {EHealthProblem} from "../EHealthProblem";

export class PseudonymInTransitImpl extends PseudonymImpl implements PseudonymInTransit {

  private readonly _transitInfo: TransitInfo;


  constructor(pseudonym: Pseudonym, transitInfo: TransitInfo) {

    super((pseudonym as PseudonymImpl).ecPoint,
        (pseudonym as PseudonymImpl).domain);

    this._transitInfo = transitInfo;
  }

  identify(): Promise<Value | EHealthProblem> {
    const random = this._domain.createRandom();
    const blindedPseudonym = this.multiply(random);
    const payload = this._domain.createPayloadString(blindedPseudonym, this._transitInfo.asString());

    return this._domain.pseudonymisationClient.identify(this._domain.key, payload)
    .then(rawResponse => this.processResponse(rawResponse, random));
  }

  private processResponse(rawResponse: string, random: any): Value | EHealthProblem {
    const valueAsPseudonym = this._domain.pseudonymFactory.fromRawResponse(rawResponse, random);

    if (valueAsPseudonym instanceof EHealthProblem) {
      return valueAsPseudonym;
    }

    return new ValueImpl((valueAsPseudonym as PseudonymImpl).ecPoint, this._domain);
  }

  asShortString(): string {
    return this.sec1Compressed() + ":" + this._transitInfo.asString();
  }

  asString(): string {
    return this.sec1() + ":" + this._transitInfo.asString();
  }

  get transitInfo() {
    return this._transitInfo;
  }
}