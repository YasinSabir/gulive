import {Injectable} from '@angular/core';
import {Workspace} from './types/workspace';
import {Subject} from 'rxjs';
import {CookieService} from '@common/core/services/cookie.service';
import {CurrentUser} from '@common/auth/current-user';

@Injectable({
    providedIn: 'root'
})
export class ActiveWorkspace {
    public changed$ = new Subject<number>();
    public id: number = null;

    constructor(
        private cookie: CookieService,
        private currentUser: CurrentUser,
    ) {}

    public select(workspaceId: number) {
        if (this.id !== workspaceId) {
            this.id = workspaceId;
            this.cookie.set(this.cookieName(), this.id);
            this.changed$.next(this.id);
        }
    }

    public isActive(workspace: Workspace): boolean {
        return this.id === workspace.id;
    }

    public init() {
        const workspaceId = this.cookie.get(this.cookieName()) as string;
        this.select(workspaceId ? parseInt(workspaceId) : null);
    }

    private cookieName() {
        return `${this.currentUser.get('id')}_activeWorkspace`;
    }
}
