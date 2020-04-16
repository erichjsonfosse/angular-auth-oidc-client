import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OidcDataService } from '../api/oidc-data.service';
import { ConfigurationProvider } from '../config';
import { StoragePersistanceService } from '../storage';
import { LoggerService } from '../logging/logger.service';

@Injectable()
export class OidcSecurityUserService {
    private userData: any = '';

    constructor(
        private oidcDataService: OidcDataService,
        private storagePersistanceService: StoragePersistanceService,
        private loggerService: LoggerService,
        private readonly configurationProvider: ConfigurationProvider
    ) {}

    initUserData() {
        return this.getIdentityUserData().pipe(map((data: any) => (this.userData = data)));
    }

    getUserData(): any {
        if (!this.userData) {
            throw Error('UserData is not set!');
        }

        return this.userData;
    }

    setUserData(value: any): void {
        this.userData = value;
    }

    private getIdentityUserData(): Observable<any> {
        const token = this.storagePersistanceService.getAccessToken();

        if (!this.configurationProvider.wellKnownEndpoints) {
            this.loggerService.logWarning('init check session: authWellKnownEndpoints is undefined');

            throw Error('authWellKnownEndpoints is undefined');
        }

        const canGetUserData =
            this.configurationProvider.wellKnownEndpoints && this.configurationProvider.wellKnownEndpoints.userinfoEndpoint;

        if (!canGetUserData) {
            this.loggerService.logError(
                'init check session: authWellKnownEndpoints.userinfo_endpoint is undefined; set auto_userinfo = false in config'
            );
            throw Error('authWellKnownEndpoints.userinfo_endpoint is undefined');
        }

        return this.oidcDataService.getIdentityUserData(this.configurationProvider.wellKnownEndpoints.userinfoEndpoint || '', token);
    }
}
