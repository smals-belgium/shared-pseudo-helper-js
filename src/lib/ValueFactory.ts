import {Value} from "./Value"
import {MultipleValue} from "./MultipleValue";

/**
 * Allows to create {@link Value} for a {@link Domain}.
 */
export interface ValueFactory {

  /**
   * Returns the maximum size of the value (as bytes) that can be converted in a Point.
   * <p>
   * Please note that this is the maximum theoretical size. eHealth asks us not to pseudonymise data with a size exceeding 32 bytes.
   *
   * @return the maximum size of the value.
   */
  getMaxValueSize(): number

  /**
   * Creates a {@link Value} from the given array of bytes.
   *
   * @param value Raw value to convert to {@link Value}.
   * @return the {@link Value} for the given array of bytes
   * @throws InvalidValueException If the value cannot be converted to a {@link Value} (if the value is too long).
   */
  fromArray(value: Uint8Array): Value;

  /**
   * Creates a {@link Value} from the given String.
   * <p>
   * The string will be internally converted to an array of bytes using UTF-8 Charset.
   *
   * @param value String to convert to {@link Value}.
   * @return the {@link Value} for the given array of bytes
   * @throws InvalidValueException If the value cannot be converted to a Value (if the value is too long).
   */
  fromString(value: string): Value;

  /**
   * Create an empty {@link MultipleValue}.
   *
   * @return an empty {@link MultipleValue}.
   */
  multiple(): MultipleValue;

  /**
   * Create a {@link MultipleValue} containing the items of the given {@link Array}.
   * <p>
   * The items (references) of the given Array are copied to the returned {@link MultipleValue}.
   * Changes done on the collection will not be reflected on the returned {@link MultipleValue}.
   *
   * @param values {@link Array} of items to copy in the returned {@link MultipleValue}
   * @return a {@link MultipleValue} containing the items of the given {@link Array}
   */
  multiple(values: Array<Value>): MultipleValue;
}

