import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LinkGroupService} from '../../../shared/link/link-group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Modal} from '../../../../common/core/ui/dialogs/modal.service';
import {DatatableService} from '../../../../common/datatable/datatable.service';
import {Link} from '../../../shared/link/link';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {LinkService} from '../../../shared/link/link.service';
import {Toast} from '../../../../common/core/ui/toast.service';
import {CurrentUser} from '../../../../common/auth/current-user';
import {Messages} from '../../../messages.enum';
import {BackendErrorResponse} from '../../../../common/core/types/backend-error-response';
import {HttpErrors} from '../../../../common/core/http/errors/http-errors.enum';
import {CrupdateLinkModalComponent} from '../../link/crupdate-link-modal/crupdate-link-modal.component';
import {ConfirmModalComponent} from '../../../../common/core/ui/confirm-modal/confirm-modal.component';
import {AttachLinkModalComponent} from '../attach-link-modal/attach-link-modal.component';
import {LinkGroup} from '../../../shared/link/link-group';
import {SKELETON_ANIMATIONS} from '../../../../common/core/ui/skeleton/skeleton-animations';

@Component({
    selector: 'link-group-links-index',
    templateUrl: './link-group-links-index.component.html',
    styleUrls: ['./link-group-links-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: SKELETON_ANIMATIONS,
    providers: [DatatableService],
})
export class LinkGroupLinksIndexComponent implements OnInit {
    public loading$ = new BehaviorSubject(false);
    public linkGroup$ = new BehaviorSubject<LinkGroup>(null);

    constructor(
        public route: ActivatedRoute,
        private modal: Modal,
        public datatable: DatatableService<Link>,
        private linkUsage: LinkUsageService,
        private linkGroups: LinkGroupService,
        private links: LinkService,
        private toast: Toast,
        private router: Router,
        public currentUser: CurrentUser,
    ) {
    }

    ngOnInit() {
        this.datatable.init({
            uri: `${LinkGroupService.BASE_URI}/${this.route.snapshot.params.groupId}/links`,
        });

        this.datatable.paginator.response$.subscribe(response => {
            this.linkGroup$.next(response?.linkGroup as LinkGroup);
        });
    }

    public maybeDeleteSelectedLinks() {
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

    public showCrupdateLinkModal(link?: Link) {
        this.datatable.openCrupdateResourceModal(
            CrupdateLinkModalComponent, {link, group: this.linkGroup$.value}
        ).subscribe(() => this.linkUsage.reload());
    }

    public detachSelectedLinks() {
        this.linkGroups.detach(this.linkGroup$.value.id, this.datatable.selectedRows$.value)
            .subscribe(() => {
                this.datatable.reset();
            }, (errResponse: BackendErrorResponse) => {
                this.toast.open(errResponse.message || HttpErrors.Default);
            });
    }

    public maybeDetachSelectedLinks() {
        this.modal.open(ConfirmModalComponent, {
            title: `Detach Links`,
            body: `Are you sure you want to detach selected links from this group?`,
            ok: 'Detach'
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.detachSelectedLinks();
            }
        });
    }

    public showAttachLinkModal() {
        this.modal.open(
            AttachLinkModalComponent,
            {group: this.linkGroup$.value},
        ).beforeClosed().subscribe(data => {
            if (data) {
                this.datatable.reset();
            }
        });
    }

    public filterByUser(): boolean {
        return this.router.url.indexOf('admin') === -1;
    }
}
