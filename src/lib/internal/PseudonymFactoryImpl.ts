import {PointFactory} from "./PointFactory";
import {Domain} from "../Domain";
import {PseudonymImpl} from "./PseudonymImpl";
import BN from "bn.js";
import {ECPoint} from "./ECPoint";
import {Base64} from "../utils/Base64";
import {InvalidPseudonymError} from "../errors/InvalidPseudonymError";
import {PseudonymFromResponse} from "./PseudonymFromResponse";
import {PseudonymFactory} from "../PseudonymFactory";
import {EHealthProblem} from "../EHealthProblem";

export class PseudonymFactoryImpl extends PointFactory implements PseudonymFactory {

  constructor(domain: Domain) {
    super(domain);
  }

  fromSec1(sec1: string): PseudonymImpl {
    const bytes = Base64.urlDecode(sec1);

    // 66 = (Fieldsize + 7) / bitsinbyte ==> (521 + 7) / 8
    const expectedLength = 66;

    if (bytes[0] == 4) {

      if (bytes.length != 2 * expectedLength + 1) {
        throw new Error("Incorrect length for uncompressed encoding. Should be (66 + 66 + 1) bytes length.")
      }

      let x = new BN(bytes.slice(1, expectedLength + 1));
      let y = new BN(bytes.slice(expectedLength + 1));

      return new PseudonymImpl(new ECPoint(x, y, this._domain.ec), this._domain);
    }

    //https://mvalvekens.be/blog/2022/ecc-point-compression.html
    //Verify that the input starts with 0x02 or 0x03. If not, reject the input
    if (bytes[0] != 2 && bytes[0] != 3) {
      throw new Error("Invalid point encoding:" + bytes[0]);
    }

    if (bytes.length != expectedLength + 1) {
      throw new Error("Incorrect length for compressed encoding. Should be (66 + 1) bytes length.")
    }

    //Introduce an auxiliary variable s, the value of which is 0 if the first byte of the input is 0x02, and 1 otherwise.
    let s = bytes[0] === 2 ? 0 : 1;

    //Decode the remaining 𝐿 bytes of the input into an integer 𝑥, using big-endian encoding. If 𝑥∉[0,𝑝−1], reject the input.
    let x = new BN(bytes.slice(1), 'be');
    if (x.ltn(0) || x.gt(this._domain.ec.curve.p)) {
      throw new Error("Invalid x value: " + x);
    }

    //Attempt to compute a square root of𝑥3+𝑥𝑎+𝑏 modulo 𝑝, and denote the result by 𝑦′. If no square root is found, reject the input.
    const yprime = this._domain.computeY(x);
    if (yprime === undefined) {
      throw new Error("Invalid X coordinate: no Y coordinate can be computed for this X coordinate");
    }

    //If 𝑠=𝑦′(mod2), then output (𝑥,𝑦′). Otherwise output (𝑥,𝑝−𝑦′).
    if (yprime.modn(2) === s) {
      return new PseudonymImpl(new ECPoint(x, yprime, this._domain.ec), this._domain);
    }

    return new PseudonymImpl(new ECPoint(x, this._domain.ec.curve.p.sub(yprime), this._domain.ec), this._domain);
  }

  fromX(xAsBase64String: string): PseudonymImpl {

    const x = Base64.decodeToBN(xAsBase64String)
    const y = this._domain.computeY(x);

    if (y === undefined) {
      throw new InvalidPseudonymError("Invalid X coordinate: no Y coordinate can be computed for this X coordinate");
    }

    return new PseudonymImpl(new ECPoint(x, y, this._domain.ec), this._domain);
  }

  fromXY(xAsBase64String: string, yAsBase64String: string): PseudonymImpl {
    const x = Base64.decodeToBN(xAsBase64String);
    const y = Base64.decodeToBN(yAsBase64String);

    return new PseudonymImpl(new ECPoint(x, y, this._domain.ec), this._domain);
  }

  fromRawResponse(rawResponse: string, scalar: BN): PseudonymImpl | EHealthProblem {
    const response: PseudonymFromResponse | EHealthProblem = JSON.parse(rawResponse);
    return this.fromResponse(response as PseudonymFromResponse, scalar);
  }

  fromResponse(response: PseudonymFromResponse | EHealthProblem, scalar: BN): PseudonymImpl | EHealthProblem {
    if (this.isAcceptableResponse(response)) {
      response = response as PseudonymFromResponse;
      const domainFromResponse = response.domain;

      if (domainFromResponse === undefined) {
        throw new Error("Pseudonym sent by eHealth is invalid: `domain` is missing");
      }

      if (domainFromResponse !== this._domain.key) {
        throw new Error("Pseudonym sent by eHealth is invalid: `" +
            domainFromResponse + "` does not match the expected domain `" + this._domain.key + "`");
      }

      try {
        const blindedPseudonym = this.fromXY(response.x, response.y) as PseudonymImpl;
        return blindedPseudonym.multiplyByModInverse(scalar);
      } catch (e) {
        throw new Error("Pseudonym sent by eHealth is invalid; " + e);
      }
    }
    return response as EHealthProblem;
  }

  isAcceptableResponse(response: PseudonymFromResponse | EHealthProblem): boolean {
    return ('x' in response && 'y' in response);
  }
}