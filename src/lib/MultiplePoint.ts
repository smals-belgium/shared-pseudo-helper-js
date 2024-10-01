import {Point} from "./Point";
import {Domain} from "./Domain";
import {EHealthProblem} from "./EHealthProblem";

export interface MultiplePoint<T extends Point | EHealthProblem> {

  /**
   * Returns the {@link Domain} to which this MultiplePoint belong.
   *
   * @return the {@link Domain} to which this MultiplePoint belong
   */
  get domain(): Domain;

  /**
   * Adds one or more (max 10) {@link Point} or {@link EHealthProblem} items to the collection.
   * This method allows for dynamically increasing the collection size by appending new items.
   *
   * @param items - An array of {@link Point} or {@link EHealthProblem} items to be added.
   * @return The new length of the collection after the items have been added.
   */
  pushPoint(...items: (T | EHealthProblem)[]): number;


  /**
   * Returns the {@link Point} or {@link EHealthProblem}  at the given index.
   *
   * @param index the index of the element to return
   * @return the element at the given index
   */
  getPoint(index: number): T | EHealthProblem;

  /**
   * Splice implementation on the underlying {@link Point} or {@link EHealthProblem} Array
   * @param index Index at which to start changing the underlying {@link Point} or {@link EHealthProblem} Array.
   * @param deleteCount A number indicating the number of old Array elements to remove. If deleteCount is 0, no elements are removed.
   * @return Returns the extracted  {@link Point} or {@link EHealthProblem} Array based on the passed parameters.
   */
  splicePoints(index: number, deleteCount?: number): (EHealthProblem | T)[];

  /**
   * Returns the number of elements.
   * <p>
   * The size will always be >= 0 and <= 10.
   *
   * @return the number of elements in the underlying {@link Point} or {@link EHealthProblem} Array
   */
  lengthPoints(): number;

}
