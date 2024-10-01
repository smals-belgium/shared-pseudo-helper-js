import {Point} from "../Point";
import {DomainImpl} from "./DomainImpl";
import {EHealthProblem} from "../EHealthProblem";
import {Domain} from "../Domain";

export abstract class MultiplePointImpl<T extends Point | EHealthProblem> {

  protected readonly _domain: DomainImpl;
  protected readonly _points: Array<T | EHealthProblem>;

  protected constructor(domain: DomainImpl, points?: Array<T | EHealthProblem>) {
    this._domain = domain;
    this._points = new Array<T | EHealthProblem>();

    if (points != null) {
      this.checkCollectionSize(points.length);

      points.forEach(point => {
        if('x' in point && 'y' in point) {
          this.validate(point as T)
        }
      });
      this._points = points.slice();
    }
  }


  pushPoint(...items: (T | EHealthProblem)[]): number {
    this.checkCollectionSize(this._points.length + items.length);

    items.forEach(item => {
      if (!(item instanceof EHealthProblem)) {
        this.validate(item as T)
      }
    });

    return this._points.push(...items);
  }

  getPoint(index: number): T | EHealthProblem {
    return this._points[index];
  }

  splicePoints(index: number, deleteCount?: number): (T | EHealthProblem)[] {
    return this._points.splice(index, deleteCount);
  }

  lengthPoints(): number {
    return this._points.length;
  }

  abstract checkCollectionSize(futureSize: number): void;

  abstract validate(point: T): T;

  get domain(): Domain {
    return this._domain;
  }
}