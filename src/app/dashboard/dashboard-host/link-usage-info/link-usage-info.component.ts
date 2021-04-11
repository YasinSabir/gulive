import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {CurrentUser} from '@common/auth/current-user';

@Component({
    selector: 'link-usage-info',
    templateUrl: './link-usage-info.component.html',
    styleUrls: ['./link-usage-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkUsageInfoComponent {
    constructor(
        public linkUsage: LinkUsageService,
        public currentUser: CurrentUser,
    ) {}
}
