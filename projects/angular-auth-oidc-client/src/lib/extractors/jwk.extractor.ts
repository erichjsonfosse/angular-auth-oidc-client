import { Injectable } from '@angular/core';
import { ErrorBuilder } from '../utils/error.builder';

@Injectable()
export class JwkExtractor {
  static InvalidArgumentError = ErrorBuilder.buildError('InvalidArgumentError', 'Array of keys was empty. Unable to extract', JwkExtractor.name);

  static NoMatchingKeysError = ErrorBuilder.buildError('NoMatchingKeysError', 'No key found matching the spec', JwkExtractor.name);

  static SeveralMatchingKeysError = ErrorBuilder.buildError('SeveralMatchingKeysError', 'More than one key found. Please use spec to filter', JwkExtractor.name);

  extractJwk(keys: JsonWebKey[], spec?: {kid?: string, use?: string, kty?: string}, throwOnEmpty = true): JsonWebKey[] {
    if (0 === keys.length) {
      throw JwkExtractor.InvalidArgumentError;
    }

    let foundKeys = keys
      .filter((k) => spec?.kid ? k['kid'] === spec.kid : true)
      .filter((k) => spec?.use ? k['use'] === spec.use : true)
      .filter((k) => spec?.kty ? k['kty'] === spec.kty : true);

    if (foundKeys.length === 0 && throwOnEmpty) {
      throw JwkExtractor.NoMatchingKeysError;
    }

    if (foundKeys.length > 1 && (null === spec || undefined === spec)) {
      throw JwkExtractor.SeveralMatchingKeysError;
    }

    return foundKeys;
  }
}
