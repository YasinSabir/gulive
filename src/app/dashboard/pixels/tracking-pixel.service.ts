import {Injectable} from '@angular/core';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {BackendResponse} from '@common/core/types/backend-response';
import {TrackingPixel} from './tracking-pixel';
import {AppHttpClient} from '../../../common/core/http/app-http-client.service';

@Injectable({
    providedIn: 'root'
})
export class TrackingPixelService {
    static BASE_URI = 'tracking-pixel';

    constructor(private http: AppHttpClient) {}

    public index(params: { userId?: number, query?: string } = {}): PaginatedBackendResponse<TrackingPixel> {
        return this.http.get(`${TrackingPixelService.BASE_URI}`, params);
    }

    public create(params: Partial<TrackingPixel>): BackendResponse<{ pixel: TrackingPixel }> {
        return this.http.post(TrackingPixelService.BASE_URI, params);
    }

    public update(id, params: Partial<TrackingPixel>): BackendResponse<{ pixel: TrackingPixel }> {
        return this.http.put(`${TrackingPixelService.BASE_URI}/${id}`, params);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete(`${TrackingPixelService.BASE_URI}/${ids}`);
    }
}
