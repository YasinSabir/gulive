import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {GenericBackendResponse} from '@common/core/types/backend-response';
import {LinkUsageResponse} from './link-usage-response';
import {CrupdateLinkSelectValuesService} from '../../dashboard/link/crupdate-link-select-values.service';

export const LINK_USAGE_BASE_URI = 'link/usage';

@Injectable({
    providedIn: 'root'
})
export class LinkUsageService {
    public response$ = new ReplaySubject<LinkUsageResponse>(1);

    constructor(
        private http: AppHttpClient,
        private selectValues: CrupdateLinkSelectValuesService,
    ) {}

    public reload() {
        this.selectValues.clearCache();
        this.http.get<GenericBackendResponse<LinkUsageResponse>>(LINK_USAGE_BASE_URI).subscribe(response => {
            this.response$.next(response);
        });
    }
}
