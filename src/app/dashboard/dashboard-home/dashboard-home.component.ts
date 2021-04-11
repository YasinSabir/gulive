import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LinkService, LinkStats} from '../../shared/link/link.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ActiveWorkspace} from '../workspaces/active-workspace.service';

@Component({
    selector: 'dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
    public reports$ = new BehaviorSubject<LinkStats>(null);
    private workspaceSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private activeWorkspace: ActiveWorkspace,
        private links: LinkService,
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: {reports: LinkStats}) => {
            this.reports$.next(data.reports);
        });

        this.workspaceSub = this.activeWorkspace.changed$.subscribe(() => {
            this.links.getCurrentUserReports().subscribe(response => {
                this.reports$.next(response.analytics);
            });
        });
    }

    ngOnDestroy() {
        this.workspaceSub.unsubscribe();
    }

}
