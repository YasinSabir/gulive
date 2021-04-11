import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CustomPagesIndexComponent} from '../../../common/pages/custom-pages-index/custom-pages-index.component';
import {Settings} from '../../../common/core/config/settings.service';
import {DatatableService} from '../../../common/datatable/datatable.service';
import {CustomPage} from '../../../common/core/types/models/CustomPage';
import {CurrentUser} from '../../../common/auth/current-user';
import {Pages} from '../../../common/pages/shared/pages.service';
import {Toast} from '../../../common/core/ui/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActiveWorkspace} from '../workspaces/active-workspace.service';
import {LINK_PAGE_BASE_URI} from '../link-page-base-uri';

@Component({
  selector: 'link-page',
  templateUrl: './link-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class LinkPageComponent extends CustomPagesIndexComponent implements OnInit {
    constructor(
        public settings: Settings,
        public datatable: DatatableService<CustomPage>,
        public currentUser: CurrentUser,
        protected customPages: Pages,
        protected toast: Toast,
        protected router: Router,
        protected route: ActivatedRoute,
        protected activeWorkspace: ActiveWorkspace,
    ) {
        super(settings, datatable, currentUser, customPages, toast, router, route);
    }

    ngOnInit() {
        this.datatable.init({
            uri: LINK_PAGE_BASE_URI,
            staticParams: {
                with: ['user'],
                userId: !this.insideAdmin() ? this.currentUser.get('id') : null
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
