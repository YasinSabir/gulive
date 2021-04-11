import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpErrors} from '@common/core/http/errors/http-errors.enum';
import {ApiKey} from '../../../shared/api-keys/api-key';
import {CrupdateApiKeysModalComponent} from '../crupdate-api-keys-modal/crupdate-api-keys-modal.component';
import {ApiKeysService} from '../../../shared/api-keys/api-keys.service';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';
import {DatatableService} from '../../../../common/datatable/datatable.service';
import {LinkOverlay} from '../../link-overlay/link-overlay';
import {CurrentUser} from '../../../../common/auth/current-user';
import {Toast} from '../../../../common/core/ui/toast.service';
import {Router} from '@angular/router';
import {Messages} from '../../../messages.enum';
import {ApiKeyUsageService} from '../../../shared/api-keys/api-key-usage.service';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {ActiveWorkspace} from '../../workspaces/active-workspace.service';

@Component({
    selector: 'api-keys-index',
    templateUrl: './api-keys-index.component.html',
    styleUrls: ['./api-keys-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class ApiKeysIndexComponent implements OnInit {
    constructor(
        public datatable: DatatableService<LinkOverlay>,
        public currentUser: CurrentUser,
        public activeWorkspace: ActiveWorkspace,
        private links: ApiKeysService,
        private toast: Toast,
        private router: Router,
        private ApiKeyUsage: ApiKeyUsageService,
    ) {
    }

    ngOnInit() {
        this.datatable.init({
            uri: ApiKeysService.BASE_URI,
            staticParams: {
                userId: !this.insideAdmin() ? this.currentUser.get('id') : null,
            }
        });
    }

    public maybeDeleteSelectedApiKeys() {
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

    public showCrupdateApiKeysModal(apiKey?: ApiKey) {
        // console.log('key-index');
        this.datatable.openCrupdateResourceModal(CrupdateApiKeysModalComponent, {apiKey})
            .subscribe(() => this.ApiKeyUsage.reload() );
    }

    public showUserColumn(): boolean {
        return this.insideAdmin() || !!this.activeWorkspace.id;
    }

    public insideAdmin() {
        return this.router.url.indexOf('admin') > -1;
    }

}
