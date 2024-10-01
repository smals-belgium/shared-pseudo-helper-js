import {PointFactory} from "./PointFactory";
import {Domain} from "../Domain";
import {Value} from "../Value";
import {InvalidValueError} from "../errors/InvalidValueError";
import BN from "bn.js";
import {ValueImpl} from "./ValueImpl";
import {ECPoint} from "./ECPoint";
import {ValueFactory} from "../ValueFactory";
import {MultipleValue} from "../MultipleValue";
import {MultipleValueImpl} from "./MultipleValueImpl";

export class ValueFactoryImpl extends PointFactory implements ValueFactory {

  private readonly _maxValueSize: number;

  constructor(domain: Domain) {
    super(domain);

    //Arbitrary defined by eHealth. Could have been curve field size / 8  - buffer size -1
    this._maxValueSize = 32;
  }

  fromArray(value: Uint8Array): Value {
    const bufferSize = this._domain.bufferSize;

    if (value == null) {
      value = new Uint8Array(0);
    } else {
      if (value.length > this._maxValueSize) {
        throw new InvalidValueError("The value is too long: should be max " + this._maxValueSize + " bytes");
      }
    }

    // Create a new Byte Array with a length 1 + value.length + 1 + bufferSize
    // The first Byte is set to 0
    const xBytes =
        Uint8Array.from([
          0x0,
          ...value,
          value.length,
          ...new Array(bufferSize).fill(0x0)
        ]);

    // Compute the X coordinates by converting the xBytes to a BN
    // Then put the X Coordinate on the elliptic curve
    let xCoordinates = new BN(xBytes);

    // Compute y on the elliptic curve
    let y = this._domain.computeY(xCoordinates);
    while (y === undefined) {
      xCoordinates = xCoordinates.addn(1);
      y = this._domain.computeY(xCoordinates);
    }

    return new ValueImpl(new ECPoint(xCoordinates, y, this._domain.ec), this._domain);
  }

  multiple(values?: Array<Value>): MultipleValue {
    if (values == null) {

      return new MultipleValueImpl(this._domain);
    }

    return new MultipleValueImpl(this._domain, values);
  }

  fromString(value: string) {
    let utf8Encode = new TextEncoder();
    return (this.fromArray(utf8Encode.encode(value)));
  }

  getMaxValueSize(): number {
    return this._maxValueSize;
  }
}