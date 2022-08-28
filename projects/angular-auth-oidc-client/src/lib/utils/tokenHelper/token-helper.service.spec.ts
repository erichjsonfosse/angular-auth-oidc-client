import { TestBed } from '@angular/core/testing';
import { mockClass } from '../../../test/auto-mock';
import { LoggerService } from '../../logging/logger.service';
import { TokenHelperService } from './token-helper.service';
import { testAccessToken, testAccessTokenPayload, testAccessTokenPayloadData } from '../../../test/token-data.mock';

describe('Token Helper Service', () => {
  let tokenHelperService: TokenHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenHelperService, { provide: LoggerService, useClass: mockClass(LoggerService) }],
    });
  });

  beforeEach(() => {
    tokenHelperService = TestBed.inject(TokenHelperService);
  });

  it('should create', () => {
    expect(tokenHelperService).toBeTruthy();
  });

  describe('getTokenExpirationDate', () => {
    it('throws error if param has no property exp', () => {
      expect(() => tokenHelperService.getTokenExpirationDate({})).toThrow(TokenHelperService.TokenMissingExpError);
    });

    it('returns correct date if param has property exp', () => {
      const expectedDate = new Date(0);

      expectedDate.setUTCSeconds(123);

      const result = tokenHelperService.getTokenExpirationDate({
        exp: 123,
      });

      expect(expectedDate.toString()).toEqual(result.toString());
    });
  });

  describe('getSigningInputFromToken', () => {
    it('Throws error if token is not valid', () => {
      expect(() => {
        tokenHelperService.getSigningInputFromToken('', true, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('returns string if token is valid', () => {
      const token = 'a.valid.token';
      const result = tokenHelperService.getSigningInputFromToken(token, true, { configId: 'configId1' });

      expect(result).toBe('a.valid');
    });
  });

  describe('getPayloadFromToken', () => {
    it('Throws error if token is undefined', () => {
      expect(() => {
        tokenHelperService.getPayloadFromToken(undefined, false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token is null', () => {
      expect(() => {
        tokenHelperService.getPayloadFromToken(null, false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token is empty', () => {
      expect(() => {
        tokenHelperService.getPayloadFromToken('', false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token has no points', () => {
      expect(() => {
        tokenHelperService.getPayloadFromToken('testStringWithoutDots', false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.InvalidTokenError);
    });

    it('Throws error if token has only one point', () => {
      expect(() => {
        tokenHelperService.getPayloadFromToken('testStringWithSingle.dot', false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.InvalidTokenError);
    });

    it('returns payload if token is correct, encode is true', () => {
      const result = tokenHelperService.getPayloadFromToken(testAccessToken, true, { configId: 'configId1' });

      expect(result).toEqual(testAccessTokenPayload);
    });

    it('returns payload if token is correct, encode is false', () => {
      const result = tokenHelperService.getPayloadFromToken(testAccessToken, false, { configId: 'configId1' });

      expect(result).toEqual(testAccessTokenPayloadData);
    });
  });

  describe('getHeaderFromToken', () => {
    it('Throws error if token is undefined, encode is false', () => {
      expect(() => {
        tokenHelperService.getHeaderFromToken(undefined, false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token is null, encode is true', () => {
      expect(() => {
        tokenHelperService.getHeaderFromToken(null, false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token is empty, encode is true', () => {
      expect(() => {
        tokenHelperService.getHeaderFromToken('', false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token has no points, encode is true', () => {
      expect(() => {
        tokenHelperService.getHeaderFromToken('testStringWithoutDots', false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.InvalidTokenError);
    });

    it('Throws error if token has only one point, encode is false', () => {
      expect(() => {
        tokenHelperService.getHeaderFromToken('testStringWithSingle.dot', false, { configId: 'configId1' });
      }).toThrow(TokenHelperService.InvalidTokenError);
    });

    it('returns payload if token is correct, encode is true', () => {
      const token = 'abc.def.ghi';
      const expected = 'abc';
      const result = tokenHelperService.getHeaderFromToken(token, true, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is true', () => {
      const token = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9.def.ghi';
      const expected = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9';
      const result = tokenHelperService.getHeaderFromToken(token, true, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is false', () => {
      const token = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9.def.ghi';
      const expected = JSON.parse(`{ "text" : "Hello World 123!"}`);
      const result = tokenHelperService.getHeaderFromToken(token, false, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is false', () => {
      const token = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9.SGVsbG8gV29ybGQgMTIzIQ==.SGVsbG8gV29ybGQgMTIzIQ==';
      const expected = JSON.parse(`{ "text" : "Hello World 123!"}`);
      const result = tokenHelperService.getHeaderFromToken(token, false, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is true', () => {
      const token = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9.abc.ghi';
      const expected = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9';
      const result = tokenHelperService.getHeaderFromToken(token, true, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is true', () => {
      const token = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9.SGVsbG8gV29ybGQgMTIzIQ==.SGVsbG8gV29ybGQgMTIzIQ==';
      const expected = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9';
      const result = tokenHelperService.getHeaderFromToken(token, true, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is false', () => {
      const token = 'eyJ0ZXh0IjogIkhlbGxvIFdvcmxkIDEyMyEifQ=.SGVsbG8gV29ybGQgMTIzIQ==.eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9';
      const expected = JSON.parse(`{"text": "Hello World 123!"}`);
      const result = tokenHelperService.getHeaderFromToken(token, false, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });
  });

  describe('getSignatureFromToken', () => {
    it('Throws error if token is undefined, encode is false', () => {
      expect(() => {
        tokenHelperService.getSignatureFromToken(undefined, true, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token is null', () => {
      expect(() => {
        tokenHelperService.getSignatureFromToken(null, true, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token is empty', () => {
      expect(() => {
        tokenHelperService.getSignatureFromToken('', true, { configId: 'configId1' });
      }).toThrow(TokenHelperService.MissingTokenError);
    });

    it('Throws error if token has no points', () => {
      expect(() => {
        tokenHelperService.getSignatureFromToken('testStringWithoutDots', true, { configId: 'configId1' });
      }).toThrow(TokenHelperService.InvalidTokenError);
    });

    it('Throws error if token has only one point, encode is false', () => {
      expect(() => {
        tokenHelperService.getSignatureFromToken('testStringWithSingle.dot', true, { configId: 'configId1' });
      }).toThrow(TokenHelperService.InvalidTokenError);
    });

    it('returns payload if token is correct, encode is true', () => {
      const token = 'abc.def.ghi';
      const expected = 'ghi';
      const result = tokenHelperService.getSignatureFromToken(token, true, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is true', () => {
      const token = 'def.ghi.eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9';
      const expected = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9';
      const result = tokenHelperService.getSignatureFromToken(token, true, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is false', () => {
      const token = 'def.ghi.eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9';
      const expected = JSON.parse(`{ "text" : "Hello World 123!"}`);
      const result = tokenHelperService.getSignatureFromToken(token, false, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is false', () => {
      const token = 'SGVsbG8gV29ybGQgMTIzIQ==.SGVsbG8gV29ybGQgMTIzIQ==.eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9';
      const expected = JSON.parse(`{ "text" : "Hello World 123!"}`);
      const result = tokenHelperService.getSignatureFromToken(token, false, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is true', () => {
      const token = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9.abc.ghi';
      const expected = 'ghi';
      const result = tokenHelperService.getSignatureFromToken(token, true, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });

    it('returns payload if token is correct, encode is true', () => {
      const token = 'eyAidGV4dCIgOiAiSGVsbG8gV29ybGQgMTIzISJ9.SGVsbG8gV29ybGQgMTIzIQ==.SGVsbG8gV29ybGQgMTIzIQ==';
      const expected = 'SGVsbG8gV29ybGQgMTIzIQ==';
      const result = tokenHelperService.getSignatureFromToken(token, true, { configId: 'configId1' });

      expect(expected).toEqual(result);
    });
  });
});
