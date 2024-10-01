import BN from "bn.js";
import {ec} from "elliptic";
import {InvalidECPointError} from "../errors/InvalidECPointError";

export class ECPoint {

  private readonly _ec: ec;

  private readonly _point: any;


  constructor(x: BN, y: BN, ec: ec) {
    this._ec = ec;
    this._point = this._ec.curve.point(x, y);
    if (!this._ec.curve.validate(this._point)) {
      throw new InvalidECPointError("Invalid point: " + x + ":" + y);
    }
  }

  multiply(scalar: BN): ECPoint {
    const newPoint = this._point.mul(scalar);
    return new ECPoint(newPoint.getX(), newPoint.getY(), this._ec);
  }

  get x(): BN {
    return this._point.getX();
  }

  get y(): BN {
    return this._point.getY();
  }

  get ec(): ec {
    return this._ec;
  }
}