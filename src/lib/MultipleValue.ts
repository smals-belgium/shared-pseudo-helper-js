import {Value} from "./Value";
import {MultiplePseudonymInTransit} from "./MultiplePseudonymInTransit";
import {MultiplePoint} from "./MultiplePoint";
import {EHealthProblem} from "./EHealthProblem";

export interface MultipleValue extends MultiplePoint<Value | EHealthProblem> {

  /**
   * Initiates the pseudonymization process for the  {@link Value}s items.
   * This method generates pseudonyms for each item in the collection, effectively anonymizing the data
   *
   * @returns A {@link Promise} that resolves to a {@link MultiplePseudonymInTransit} containing the pseudonymized items of the collection.
   */
  pseudonymize(): Promise<MultiplePseudonymInTransit>;
}

