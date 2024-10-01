import {DomainImpl} from "../../../src/lib/internal/DomainImpl";
import * as elliptic from 'elliptic';

describe('PseudonymFactory', () => {

  const domain = new DomainImpl(null, null, new elliptic.ec('p521'), null, 8, null);

  const sec1Compressed = 'AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAxMjM0NTY3ODkxMAwAAAAAAAAAAQ';
  const sec1Uncompressed = "BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAxMjM0NTY3ODkxMAwAAAAAAAAAAQHjvYbZ2eX0Wdz8UejdWdSmg5HWrHNActe2loX3Q2Y02CL_hX1ORsOFn_A6PbMLOXvFLBeE-Ue2-8aj5iSGZbWnag";
  const x = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDEyMzQ1Njc4OTEwDAAAAAAAAAAB";
  const xShortened = "MDEyMzQ1Njc4OTEwDAAAAAAAAAAB";
  const y = "ABxCeSYmGgumIwOuFyKmK1l8bilTjL+NKElpegi8mcsn3QB6grG5PHpgD8XCTPTGhDrT6HsGuEkEOVwZ23maSliV";

  test('fromSec1_compressed_to_compressed', () => {
    const pseudonym = domain.pseudonymFactory.fromSec1(sec1Compressed);
    expect(pseudonym.sec1Compressed()).toEqual(sec1Compressed);
  });


  test('fromSec1_compressed_to_uncompressed()', () => {
    const pseudonym = domain.pseudonymFactory.fromSec1(sec1Compressed);
    expect(pseudonym.sec1()).toEqual(sec1Uncompressed);
  });

  test('fromSec1_uncompressed_to_compressed', () => {
    const pseudonym = domain.pseudonymFactory.fromSec1(sec1Uncompressed);
    expect(pseudonym.sec1Compressed()).toEqual(sec1Compressed);
  });

  test('fromSec1_uncompressed_to_uncompressed', () => {
    const pseudonym = domain.pseudonymFactory.fromSec1(sec1Uncompressed);
    expect(pseudonym.sec1()).toEqual(sec1Uncompressed);
  });

  test('fromX', () => {
    const pseudonym = domain.pseudonymFactory.fromX(x);
    expect(pseudonym.y()).toEqual(y);
  });

  test('fromX_small', () => {
    const pseudonym = domain.pseudonymFactory.fromX(xShortened);
    expect(pseudonym.y()).toEqual(y);
  });
});
