import {Domain} from "../Domain";
import {DomainImpl} from "./DomainImpl";

export abstract class PointFactory {
  protected _domain: DomainImpl;

  protected constructor(domain: Domain) {
    this._domain = domain as DomainImpl;
  }
}