import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {BackendResponse} from '@common/core/types/backend-response';
import {Link} from './link';
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

export interface GetLinkResponse {
    link: Link;
    analytics: LinkStats;
}

export interface CrupdateLinkPayload extends Partial<Link> {
    groups?: number[];
    multiple_urls?: string[];
}

export type LinkReportRange = 'weekly' | 'monthly' | 'yearly';

@Injectable({
    providedIn: 'root'
})
export class LinkService {
    static BASE_URI = 'link';
    constructor(private http: AppHttpClient) {}

    public index(params: {userId?: number, query?: string, groupId?: number|string, per_page?: number} = {}): PaginatedBackendResponse<Link> {
        return this.http.get(`${LinkService.BASE_URI}`, params);
    }

    public get(id: number, params: {range?: LinkReportRange, customRange?: string} = {}): BackendResponse<GetLinkResponse> {
        return this.http.get(`${LinkService.BASE_URI}/${id}`, params);
    }

    public create(params: CrupdateLinkPayload): BackendResponse<{link: Link}|{links: Link[]}> {
        return this.http.post(LinkService.BASE_URI, params);
    }

    public update(id, params: CrupdateLinkPayload): BackendResponse<{ link: Link }> {
        return this.http.put(`${LinkService.BASE_URI}/${id}`, params);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete(`${LinkService.BASE_URI}/${ids}`);
    }

    public getCurrentUserReports(params: {range?: LinkReportRange, customRange?: string} = {}): BackendResponse<{analytics: LinkStats}> {
        return this.http.get(`${LinkService.BASE_URI}/reports`, params);
    }
}
