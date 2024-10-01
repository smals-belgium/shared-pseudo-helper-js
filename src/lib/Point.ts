import {Domain} from "./Domain";

export interface Point {

  /**
   * Get the domain that owns this point.
   *
   * @return the domain that owns this point
   */
  get domain(): Domain;
}

