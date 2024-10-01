import {PointFactory} from "./PointFactory";
import {Domain} from "../Domain";
import {Pseudonym} from "../Pseudonym";
import {PseudonymInTransit} from "../PseudonymInTransit";
import {PseudonymInTransitImpl} from "./PseudonymInTransitImpl";
import {InvalidPseudonymError} from "../errors/InvalidPseudonymError";
import {MultiplePseudonymInTransit} from "../MultiplePseudonymInTransit";
import {MultiplePseudonymInTransitImpl} from "./MultiplePseudonymInTransitImpl";
import BN from "bn.js";
import {PseudonymInTransitFromResponse} from "./PseudonymInTransitFromResponse";
import {PseudonymInTransitFactory} from "../PseudonymInTransitFactory";
import {TransitInfoImpl} from "./TransitInfoImpl";
import {EHealthProblem} from "../EHealthProblem";
import {PseudonymFromResponse} from "./PseudonymFromResponse";
import {PseudonymImpl} from "./PseudonymImpl";

export class PseudonymInTransitFactoryImpl extends PointFactory implements PseudonymInTransitFactory {

  constructor(domain: Domain) {
    super(domain);
  }

  from(pseudonym: Pseudonym, transitInfo: string): PseudonymInTransitImpl {
    return new PseudonymInTransitImpl(pseudonym, new TransitInfoImpl(this._domain, transitInfo));
  }

  fromXYAndTransitInfo(x: string, y: string, transitInfo: string): PseudonymInTransitImpl {
    return new PseudonymInTransitImpl(this._domain.pseudonymFactory.fromXY(x, y),
        new TransitInfoImpl(this._domain, transitInfo));
  }

  fromSec1AndTransitInfo(sec1AndTransitInfo: string): PseudonymInTransitImpl {
    PseudonymInTransitFactoryImpl.assertNotEmpty(sec1AndTransitInfo);

    const colonPos = sec1AndTransitInfo.indexOf(':');
    if (colonPos == -1) {
      throw new InvalidPseudonymError("Missing `:` in the pseudonym in transit string. " +
          "Format must be {sec1InBase64Url}:{transitInfoInBase64Url}");
    }
    const pseudonym = this._domain.pseudonymFactory.fromSec1(sec1AndTransitInfo.substring(0, colonPos));
    const transitInfo = new TransitInfoImpl(this._domain, sec1AndTransitInfo.substring(colonPos + 1));
    return new PseudonymInTransitImpl(pseudonym, transitInfo);
  }

  multiple(pseudonymsInTransit?: Array<PseudonymInTransit>): MultiplePseudonymInTransit {
    if (pseudonymsInTransit == null) {

      return new MultiplePseudonymInTransitImpl(this._domain);
    }

    return new MultiplePseudonymInTransitImpl(this._domain, pseudonymsInTransit);
  }

  fromRawResponse(rawResponse: string, scalar: BN): PseudonymInTransitImpl | EHealthProblem {
    const response: PseudonymInTransitFromResponse | EHealthProblem = JSON.parse(rawResponse);
    return this.fromResponse(response, scalar);
  }

  fromResponse(response: PseudonymInTransitFromResponse | EHealthProblem, scalar: BN): PseudonymInTransitImpl | EHealthProblem {
    const pseudoOrProblem = this._domain.pseudonymFactory.fromResponse(response, scalar);
    if (pseudoOrProblem instanceof PseudonymImpl) {
      response = response as PseudonymInTransitFromResponse;
      return new PseudonymInTransitImpl(pseudoOrProblem,
          new TransitInfoImpl(this._domain, response.transitInfo));
    }

    return pseudoOrProblem as EHealthProblem;
  }


  isAcceptableResponse(response: PseudonymFromResponse | EHealthProblem): boolean {
    return this._domain.pseudonymFactory.isAcceptableResponse(response) && 'transitInfo' in response;
  }

  private static assertNotEmpty(str: string): void {
    if (str == null || str === '') {
      throw new InvalidPseudonymError("The pseudonym in transit string is empty or null");
    }
  }
}