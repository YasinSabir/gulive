import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Toast} from '@common/core/ui/toast.service';
import {TrackingPixel} from '../tracking-pixel';
import {TrackingPixelService} from '../tracking-pixel.service';
import {Messages} from '../../../messages.enum';
import {finalize} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {TrackingPixelType, TrackingPixelTypes} from '../tracking-pixel-types';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';

interface CrupdateTrackingPixelModalData {
    pixel?: TrackingPixel;
}

@Component({
    selector: 'crupdate-tracking-pixel-modal',
    templateUrl: './crupdate-tracking-pixel-modal.component.html',
    styleUrls: ['./crupdate-tracking-pixel-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrupdateTrackingPixelModalComponent implements OnInit {
    public types = TrackingPixelTypes;
    public loading$ = new BehaviorSubject(false);
    public errors$ = new BehaviorSubject<Partial<TrackingPixel>>({});
    public selectedType$ = new BehaviorSubject<TrackingPixelType>(this.types[0]);
    public form = this.fb.group({
        name: [''],
        type: [this.types[0].name],
        head_code: [''],
        body_code: [''],
        pixel_id: [''],
    });

    constructor(
        private dialogRef: MatDialogRef<CrupdateTrackingPixelModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateTrackingPixelModalData,
        private fb: FormBuilder,
        private pixels: TrackingPixelService,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.form.get('type').valueChanges.subscribe(typeName => {
            this.selectedType$.next(this.types.find(t => t.name === typeName));
        });
        if (this.data.pixel) {
            this.form.patchValue(this.data.pixel);
        }
    }

    public confirm() {
        this.loading$.next(true);
        const request = this.data.pixel ?
            this.pixels.update(this.data.pixel.id, this.getPayload()) :
            this.pixels.create(this.getPayload());

        const msg = this.data.pixel ?
            Messages.TRACKING_PIXEL_UPDATE_SUCCESS :
            Messages.TRACKING_PIXEL_CREATE_SUCCESS;

        request
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.toast.open(msg);
                this.close(response.pixel);
            }, (errResponse: BackendErrorResponse) => this.errors$.next(errResponse.errors));
    }

    public close(pixel?: TrackingPixel) {
        this.dialogRef.close(pixel);
    }

    private getPayload(): Partial<TrackingPixel> {
        return {...this.form.value};
    }

    public viewTypeName(type: string) {
        return type.replace(/-/g, ' ');
    }
}
