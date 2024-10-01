import BN from "bn.js";
import {Base64} from "../../../../src/lib/utils/Base64";

describe('Base64', () => {

  test('should convert a BN to a Base64 encoded Point', () => {
    let input = new BN("286680715610109892223378847346187489261207420928");
    let expected = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADI3NTg5MzE0MzcwCwAAAAAAAAAA';

    expect(expected).toEqual(Base64.encodeFromBN(input));
  });

  test('should convert a Base64 encoded Point to a BN ', () => {
    let input = 'Mjc1ODkzMTQzNzALAAAAAAAAAAA';
    let expected = new BN("286680715610109892223378847346187489261207420928");
    expect(expected).toEqual(Base64.decodeToBN(input));
  });

  it('should handle empty Uint8Array on encode', () => {
    const emptyBytes = new Uint8Array([]);
    const encoded = Base64.urlEncode(emptyBytes);
    expect(encoded).toEqual('');
  });

  it('should not alter alphanumeric characters during encoding', () => {
    const alphanumericBytes = new Uint8Array([65, 66, 67, 49, 50, 51]); // 'ABC123'
    const encoded = Base64.urlEncode(alphanumericBytes);
    expect(encoded).toMatch(/^[A-Za-z0-9]+$/); // Only contains alphanumeric characters
  });
});
