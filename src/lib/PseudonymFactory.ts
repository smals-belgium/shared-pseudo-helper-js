import {Pseudonym} from "./Pseudonym";
import {InvalidPseudonymError} from "./errors/InvalidPseudonymError";

/**
 * Allows to create {@link Pseudonym} for a {@link Domain}.
 */
export interface PseudonymFactory {
  // tag::methods[]
  /**
   * Create a {@link Pseudonym} from the given X coordinate.
   * <p>
   * The Y coordinate will be computed and one of the two possible values will be randomly chosen.
   *
   * @param x Base64 string representation of the X coordinate.
   * @return a {@link Pseudonym} having the given X coordinate.
   * @throws InvalidPseudonymError If the coordinates or the format are invalid.
   */
  fromX(x: string): Pseudonym;


  /**
   * @param x Base64 string representation of the X coordinate.
   * @param y Base64 string representation of the Y coordinate.
   * @return Pseudonym
   * @throws InvalidPseudonymError If the coordinates or the format are invalid.
   */

  fromXY(x: string, y: string): Pseudonym;


  /**
   * @param sec1 Base64 string representation of the Sec1 encoded point (can be Sec1 compressed format).
   * @return Pseudonym
   * @throws InvalidPseudonymError If the coordinates or the format are invalid.
   */
  fromSec1(sec1: string): Pseudonym;
  // end::methods[]
}

