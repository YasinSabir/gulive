import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {BreakpointsService} from '@common/core/ui/breakpoints.service';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {ValueLists} from '@common/core/services/value-lists.service';
import {ActiveWorkspace} from '../workspaces/active-workspace.service';
import {DatatableService} from '@common/datatable/datatable.service';
import {LinkUsageService} from '../../shared/link/link-usage.service';
import {Subscription} from 'rxjs';
import {MatSidenavContainer} from '@angular/material/sidenav';
import {LocalStorage} from '../../../common/core/services/local-storage.service';
import {Settings} from '../../../common/core/config/settings.service';
import {NotificationService} from '../../../common/notifications/notification-list/notification.service';
import {
    WORKSPACE_INVITE_NOTIF_TYPE,
    WorkspaceInviteNotif
} from '../workspaces/types/workspace-invite-notif';
import {WorkspaceApiService} from '../workspaces/workspace-api.service';
import {Toast} from '../../../common/core/ui/toast.service';
import {Messages} from '../../messages.enum';

interface DatatableComponent {
    datatable?: DatatableService<any>;
}

@Component({
    selector: 'dashboard-host',
    templateUrl: './dashboard-host.component.html',
    styleUrls: ['./dashboard-host.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ValueLists, WorkspaceApiService, ActiveWorkspace],
})
export class DashboardHostComponent implements OnInit, OnDestroy {
    @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
    public leftColumnIsHidden = false;
    private activePage: DatatableComponent;
    private subscriptions: Subscription[] = [];
    public sidebarCompact: boolean;

    constructor(
        private router: Router,
        public breakpoints: BreakpointsService,
        private activeWorkspace: ActiveWorkspace,
        private linkUsage: LinkUsageService,
        private localStorage: LocalStorage,
        private settings: Settings,
        private notifications: NotificationService,
        private workspaces: WorkspaceApiService,
        private toast: Toast,
    ) {
        this.sidebarCompact = this.breakpoints.isMobile$.value ? false : this.localStorage.get(this.storageSelector(), false);
    }

    ngOnInit() {
        this.leftColumnIsHidden = this.breakpoints.isMobile$.value;
        this.activeWorkspace.init();
        this.bindToNotificationClick();
        this.bindToWorkspaceChange();
        this.bindToRouteChange();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions = [];
    }

    public onPageChange(component: DatatableComponent) {
        this.activePage = component;
    }

    public toggleSidebarMode() {
        if (this.breakpoints.isMobile$.value) {
            this.leftColumnIsHidden = !this.leftColumnIsHidden;
        } else {
            this.sidebarCompact = !this.sidebarCompact;
            this.localStorage.set(this.storageSelector(), this.sidebarCompact);
            setTimeout(() => {
                this.sidenavContainer.updateContentMargins();
            });
        }
    }

    private storageSelector() {
        return `${this.settings.get('branding.site_name')}.dash.sidebarCompact`;
    }

    private bindToRouteChange() {
        // close left column when navigating between dashboard pages on mobile
        const sub = this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                this.leftColumnIsHidden = this.breakpoints.isMobile$.value;
            });
        this.subscriptions.push(sub);
    }

    private bindToWorkspaceChange() {
        const sub = this.activeWorkspace.changed$
            .subscribe(() => {
                this.activePage.datatable?.reset();
                this.linkUsage.reload();
            });
        this.subscriptions.push(sub);
    }

    private bindToNotificationClick() {
        const sub = this.notifications.clickedOnNotification$
            .pipe(filter(data => data.notification.type === WORKSPACE_INVITE_NOTIF_TYPE))
            .subscribe(data => {
                const inviteId = (data.notification as WorkspaceInviteNotif).data.inviteId;
                if (data.action.action === 'join') {
                    this.workspaces.join(inviteId).subscribe(response => {
                        this.notifications.delete([data.notification]).subscribe();
                        this.workspaces.pushAndSelect(response.workspace);
                        this.toast.open(Messages.WORKSPACE_JOIN_SUCCESS);
                    });
                } else if (data.action.action === 'decline') {
                    this.workspaces.deleteInvite(inviteId).subscribe(() => {
                        this.notifications.delete([data.notification]).subscribe();
                        this.toast.open(Messages.WORKSPACE_INVITE_DECLINED);
                    });
                }
            });
        this.subscriptions.push(sub);
    }
}
