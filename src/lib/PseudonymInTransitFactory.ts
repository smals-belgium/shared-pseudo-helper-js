import {Pseudonym} from "./Pseudonym";
import {PseudonymInTransit} from "./PseudonymInTransit";
import {MultiplePseudonymInTransit} from "./MultiplePseudonymInTransit";
import {InvalidPseudonymError} from "./errors/InvalidPseudonymError";

/**
 * Allows to create {@link PseudonymInTransit} for a {@link Domain}.
 */
export interface PseudonymInTransitFactory {
  // tag::methods[]
  /**
   * @param pseudonym   the {@link Pseudonym} part of the {@link PseudonymInTransit}
   * @param transitInfo the {@link TransitInfo} part ot the {@link PseudonymInTransit}
   * @return A {@link PseudonymInTransit} created from the given {@link Pseudonym} and {@link TransitInfo}
   */
  from(pseudonym: Pseudonym, transitInfo: string): PseudonymInTransit;

  /**
   * Creates a {@link PseudonymInTransit} from the given coordinates, and transit info.
   *
   * @param x           Base64 string representation of the X coordinate.
   * @param y           Base64 string representation of the Y coordinate.
   * @param transitInfo the standard JWE compact representation (Base64 URL encoded String) of the transitInfo
   *                    which contains the scalar that will be used to unblind the given {@link Pseudonym}.
   * @return A {@link PseudonymInTransit} created from the given coordinates and transit info
   */
  fromXYAndTransitInfo(x: string, y: string, transitInfo: string): PseudonymInTransit;

  /**
   * @param sec1AndTransitInfo Base64 URL string representation (without padding) of the SEC1 encoded point (can be SEC1 compressed or uncompressed format),
   *                           followed by {@code :}, and by the string representation of the {@link TransitInfo} (JWE compact).
   * @return A {@link PseudonymInTransit} created from the given {@code sec1AndTransitInfo}
   * @throws InvalidPseudonymError if the format of the given {@code sec1AndTransitInfo} is invalid
   */
  fromSec1AndTransitInfo(sec1AndTransitInfo: string): PseudonymInTransit;

  /**
   * Create an empty {@link MultiplePseudonymInTransit}.
   *
   * @return an empty {@link MultiplePseudonymInTransit}.
   */
  multiple(): MultiplePseudonymInTransit;

  /**
   * Create a {@link MultiplePseudonymInTransit} containing the items of the given {@link Array}.
   * <p>
   * The items (references) of the given collection are copied to returned {@link MultiplePseudonymInTransit}.
   * Changes done on the collection will not be reflected on the returned {@link MultiplePseudonymInTransit}.
   *
   * @param pseudonymsInTransit {@link Array} of items to copy in the returned {@link MultiplePseudonymInTransit}
   * @return a {@link MultiplePseudonymInTransit} containing the items of the given {@link Array}
   */
  multiple(pseudonymsInTransit: Array<PseudonymInTransit>): MultiplePseudonymInTransit;
  // end::methods[]
}

