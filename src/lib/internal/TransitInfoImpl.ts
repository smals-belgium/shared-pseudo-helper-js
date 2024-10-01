import {DomainImpl} from "./DomainImpl";
import {Domain} from "../Domain";
import * as jose from "jose";
import {InvalidTransitInfoError} from "../errors/InvalidTransitInfoError";
import {TransitInfo} from "../TransitInfo";


export class TransitInfoImpl implements TransitInfo {

  private static readonly CLOCK_SKEW = 60 * 1000;  // as per ehealth spec, in ms

  private readonly _domain: DomainImpl;

  private _raw: string;

  private _parsed: jose.ProtectedHeaderParameters;


  constructor(domain: Domain, raw: string);

  constructor(domain: Domain, params: jose.ProtectedHeaderParameters);
  constructor(domain: Domain, params: (jose.ProtectedHeaderParameters | string)) {
    this._domain = domain as DomainImpl;
    if (typeof params === 'string') {
      this._raw = params;
    } else {
      this._parsed = params;
    }
  }


  asString(): string {
    if (this._raw === undefined) {
      this._raw = JSON.stringify(this._parsed);
    }
    return this._raw;
  }

  audience(): string {
    return this.parse().aud as string;
  }

  parse(): jose.ProtectedHeaderParameters {

    if (this._parsed == null) {
      this._parsed = jose.decodeProtectedHeader(this._raw);
    }

    if (this._parsed.alg !== 'dir') {
      throw new InvalidTransitInfoError("`alg` with value `dir` expected in header");
    }

    if (this._parsed.enc == null) {
      throw new InvalidTransitInfoError("Missing `enc` in header");
    }

    if (this._parsed.aud == null || this._parsed.aud === '') {
      throw new InvalidTransitInfoError("Missing `aud` in header");
    }
    return this._parsed;
  }

  validateHeader() {

    const transitInfoHeader = this.parse();

    if (transitInfoHeader.aud !== this._domain.audience) {
      throw new InvalidTransitInfoError("Invalid `aud`: " + transitInfoHeader.aud + ". Expected: " + this._domain.audience);
    }

    const currentTime = new Date().getTime();

    const iat = Number(transitInfoHeader.iat) * 1000;
    const exp = Number(transitInfoHeader.exp) * 1000;

    if (iat > currentTime + TransitInfoImpl.CLOCK_SKEW) {
      throw new Error("transitInfo not yet ready for use (iat:" + iat + "  > now:" + currentTime + ").");
    }

    if (exp < currentTime - TransitInfoImpl.CLOCK_SKEW) {
      throw new Error("expired transitInfo (exp:" + exp + " < now:" + currentTime + ").");
    }
  }

  get headers(): Map<string, string | number> {
    const headers = this.parse();

    return new Map<string, string | number>([['alg', headers.alg], ['enc', headers.enc], ['iat', headers.iat as number], ['exp', headers.exp as number], ['kid', headers.kid as string], ['aud', headers.aud as string]]);
  }

}