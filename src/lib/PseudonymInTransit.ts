import {TransitInfo} from "./TransitInfo"
import {Value} from "./Value";
import {Pseudonym} from "./Pseudonym";
import {EHealthProblem} from "./EHealthProblem";

export interface PseudonymInTransit extends Pseudonym {
  // tag::methods[]
  /**
   * Returns the standard String representation of this {@link PseudonymInTransit}.
   * <p>
   * It returns the Base64 URL representation of the uncompressed SEC1 representation of the point
   * followed by `:` and by the String representation of the {@link TransitInfo} (JWE compact).
   * <p>
   * Prefer this method instead of {@link #asShortString()} when the length of the String is not very important,
   * because it avoids the recipient of this {@link PseudonymInTransit} to compute the Y coordinate of the point.
   *
   * @return the standard String representation of this {@link PseudonymInTransit}
   */
  asString(): string;

  /**
   * Returns the short String representation of this {@link PseudonymInTransit}.
   * <p>
   * It returns the Base64 URL representation of the compressed SEC1 representation of the point
   * followed by `:` and by the String representation of the {@link TransitInfo} (JWE compact).
   * <p>
   * Only use this method instead of {@link #asString()} when you need to shorten the String (to prevent a too long URL for example).
   * The drawback is that the recipient of this {@link PseudonymInTransit} will have to compute the Y coordinate of the point.
   *
   * @return the standard String representation of this {@link PseudonymInTransit}
   */
  asShortString(): string;

  /**
   * Identify (de-pseudonymise) this {@link PseudonymInTransit}.
   *
   * @return the identified value.
   */
  identify(): Promise<Value | EHealthProblem> ;

  /**
   * Returns the {@link TransitInfo}.
   *
   * @return the {@link TransitInfo}
   */
  get transitInfo(): TransitInfo;
  // end::methods[]
}

