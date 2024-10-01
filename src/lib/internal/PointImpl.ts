import {ECPoint} from "./ECPoint";
import {DomainImpl} from "./DomainImpl";
import {Domain} from "../Domain";
import {Point} from "../Point";

export abstract class PointImpl implements Point {

  protected readonly _ecPoint: ECPoint;

  protected readonly _domain: DomainImpl;

  protected constructor(ecPoint: ECPoint, domain: Domain) {
    this._ecPoint = ecPoint;
    this._domain = domain as DomainImpl;
  }

  get domain() {
    return this._domain;
  }

  get ecPoint() {
    return this._ecPoint;
  }
}