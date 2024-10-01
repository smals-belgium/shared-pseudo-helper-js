import {Domain} from "./Domain"
import {PseudonymisationClient} from "./PseudonymisationClient"
import * as elliptic from "elliptic";
import {DomainImpl} from "./internal/DomainImpl";
import {Curve} from "./Curve";

/**
 * Provides utilities for pseudonymisation processes
 */export class PseudonymisationHelper {


  private readonly _pseudonimizationClient: PseudonymisationClient;

  /**
   * Constructs a new instance of the PseudonymisationHelper.
   * @param pseudonimizationClient The pseudonymization client to be used to call eHealth pseudonymization service.
   */  constructor(pseudonimizationClient: PseudonymisationClient) {
    this._pseudonimizationClient = pseudonimizationClient;
  }

  /**
   * Creates a new domain which will be the entry point of pseudonymization process.
   *
   * @param domainKey The key identifying the domain.
   * @param crv The cryptographic curve to be used.
   * @param audience The intended audience of the domain.
   * @param bufferSize The size of the buffer for cryptographic operations.
   * @returns A new `Domain` instance configured with the specified parameters.
   */
  public createDomain(domainKey: string, crv: Curve, audience: string, bufferSize: number): Domain {

    return new DomainImpl(domainKey, CurveDetails[crv].eHealth, new elliptic.ec(CurveDetails[crv].ellipticJS), audience, bufferSize, this._pseudonimizationClient);
  };

}

const CurveDetails = {
  [Curve.P521]: {eHealth: "P-521", ellipticJS: "p521"}
};