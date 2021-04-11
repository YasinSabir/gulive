import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {GenericBackendResponse} from '@common/core/types/backend-response';
import {ApiKeyUsageResponse} from './api-key-usage-response';
import {CrupdateApiKeysSelectValuesService} from '../../dashboard/api-keys/crupdate-api-keys-select-values.service';

export const LINK_USAGE_BASE_URI = 'link/usage';

@Injectable({
    providedIn: 'root'
})
export class ApiKeyUsageService {
    public response$ = new ReplaySubject<ApiKeyUsageResponse>(1);

    constructor(
        private http: AppHttpClient,
        private selectValues: CrupdateApiKeysSelectValuesService,
    ) {
    }

    public reload() {
        this.selectValues.clearCache();
        this.http.get<GenericBackendResponse<ApiKeyUsageResponse>>(LINK_USAGE_BASE_URI).subscribe(response => {
            this.response$.next(response);
        });
    }
}
