import {Injectable} from '@angular/core';
import {Workspace} from './types/workspace';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {BackendResponse} from '@common/core/types/backend-response';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {WorkspaceMember} from './types/workspace-member';
import {WorkspaceInvite} from './types/workspace-invite';
import {tap} from 'rxjs/operators';
import {ActiveWorkspace} from './active-workspace.service';
import {CurrentUser} from '@common/auth/current-user';
import {BehaviorSubject} from 'rxjs';
import {PaginationResponse} from '../../../common/core/types/pagination/pagination-response';
import {hasKey} from '../../../common/core/utils/has-key';

@Injectable({
    providedIn: 'root'
})
export class WorkspaceApiService {
    static BASE_URI = 'workspace';
    public available$ = new BehaviorSubject<Workspace[]>([
        {name: 'Default', default: true, id: null}
    ]);
    public selected$ = new BehaviorSubject(null);

    constructor(
        private http: AppHttpClient,
        private activeWorkspace: ActiveWorkspace,
        private currentUser: CurrentUser,
    ) {}

    public select(workspace: Workspace) {
        this.activeWorkspace.select(workspace.id);
        this.selected$.next(workspace);
    }

    public pushAndSelect(workspace: Workspace) {
        this.available$.next([...this.available$.value, workspace]);
        this.select(workspace);
    }

    public replace(workspace: Workspace) {
        const workspaces = [...this.available$.value];
        const i = workspaces.findIndex(w => w.id === workspace.id);
        if (i) {
            workspaces[i] = workspace;
        }
        this.available$.next(workspaces);
    }

    public remove(ids: number[]) {
        const workspaces = [...this.available$.value];
        ids.forEach(id => {
            const i = workspaces.findIndex(w => w.id === id);
            if (i) {
                workspaces.splice(i, 1);
            }
        });
        this.available$.next(workspaces);
        if (ids.includes(this.selected$.value.id)) {
            this.selected$.next(this.available$.value[0]);
        }
        if (ids.includes(this.activeWorkspace.id)) {
            this.activeWorkspace.select(null);
        }
    }

    public index(params: {userId?: number} & PaginationParams): PaginatedBackendResponse<Workspace> {
        return this.http.get<{pagination: PaginationResponse<Workspace>}>(`${WorkspaceApiService.BASE_URI}`, params)
            .pipe(tap(response => {
                this.available$.next([...this.available$.value, ...response.pagination.data]);
                this.selected$.next(this.available$.value.find(w => w.id === this.activeWorkspace.id) || this.available$.value[0]);
            }));
    }

    public get(workspaceId: number): BackendResponse<{workspace: Workspace}> {
        return this.http.get(`${WorkspaceApiService.BASE_URI}/${workspaceId}`);
    }

    public delete(ids: number[]): BackendResponse<unknown> {
        return this.http.delete(`${WorkspaceApiService.BASE_URI}/${ids}`)
            .pipe(tap(() => {
                this.remove(ids);
            }));
    }

    public create(payload: Partial<Workspace>): BackendResponse<{workspace: Workspace}> {
        return this.http.post<{workspace: Workspace}>(`${WorkspaceApiService.BASE_URI}`, payload)
            .pipe(tap(response => this.pushAndSelect(response.workspace)));
    }

    public update(id: number, payload: Partial<Workspace>): BackendResponse<{workspace: Workspace}> {
        return this.http.put<{workspace: Workspace}>(`${WorkspaceApiService.BASE_URI}/${id}`, payload)
            .pipe(tap(response => this.replace(response.workspace)));
    }

    public invitePeople(workspaceId: number, params: {emails: string[], roleId: number}): BackendResponse<{invites: WorkspaceInvite[]}> {
        return this.http.post(`${WorkspaceApiService.BASE_URI}/${workspaceId}/invite`, params);
    }

    public resendInvite(workspaceId: number, inviteId: string): BackendResponse<{invite: WorkspaceInvite}> {
        return this.http.post(`${WorkspaceApiService.BASE_URI}/${workspaceId}/${inviteId}/resend`);
    }

    public deleteMember(workspaceId: number, userId: number): BackendResponse<unknown> {
        return this.http.delete(`${WorkspaceApiService.BASE_URI}/${workspaceId}/member/${userId}`)
            .pipe(tap(() => {
                if (userId === this.currentUser.get('id')) {
                    this.remove([workspaceId]);
                }
            }));
    }

    public deleteInvite(inviteId: string): BackendResponse<void> {
        return this.http.delete(`${WorkspaceApiService.BASE_URI}/invite/${inviteId}`);
    }

    public changeRole(workspaceId: number, member: WorkspaceMember|WorkspaceInvite, roleId: number): BackendResponse<void> {
        const memberId = hasKey('member_id', member) ? member.member_id : member.id;
        return this.http.post(`${WorkspaceApiService.BASE_URI}/${workspaceId}/${member.model_type}/${memberId}/change-role`, {roleId});
    }

    public join(inviteId: string): BackendResponse<{workspace: Workspace}> {
        return this.http.get(`workspace/join/${inviteId}`);
    }
}
