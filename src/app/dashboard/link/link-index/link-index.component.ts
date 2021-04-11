import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpErrors} from '@common/core/http/errors/http-errors.enum';
import {Link} from '../../../shared/link/link';
import {CrupdateLinkModalComponent} from '../crupdate-link-modal/crupdate-link-modal.component';
import {LinkService} from '../../../shared/link/link.service';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';
import {DatatableService} from '../../../../common/datatable/datatable.service';
import {LinkOverlay} from '../../link-overlay/link-overlay';
import {CurrentUser} from '../../../../common/auth/current-user';
import {Toast} from '../../../../common/core/ui/toast.service';
import {Router} from '@angular/router';
import {Messages} from '../../../messages.enum';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {ActiveWorkspace} from '../../workspaces/active-workspace.service';

@Component({
    selector: 'link-index',
    templateUrl: './link-index.component.html',
    styleUrls: ['./link-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class LinkIndexComponent implements OnInit {
    constructor(
        public datatable: DatatableService<LinkOverlay>,
        public currentUser: CurrentUser,
        public activeWorkspace: ActiveWorkspace,
        private links: LinkService,
        private toast: Toast,
        private router: Router,
        private linkUsage: LinkUsageService,
    ) {}

    ngOnInit() {
        this.datatable.init({
            uri: LinkService.BASE_URI,
            staticParams: {
                userId: !this.insideAdmin() ? this.currentUser.get('id') : null,
            }
        });
    }

    public maybeDeleteSelectedLinks() {
        this.datatable.confirmResourceDeletion('links')
            .subscribe(() => {
                this.links.delete(this.datatable.selectedRows$.value).subscribe(() => {
                    this.datatable.reset();
                    this.toast.open(Messages.LINK_DELETE_SUCCESS);
                }, (errResponse: BackendErrorResponse) => {
                    this.toast.open(errResponse.message || HttpErrors.Default);
                });
            });
    }

    public showCrupdateLinkModal(link?: Link) {
        this.datatable.openCrupdateResourceModal(CrupdateLinkModalComponent, {link})
            .subscribe(() => this.linkUsage.reload());
    }

    public showUserColumn(): boolean {
        return this.insideAdmin() || !!this.activeWorkspace.id;
    }

    public insideAdmin() {
        return this.router.url.indexOf('admin') > -1;
    }
}
