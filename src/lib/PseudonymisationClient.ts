/**
 * Implement this interface to call the eHealth Pseudonymisation service.
 */
export interface PseudonymisationClient {


  /**
   * Call to /pseudo/v1/domains/{domainKey} and return a Future of the response as a String.
   * <p>
   * Each call to this method <strong>must</strong> make a call to eHealth pseudonymisation service: please do not return a cached response !
   *
   * @param domainKey the domain key
   * @return the response as a String
   */
  getDomain(domainKey: string): Promise<string>;

  /**
   * Call to /pseudo/v1/domains/{domainKey}/identify with the given payload and return a future of the response as a String.
   *
   * @param domainKey the domain key
   * @param payload   the request body
   * @return the response as a String
   */
  identify(domainKey: string, payload: string): Promise<string>;

  /**
   * Call to /pseudo/v1/domains/{domainKey}/identifyMultiple with the given payload and return a future of the response as a String.
   *
   * @param domainKey the domain key
   * @param payload   the request body
   * @return the response as a String
   */
  identifyMultiple(domainKey: string, payload: string): Promise<string>;

  /**
   * Call to /pseudo/v1/domains/{domainKey}/pseudonymize with the given payload and return a future of the response as a String.
   *
   * @param domainKey the domain key
   * @param payload   the request body
   * @return the response as a String
   */
  pseudonymize(domainKey: string, payload: string): Promise<string>;

  /**
   * Call to /pseudo/v1/domains/{domainKey}/pseudonymizeMultiple with the given payload and return a future of the response as a String.
   *
   * @param domainKey the domain key
   * @param payload   the request body
   * @return the response as a String
   */
  pseudonymizeMultiple(domainKey: string, payload: string): Promise<string>;

}