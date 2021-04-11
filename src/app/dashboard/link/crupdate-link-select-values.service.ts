import {Injectable} from '@angular/core';
import {HttpCacheClient} from '../../../common/core/http/http-cache-client';
import {LINK_PAGE_TYPE, LinkOptionsList} from './types';
import {CurrentUser} from '../../../common/auth/current-user';
import {BackendResponse} from '../../../common/core/types/backend-response';
import {ValueLists} from '../../../common/core/services/value-lists.service';

@Injectable({
    providedIn: 'root'
})
export class CrupdateLinkSelectValuesService {
    constructor(
        private http: HttpCacheClient,
        private currentUser: CurrentUser,
    ) {}

    public get(): BackendResponse<LinkOptionsList> {
        const names = ['countries', 'domains', 'pages', 'overlays', 'pixels', 'groups'];
        return this.http.getWithCache(`${ValueLists.BASE_URI}/${names.join(',')}`, {
            userId: this.currentUser.get('id'),
            pageType: LINK_PAGE_TYPE
        });
    }

    public clearCache() {
        this.http.clearCache();
    }
}
