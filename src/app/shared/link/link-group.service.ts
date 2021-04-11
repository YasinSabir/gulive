import {Injectable} from '@angular/core';
import {BackendResponse} from '@common/core/types/backend-response';
import {LinkGroup} from './link-group';
import {LinkReportRange, LinkStats} from './link.service';
import {PaginationResponse} from '@common/core/types/pagination/pagination-response';
import {Link} from './link';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';

export interface GetLinkGroupResponse {
    group: LinkGroup;
    links: PaginationResponse<Link>;
    reports: LinkStats;
}

@Injectable({
    providedIn: 'root'
})
export class LinkGroupService {
    static BASE_URI = 'link-group';
    constructor(private http: AppHttpClient) {}

    public index(params: PaginationParams = {}): PaginatedBackendResponse<LinkGroup> {
        return this.http.get(`${LinkGroupService.BASE_URI}`, params);
    }

    public get(id: number, params: {range?: LinkReportRange, customRange?: string, reportsOnly?: boolean} = {}): BackendResponse<GetLinkGroupResponse> {
        return this.http.get(`${LinkGroupService.BASE_URI}/${id}`, params);
    }

    public create(params: Partial<LinkGroup>): BackendResponse<{ group: LinkGroup }> {
        return this.http.post(LinkGroupService.BASE_URI, params);
    }

    public update(id, params: Partial<LinkGroup>): BackendResponse<{ group: LinkGroup }> {
        return this.http.put(`${LinkGroupService.BASE_URI}/${id}`, params);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete(`${LinkGroupService.BASE_URI}/${ids}`);
    }

    public detach(groupId: number, linkIds: number[]) {
        return this.http.post(`${LinkGroupService.BASE_URI}/${groupId}/detach`, {linkIds});
    }

    public attach(groupId: number, linkIds: number[]) {
        return this.http.post(`${LinkGroupService.BASE_URI}/${groupId}/attach`, {linkIds});
    }

    public links(groupId: number, params: PaginationParams): PaginatedBackendResponse<Link> {
        return this.http.get(`${LinkGroupService.BASE_URI}/${groupId}/links`, params);
    }

    public analytics(groupId: number): BackendResponse<{analytics: LinkStats, linkGroup: LinkGroup}> {
        return this.http.get(`${LinkGroupService.BASE_URI}/${groupId}/analytics`);
    }
}
