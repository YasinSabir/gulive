import {ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {ApiKey} from '../../../../shared/api-keys/api-key';
import {Router} from '@angular/router';
import {ActiveWorkspace} from '../../../workspaces/active-workspace.service';

@Component({
    selector: 'api-keys-table',
    templateUrl: './api-keys-table.component.html',
    styleUrls: ['./api-keys-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiKeysTableComponent {
    @Input() links: ApiKey[] = [];
    @Input() showOwnerColumn = false;
    @ContentChild('editButton') editButtonTemplate: TemplateRef<ApiKey>;

    constructor(
        private router: Router,
        public activeWorkspace: ActiveWorkspace,
    ) {}

    public getParentRoute(): string {
        return this.router.url.indexOf('admin') > -1 ? 'admin' : 'dashboard';
    }
}
