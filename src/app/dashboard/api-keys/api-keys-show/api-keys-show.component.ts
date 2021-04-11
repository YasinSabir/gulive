import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GetLinkResponse, LinkService} from '../../../shared/link/link.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Settings} from '@common/core/config/settings.service';

@Component({
    selector: 'api-keys-show',
    templateUrl: './api-keys-show.component.html',
    styleUrls: ['./api-keys-show.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiKeysShowComponent implements OnInit {
    public data$ = new BehaviorSubject<GetLinkResponse>(null);
    public analyticsEndpoint: string;

    constructor(
        private route: ActivatedRoute,
        public settings: Settings,
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: {api: GetLinkResponse}) => {
            this.data$.next(data.api);
            this.analyticsEndpoint = `${LinkService.BASE_URI}/${data.api.link.id}`;
        });
    }
}
