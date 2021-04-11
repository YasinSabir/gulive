import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LinkOverlay} from '../link-overlay';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {Messages} from '../../../messages.enum';
import {BackendErrorResponse} from '../../../../common/core/types/backend-error-response';
import {HttpErrors} from '../../../../common/core/http/errors/http-errors.enum';
import {LinkOverlayService} from '../link-overlay.service';
import {Toast} from '../../../../common/core/ui/toast.service';
import {CurrentUser} from '../../../../common/auth/current-user';
import {Router} from '@angular/router';
import {DatatableService} from '../../../../common/datatable/datatable.service';
import {Observable} from 'rxjs';
import {ActiveWorkspace} from '../../workspaces/active-workspace.service';

@Component({
    selector: 'link-overlay-index',
    templateUrl: './link-overlay-index.component.html',
    styleUrls: ['./link-overlay-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class LinkOverlayIndexComponent implements OnInit {
    public overlays$ = this.datatable.data$ as Observable<LinkOverlay[]>;
    constructor(
        public datatable: DatatableService<LinkOverlay>,
        public currentUser: CurrentUser,
        private linkUsage: LinkUsageService,
        private linkOverlays: LinkOverlayService,
        private toast: Toast,
        private router: Router,
        private activeWorkspace: ActiveWorkspace,
    ) {}

    ngOnInit() {
        this.datatable.init({
            uri: LinkOverlayService.BASE_URI,
            staticParams: {
                with: ['user'],
                userId: !this.insideAdmin() ? this.currentUser.get('id') : null
            }
        });
    }

    public maybeDeleteSelectedOverlays() {
        this.datatable.confirmResourceDeletion('link overlays')
            .subscribe(() => {
                this.linkOverlays.delete(this.datatable.selectedRows$.value).subscribe(() => {
                    this.datatable.reset();
                    this.linkUsage.reload();
                    this.toast.open(Messages.LINK_OVERLAY_DELETE_SUCCESS);
                }, (errResponse: BackendErrorResponse) => {
                    this.toast.open(errResponse.message || HttpErrors.Default);
                });
            });
    }

    public showUserColumn(): boolean {
        return this.insideAdmin() || !!this.activeWorkspace.id;
    }

    public insideAdmin() {
        return this.router.url.indexOf('admin') > -1;
    }
}
