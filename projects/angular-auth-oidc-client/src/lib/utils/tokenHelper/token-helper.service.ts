import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { OpenIdConfiguration } from '../../config/openid-configuration';
import { LoggerService } from '../../logging/logger.service';
import { ErrorBuilder } from '../error.builder';

const PARTS_OF_TOKEN = 3;

@Injectable()
export class TokenHelperService {
  static TokenMissingExpError = ErrorBuilder.buildError('TokenMissingExpError', 'Token is missing the exp claim', TokenHelperService.name);
  static InvalidTokenError = ErrorBuilder.buildError('InvalidTokenError', 'Token is invalid. Try validating it at jwt.io', TokenHelperService.name);
  static MissingTokenError = ErrorBuilder.buildError('MissingTokenError', 'Token is missing', TokenHelperService.name);

  constructor(private readonly loggerService: LoggerService, @Inject(DOCUMENT) private readonly document: Document) {}

  getTokenExpirationDate(dataIdToken: any): Date {
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, 'exp')) {
      throw TokenHelperService.TokenMissingExpError;
    }

    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch

    date.setUTCSeconds(dataIdToken.exp);

    return date;
  }

  getSigningInputFromToken(token: any, encoded: boolean, configuration: OpenIdConfiguration): string {
    this.throwIfInvalidToken(token, configuration);

    const header: string = this.getHeaderFromToken(token, encoded, configuration);
    const payload: string = this.getPayloadFromToken(token, encoded, configuration);

    return [header, payload].join('.');
  }

  getHeaderFromToken(token: any, encoded: boolean, configuration: OpenIdConfiguration): any {
    this.throwIfInvalidToken(token, configuration);

    return encoded ? this.getPartOfToken(token, 0) : this.getDecodedPartOfToken(token, 0);
  }

  getPayloadFromToken(token: any, encoded: boolean, configuration: OpenIdConfiguration): any {
    this.throwIfInvalidToken(token, configuration);

    return encoded ? this.getPartOfToken(token, 1) : this.getDecodedPartOfToken(token, 1);
  }

  getSignatureFromToken(token: any, encoded: boolean, configuration: OpenIdConfiguration): any {
    this.throwIfInvalidToken(token, configuration);

    return encoded ? this.getPartOfToken(token, 2) : this.getDecodedPartOfToken(token, 2);
  }

  private getDecodedPartOfToken(token: string, index: number): object {
    const partOfToken = this.extractPartOfToken(token, index);

    const result = this.urlBase64Decode(partOfToken);

    return JSON.parse(result);
  }

  private getPartOfToken(token: string, index: number): string {
    return this.extractPartOfToken(token, index);
  }

  private urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');

    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw Error('Illegal base64url string!');
    }

    const decoded =
      typeof this.document.defaultView !== 'undefined'
        ? this.document.defaultView.atob(output)
        : Buffer.from(output, 'base64').toString('binary');

    try {
      // Going backwards: from byte stream, to percent-encoding, to original string.
      return decodeURIComponent(
        decoded
          .split('')
          .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (err) {
      return decoded;
    }
  }

  private throwIfInvalidToken(token: string, configuration: OpenIdConfiguration): void {
    if (!token) {
      this.loggerService.logError(configuration, TokenHelperService.MissingTokenError);

      throw TokenHelperService.MissingTokenError;
    }

    if (!token.includes('.')) {
      this.loggerService.logError(configuration, TokenHelperService.InvalidTokenError);

      throw TokenHelperService.InvalidTokenError;
    }

    const parts = token.split('.');

    if (parts.length !== PARTS_OF_TOKEN) {
      this.loggerService.logError(configuration, TokenHelperService.InvalidTokenError);

      throw TokenHelperService.InvalidTokenError;
    }
  }

  private extractPartOfToken(token: string, index: number): string {
    return token.split('.')[index];
  }
}
