import {ValueFactory} from './ValueFactory';
import {PseudonymFactory} from './PseudonymFactory';
import {PseudonymInTransitFactory} from './PseudonymInTransitFactory';


export interface Domain {

  /**
   * Returns the {@link ValueFactory} of this domain.
   *
   * @return the {@link ValueFactory} of this domain
   */
  get valueFactory(): ValueFactory;

  /**
   * Returns the {@link PseudonymInTransitFactory} of this domain.
   *
   * @return the {@link PseudonymInTransitFactory} of this domain
   */
  get pseudonymInTransitFactory(): PseudonymInTransitFactory;

  /**
   * Returns the {@link PseudonymFactory} of this domain.
   *
   * @return the {@link PseudonymFactory} of this domain
   */
  get pseudonymFactory(): PseudonymFactory;

  /**
   * Returns the key of this domain.
   *
   * @return the key of this domain
   */
  get key(): string;

}

