import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DatatableService} from '../../../../common/datatable/datatable.service';
import {CurrentUser} from '../../../../common/auth/current-user';
import {Toast} from '../../../../common/core/ui/toast.service';
import {Router} from '@angular/router';
import {BackendErrorResponse} from '../../../../common/core/types/backend-error-response';
import {HttpErrors} from '../../../../common/core/http/errors/http-errors.enum';
import {LinkGroupService} from '../../../shared/link/link-group.service';
import {Messages} from '../../../messages.enum';
import {CrupdateLinkGroupModalComponent} from '../crupdate-link-group-modal/crupdate-link-group-modal.component';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {LinkGroup} from '../../../shared/link/link-group';
import {Observable} from 'rxjs';
import {ActiveWorkspace} from '../../workspaces/active-workspace.service';

@Component({
    selector: 'link-group-index',
    templateUrl: './link-group-index.component.html',
    styleUrls: ['./link-group-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class LinkGroupIndexComponent implements OnInit {
    public groups$ = this.datatable.data$ as Observable<LinkGroup[]>;
    constructor(
        public datatable: DatatableService<LinkGroup>,
        public currentUser: CurrentUser,
        private linkGroups: LinkGroupService,
        private toast: Toast,
        private router: Router,
        private linkUsage: LinkUsageService,
        private activeWorkspace: ActiveWorkspace,
    ) {}

    ngOnInit() {
        this.datatable.init({
            uri: LinkGroupService.BASE_URI,
            staticParams: {
                userId: !this.insideAdmin() ? this.currentUser.get('id') : null,
            }
        });
    }

    public maybeDeleteSelectedGroups() {
        this.datatable.confirmResourceDeletion('link groups')
            .subscribe(() => {
                this.linkGroups.delete(this.datatable.selectedRows$.value).subscribe(() => {
                    this.datatable.reset();
                    this.toast.open(Messages.LINK_GROUP_DELETE_SUCCESS);
                }, (errResponse: BackendErrorResponse) => {
                    this.toast.open(errResponse.message || HttpErrors.Default);
                });
            });
    }

    public showCrupdateGroupModal(linkGroup?: LinkGroup) {
        this.datatable.openCrupdateResourceModal(CrupdateLinkGroupModalComponent, {linkGroup})
            .subscribe(() => this.linkUsage.reload());
    }

    public showUserColumn(): boolean {
        return this.insideAdmin() || !!this.activeWorkspace.id;
    }

    public insideAdmin() {
        return this.router.url.indexOf('admin') > -1;
    }
}
