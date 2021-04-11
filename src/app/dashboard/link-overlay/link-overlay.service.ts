import {Injectable} from '@angular/core';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {BackendResponse} from '@common/core/types/backend-response';
import {LinkOverlay} from './link-overlay';
import {AppHttpClient} from '@common/core/http/app-http-client.service';

@Injectable({
    providedIn: 'root'
})
export class LinkOverlayService {
    static BASE_URI = 'link-overlay';
    constructor(private http: AppHttpClient) {}

    public index(params: { userId?: number, query?: string } = {}): PaginatedBackendResponse<LinkOverlay> {
        return this.http.get(`${LinkOverlayService.BASE_URI}`, params);
    }

    public get(id: number): BackendResponse<{linkOverlay: LinkOverlay}> {
        return this.http.get(`${LinkOverlayService.BASE_URI}/${id}`);
    }

    public create(params: { host: string }): BackendResponse<{ linkOverlay: LinkOverlay }> {
        return this.http.post(LinkOverlayService.BASE_URI, params);
    }

    public update(id, params: { host: string }): BackendResponse<{ linkOverlay: LinkOverlay }> {
        return this.http.put(`${LinkOverlayService.BASE_URI}/${id}`, params);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete(`${LinkOverlayService.BASE_URI}/${ids}`);
    }
}
