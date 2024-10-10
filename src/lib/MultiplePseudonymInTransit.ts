import {PseudonymInTransit} from "./PseudonymInTransit";
import {MultipleValue} from "./MultipleValue";
import {EHealthProblem} from "./EHealthProblem";
import {MultiplePoint} from "./MultiplePoint";


export interface MultiplePseudonymInTransit extends MultiplePoint<PseudonymInTransit | EHealthProblem> {
 // tag::methods[]
  /**
   * Identify (de-pseudonymise) the {@link PseudonymInTransit}s of this collection.
   *
   * @return a {@link Promise} of {@link MultipleValue} containing the identified {@link PseudonymInTransit}s of this collection
   */
  /**
   * Initiates the de-pseudonymization process for the  {@link PseudonymInTransit}s  items.
   * This method attempts to identify and return the original data associated with each pseudonym in the collection.
   *
   * @returns A {@link Promise} that resolves to a {@link MultipleValue} containing the identified items of the collection,
   * or an {@link EHealthProblem} if an error occurs during the identification process.
   */
  identify(): Promise<MultipleValue | EHealthProblem>;
  // end::methods[]
}

