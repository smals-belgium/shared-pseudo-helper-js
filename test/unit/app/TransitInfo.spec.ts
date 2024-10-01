import {ProtectedHeaderParameters} from 'jose/dist/types/util/decode_protected_header';
import {DomainImpl} from "../../../src/lib/internal/DomainImpl";
import {TransitInfoImpl} from "../../../src/lib/internal/TransitInfoImpl";
import {InvalidTransitInfoError} from "../../../src";

describe.skip('TransitInfoImpl', () => {
  let domain: DomainImpl;
  let validHeader: ProtectedHeaderParameters;
  let currentTime: number;
  let rawTransitInfo: string;

  beforeEach(() => {
    domain = new DomainImpl(null, null, null, 'https://api-acpt.ehealth.fgov.be/pseudo/v1/domains/uhmep_v1', 8, null);
    rawTransitInfo = 'eyJhdWQiOiJodHRwczovL2FwaS1hY3B0LmVoZWFsdGguZmdvdi5iZS9wc2V1ZG8vdjEvZG9tYWlucy91aG1lcF92MSIsImVuYyI6IkEyNTZHQ00iLCJleHAiOjE3MjA1Mjk2MzUsImlhdCI6MTcyMDUyOTAzNSwiYWxnIjoiZGlyIiwia2lkIjoiZmI4YmU2MGMtYTkzNi00ODM4LTkxM2YtOGMxMjRkMGNkOGIwIn0..9clwUuR4AUg94rXZ.xkGLPs_P70veIBgoksKCcyOa4MoyYv70HD234qGrCO1qFuFIbWJ42xxsOkVPbKtUAuAjunfl1CBVrgbrZo-9engISSF2XjAp1H0baSj5UaBdYKuFteNBNTZed1PXBZxnzAVwWMdUUnWMEg4v_HMTPnNtc-WECIIvlU9WfHVfkycAxNrFeKG7.jea9KaPNoNBJh6UeafbVOg';
    currentTime = 1720529035;
    validHeader = {
      alg: 'dir',
      enc: 'A256GCM',
      kid: 'fb8be60c-a936-4838-913f-8c124d0cd8b0',
      aud: 'https://api-acpt.ehealth.fgov.be/pseudo/v1/domains/uhmep_v1',
      iat: currentTime,
      exp: currentTime + 600, // 10 minutes in the future
    };
  });

  it('should parse raw string correctly', () => {
    const transitInfo = new TransitInfoImpl(domain, rawTransitInfo);
    expect(transitInfo.parse()).toEqual(validHeader);
  });


  it('should validate audience correctly', () => {
    const transitInfo = new TransitInfoImpl(domain, rawTransitInfo);
    expect(() => transitInfo.validateHeader()).not.toThrow();
  });

  it('should throw InvalidTransitInfoError for invalid audience', () => {
    const invalidAudParams = {...validHeader, aud: 'invalidAudience'};
    const transitInfo = new TransitInfoImpl(domain, invalidAudParams);
    expect(() => transitInfo.validateHeader()).toThrow(InvalidTransitInfoError);
  });

  it('should not throw error for valid iat and exp', () => {
    const transitInfo = new TransitInfoImpl(domain, validHeader);
    expect(() => transitInfo.validateHeader()).not.toThrow();
  });

  it('should throw error for expired transitInfo', () => {
    const expiredParams = {...validHeader, exp: Math.floor((currentTime - 60000) / 1000)}; // 1 minute in the past
    const transitInfo = new TransitInfoImpl(domain, expiredParams);
    expect(() => transitInfo.validateHeader()).toThrow(Error);
  });

  it('should throw error for not yet valid transitInfo', () => {
    const futureParams = {...validHeader, iat: Math.floor((currentTime + 60000) / 1000)}; // 1 minute in the future
    const transitInfo = new TransitInfoImpl(domain, futureParams);
    expect(() => transitInfo.validateHeader()).toThrow(Error);
  });
});