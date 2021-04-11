import {Injectable} from '@angular/core';
import {BackendResponse} from '@common/core/types/backend-response';
import {ApiKey} from './api-key';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {AppHttpClient} from '@common/core/http/app-http-client.service';

export interface LinkStats {
    totalClicks: number;
    clicks: { label: string, count: number }[];
    browsers: { label: string, count: number }[];
    locations: { label: string, code: string, percentage: number, count: number }[];
    devices: { label: string, count: number }[];
    platforms: { label: string, count: number }[];
    referrers: { label: string, count: number }[];
    startDate: string;
    endDate: string;
}

export interface GetApiKeyResponse {
    link: ApiKey;
    analytics: LinkStats;
}

export interface CrupdateApiKeyPayload extends Partial<ApiKey> {
    groups?: number[];
    multiple_urls?: string[];
}

export type LinkReportRange = 'weekly' | 'monthly' | 'yearly';

@Injectable({
    providedIn: 'root'
})
export class ApiKeysService {
    static BASE_URI = 'secure/api-key';
    constructor(private web: AppHttpClient) {}

    public index(params: { userId?: number, query?: string, groupId?: number | string, per_page?: number } = {}): PaginatedBackendResponse<ApiKey> {
        return this.web.get(`${ApiKeysService.BASE_URI}`, params);
    }

    public get(id: number, params: { range?: LinkReportRange, customRange?: string } = {}): BackendResponse<GetApiKeyResponse> {
        return this.web.get(`${ApiKeysService.BASE_URI}/${id}`, params);
    }

    public create(params: CrupdateApiKeyPayload): BackendResponse<{ link: ApiKey } | { links: ApiKey[] }> {
        return this.web.post(ApiKeysService.BASE_URI, params);
    }

    public update(id, params: CrupdateApiKeyPayload): BackendResponse<{ link: ApiKey }> {
        return this.web.put(`${ApiKeysService.BASE_URI}/${id}`, params);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.web.delete(`${ApiKeysService.BASE_URI}/${ids}`);
    }

    public getCurrentUserReports(params: { range?: LinkReportRange, customRange?: string } = {}): BackendResponse<{ analytics: LinkStats }> {
        return this.web.get(`${ApiKeysService.BASE_URI}/reports`, params);
    }
}
