import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    NgZone,
    OnInit
} from '@angular/core';
import {Settings} from '@common/core/config/settings.service';
import {ActivatedRoute} from '@angular/router';
import {LinkGroupService} from '../shared/link/link-group.service';
import {InfiniteScroll} from '@common/core/ui/infinite-scroll/infinite.scroll';
import {LinkGroup} from '../shared/link/link-group';
import {PaginationResponse} from '@common/core/types/pagination/pagination-response';
import {Link} from '../shared/link/link';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'link-group-page',
    templateUrl: './link-group-page.component.html',
    styleUrls: ['./link-group-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({opacity: 0}),
                animate('325ms ease-in', style({
                    opacity: 1,
                }))
            ])
        ]),
        trigger('fadeOut', [
            transition(':leave', [
                style({opacity: 1, position: 'absolute', left: '0', right: '0'}),
                animate('325ms ease-out', style({
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class LinkGroupPageComponent extends InfiniteScroll implements OnInit {
    @Input() public group: LinkGroup;
    public links: PaginationResponse<Link>;
    public loading$ = new BehaviorSubject(false);

    constructor(
        public settings: Settings,
        private route: ActivatedRoute,
        private linkGroups: LinkGroupService,
        protected zone: NgZone,
        private cd: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadMoreItems();
    }

    public removeProtocol(url: string) {
        return url.replace(/(^\w+:|^)\/\//, '');
    }

    protected canLoadMore(): boolean {
        return this.links.last_page > this.links.current_page;
    }

    protected isLoading(): boolean {
        return this.loading$.value;
    }

    protected loadMoreItems() {
        this.loading$.next(true);
        this.linkGroups.links(this.group.id, {page: this.links?.current_page + 1})
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.links = {
                    ...response.pagination,
                    data: [...(this.links?.data || []), ...response.pagination.data]
                };
                this.cd.markForCheck();
            });
    }
}
