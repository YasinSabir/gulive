import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CustomDomainIndexComponent} from '../../../common/custom-domain/custom-domain-index/custom-domain-index.component';
import {DatatableService} from '../../../common/datatable/datatable.service';
import {CustomDomain} from '../../../common/custom-domain/custom-domain';
import {CurrentUser} from '../../../common/auth/current-user';
import {CustomDomainService} from '../../../common/custom-domain/custom-domain.service';
import {Toast} from '../../../common/core/ui/toast.service';
import {Router} from '@angular/router';
import {ActiveWorkspace} from '../workspaces/active-workspace.service';

@Component({
    selector: 'link-domain',
    templateUrl: './link-domain.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class LinkDomainComponent extends CustomDomainIndexComponent implements OnInit {
    constructor(
        public datatable: DatatableService<CustomDomain>,
        public currentUser: CurrentUser,
        protected customDomains: CustomDomainService,
        protected toast: Toast,
        protected router: Router,
        protected activeWorkspace: ActiveWorkspace,
    ) {
        super(datatable, currentUser, customDomains, toast, router);
    }

    ngOnInit() {
        this.datatable.init({
            uri: CustomDomainService.BASE_URI,
            staticParams: {
                userId: !this.insideAdmin() ? this.currentUser.get('id') : null,
            }
        });
    }

    public showUserColumn(): boolean {
        return this.insideAdmin() || !!this.activeWorkspace.id;
    }

    public insideAdmin() {
        return this.router.url.indexOf('admin') > -1;
    }
}

