import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AnalyticsHeaderData, AnalyticsResponse} from '@common/admin/analytics/types/analytics-response';
import {ReplaySubject} from 'rxjs';
import {HttpCacheClient} from '@common/core/http/http-cache-client';
import {finalize} from 'rxjs/operators';
import {LinkStats} from '../../../shared/link/link.service';

@Component({
    selector: 'click-analytics-host',
    templateUrl: './click-analytics-host.component.html',
    styleUrls: ['./click-analytics-host.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClickAnalyticsHostComponent implements OnInit {
    public headerData: AnalyticsHeaderData[];
    public loading$ = new ReplaySubject<boolean>(1);
    public linkStats$ = new ReplaySubject<LinkStats>(1);

    constructor(
        private http: HttpCacheClient
    ) {}

    ngOnInit() {
        this.loading$.next(true);
        this.http.get<AnalyticsResponse<LinkStats>>('admin/analytics/stats', {channel: 'clicks'})
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.headerData = response.headerData;
                this.linkStats$.next(response.mainData);
            });
    }
}
