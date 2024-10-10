import {Point} from "./Point";
import {Pseudonym} from "./Pseudonym";
import {PseudonymInTransit} from "./PseudonymInTransit";
import {EHealthProblem} from "./EHealthProblem";

/**
 * Wrapper around an elliptic curve point representing a value, that provides useful methods to manipulate it.
 */
export interface Value extends Point {
  // tag::methods[]
  /**
   * Returns the value as a bytes array.
   * <p>
   * Use it for non-text values.
   *
   * @return the value as a bytes array
   */
  asBytes(): Uint8Array;

  /**
   * Returns the value as a String.
   * <p>
   * Convenient method that converts the bytes array (representing UTF-8 characters) to a String.
   * <p>
   * Use it for text values.
   *
   * @return the value as a String
   */
  asString(): string;

  /**
   * Returns this {@link Value} as a {@link Pseudonym}.
   * <p>
   * Should not be used in regular usage, but it can be convenient for testing/logging purpose.
   *
   * @return this {@link Value} as a {@link Pseudonym}.
   */
  asPseudonym(): Pseudonym;

  /**
   * Pseudonymize this {@link Value}.
   *
   * @return a random {@link PseudonymInTransit} for this {@link Value}.
   */
  pseudonymize(): Promise<PseudonymInTransit | EHealthProblem>;
  // end::methods[]
}

