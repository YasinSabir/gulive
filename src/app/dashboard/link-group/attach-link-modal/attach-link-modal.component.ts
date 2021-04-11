import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Toast} from '@common/core/ui/toast.service';
import {LinkGroup} from '../../../shared/link/link-group';
import {LinkGroupService} from '../../../shared/link/link-group.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {LinkService} from '../../../shared/link/link.service';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, finalize, map, startWith, switchMap} from 'rxjs/operators';
import {Link} from '../../../shared/link/link';
import {CurrentUser} from '@common/auth/current-user';
import {Messages} from '../../../messages.enum';
import {getFaviconFromUrl} from '@common/core/utils/get-favicon-from-url';

interface AttachLinkModalData {
    group?: LinkGroup;
}

@Component({
    selector: 'attach-link-modal',
    templateUrl: './attach-link-modal.component.html',
    styleUrls: ['./attach-link-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachLinkModalComponent implements OnInit {
    public loading$ = new BehaviorSubject(false);
    public links$ = new BehaviorSubject<Link[]>(null);
    public searchControl = new FormControl();

    constructor(
        private dialogRef: MatDialogRef<AttachLinkModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AttachLinkModalData,
        private linkGroup: LinkGroupService,
        private link: LinkService,
        private currentUser: CurrentUser,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.searchControl.valueChanges
            .pipe(
                startWith(''),
                debounceTime(250),
                distinctUntilChanged(),
                switchMap(query => this.findLinks(query)),
                catchError(() => of([])),
            ).subscribe(links => {
                this.links$.next(links);
                this.loading$.next(false);
            });
    }

    public close(link?: Link) {
        this.dialogRef.close(link);
    }

    public confirm(link: Link) {
        this.loading$.next(true);
        this.linkGroup.attach(this.data.group.id, [link.id])
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(() => {
                this.toast.open(Messages.LINK_ATTACH_SUCCESS);
                this.close(link);
            });
    }

    private findLinks(query: string): Observable<Link[]> {
        this.loading$.next(true);
        const userId = this.currentUser.get('id'),
            groupId = '!' + this.data.group.id;
        return this.link.index({query, userId, groupId, per_page: 8}).pipe(map(r => r.pagination.data));
    }

    public favicon(url: string) {
        return getFaviconFromUrl(url);
    }
}
