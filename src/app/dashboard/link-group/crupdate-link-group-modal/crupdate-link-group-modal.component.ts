import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Toast} from '@common/core/ui/toast.service';
import {Messages} from '../../../messages.enum';
import {LinkGroup} from '../../../shared/link/link-group';
import {LinkGroupService} from '../../../shared/link/link-group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';
import {randomString} from '../../../../common/core/utils/random-string';

interface CrupdateLinkGroupModalData {
    linkGroup: LinkGroup;
}

@Component({
    selector: 'crupdate-link-group-modal',
    templateUrl: './crupdate-link-group-modal.component.html',
    styleUrls: ['./crupdate-link-group-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrupdateLinkGroupModalComponent {
    public loading$ = new BehaviorSubject(false);
    public updating$ = new BehaviorSubject(false);
    public errors$ = new BehaviorSubject<Partial<LinkGroup>>({});
    public form = new FormGroup({
        name: new FormControl(),
        public: new FormControl(true),
        description: new FormControl(''),
        hash: new FormControl(randomString(6)),
        rotator: new FormControl(false),
    });

    constructor(
        private dialogRef: MatDialogRef<CrupdateLinkGroupModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateLinkGroupModalData,
        private linkGroup: LinkGroupService,
        private toast: Toast,
    ) {
        this.updating$.next(!!data.linkGroup);
        if (data.linkGroup) {
            this.form.patchValue(data.linkGroup);
        }
    }

    public confirm() {
        this.loading$.next(true);

        const request = this.updating$.value ?
            this.linkGroup.update(this.data.linkGroup.id, this.form.value) :
            this.linkGroup.create(this.form.value);

        request.pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.toast.open(this.updating$.value ? Messages.LINK_GROUP_UPDATE_SUCCESS : Messages.LINK_GROUP_CREATE_SUCCESS);
                this.close(response.group);
            }, (errResponse: BackendErrorResponse) => this.errors$.next(errResponse.errors));
    }

    public close(group?: LinkGroup) {
        this.dialogRef.close(group);
    }
}
