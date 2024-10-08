import {Domain} from "./Domain";
import {InvalidTransitInfoError} from "./errors/InvalidTransitInfoError";

/**
 * Transit info containing encrypted information about the {@link PseudonymInTransit}.
 * <p>
 * It contains the encrypted headers {@code iat}, {@code exp} and {@code scalar} which is the scalar to use to "decrypt" the {@link PseudonymInTransit}.
 * <p>
 * It also contains public headers like {@code iat} and {@code exp}.
 */
export interface TransitInfo {

  /**
   * Returns the JWE compact representation if this {@link TransitInfo}.
   *
   * @return the JWE compact representation if this {@link TransitInfo}.
   */
  asString(): string;

  /**
   * Returns the audience of this {@link TransitInfo}.
   * <p>
   * Basically, it is the URL of the {@link Domain}.
   *
   * @return the audience of this {@link TransitInfo}
   * @throws InvalidTransitInfoError if the transit info String cannot be parsed or is invalid
   */
  audience(): string;

  /**
   * Validate the header of this {@link TransitInfo}.
   *
   * @throws InvalidTransitInfoError if the transit info String cannot be parsed or is invalid
   */
  validateHeader(): void;

  /**
   * Retrieves the protected (unencrypted) headers as a Map containing key-value pairs.
   *
   * This map contains the headers {@code aud}, {@code kid}, {@code iat}, {@code exp}, {@code alg} and {@code enc}.
   *
   * @return {Map<string, string | number>} A Map where each key is a header name and each value is the corresponding header value.
   */
  get headers(): Map<string, string | number>;
}

