import {Point} from "./Point";
import {Base64} from "./utils/Base64";

/**
 * Wrapper around an elliptic curve point that provides useful methods to manipulate eHealth pseudonyms.
 */
export interface Pseudonym extends Point {
  // tag::methods[]
  /**
   * Returns binary representation of the X coordinate (as a byte array converted in a Base64 String using {@link Base64}).
   *
   * @return binary representation of the X coordinate (as a byte array converted in a Base64 String)
   */
  x(): string;

  /**
   * Returns binary representation of the Y coordinate (as a byte array converted in a Base64 String using {@link Base64}).
   *
   * @return binary representation of the Y coordinate (as a byte array converted in a Base64 String)
   */
  y(): string;

  /**
   * Uncompressed SEC1 representation of this point as a Base64 String (using the {@link Base64}).
   *
   * @return uncompressed SEC1 representation of this point as a Base64 String
   */
  sec1(): string;

  /**
   * Compressed SEC1 representation of this point as a Base64 String (using the {@link Base64}).
   *
   * @return compressed SEC1 representation of this point as a Base64 String
   */
  sec1Compressed(): string;
  // end::methods[]
}

