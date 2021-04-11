import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LinkGroupService} from '../../../shared/link/link-group.service';
import {Subject} from 'rxjs';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {LinkStats} from '../../../shared/link/link.service';
import {LinkGroup} from '../../../shared/link/link-group';
import {SKELETON_ANIMATIONS} from '../../../../common/core/ui/skeleton/skeleton-animations';

@Component({
    selector: 'link-group-analytics-page',
    templateUrl: './link-group-analytics-page.component.html',
    styleUrls: ['./link-group-analytics-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: SKELETON_ANIMATIONS,
})
export class LinkGroupAnalyticsPageComponent implements OnInit {
    public analytics$ = new Subject<LinkStats>();
    public linkGroup$ = new Subject<LinkGroup>();
    public analyticsEndpoint: string;

    constructor(
        public route: ActivatedRoute,
        private modal: Modal,
        private groups: LinkGroupService,
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.analyticsEndpoint = `${LinkGroupService.BASE_URI}/${params.groupId}/analytics`;
            this.groups.analytics(params.groupId).subscribe(response => {
                this.analytics$.next(response.analytics);
                this.linkGroup$.next(response.linkGroup);
            });
        });
    }
}
