import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CurrentUser} from '../../../../common/auth/current-user';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {Toast} from '../../../../common/core/ui/toast.service';
import {Router} from '@angular/router';
import {Messages} from '../../../messages.enum';
import {BackendErrorResponse} from '../../../../common/core/types/backend-error-response';
import {HttpErrors} from '../../../../common/core/http/errors/http-errors.enum';
import {DatatableService} from '../../../../common/datatable/datatable.service';
import {TrackingPixelService} from '../tracking-pixel.service';
import {TrackingPixel} from '../tracking-pixel';
import {CrupdateTrackingPixelModalComponent} from '../crupdate-tracking-pixel-modal/crupdate-tracking-pixel-modal.component';
import {Observable} from 'rxjs';
import {ActiveWorkspace} from '../../workspaces/active-workspace.service';

@Component({
    selector: 'tracking-pixel-index',
    templateUrl: './tracking-pixel-index.component.html',
    styleUrls: ['./tracking-pixel-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class TrackingPixelIndexComponent implements OnInit {
    public pixels$ = this.datatable.data$ as Observable<TrackingPixel[]>;
    constructor(
        public datatable: DatatableService<TrackingPixel>,
        public currentUser: CurrentUser,
        private linkUsage: LinkUsageService,
        private trackingPixels: TrackingPixelService,
        private toast: Toast,
        private router: Router,
        private activeWorkspace: ActiveWorkspace,
    ) {}

    ngOnInit() {
        this.datatable.init({
            uri: TrackingPixelService.BASE_URI,
            staticParams: {
                with: ['user'],
                userId: !this.insideAdmin() ? this.currentUser.get('id') : null
            }
        });
    }

    public maybeDeleteSelectedPixels() {
        this.datatable.confirmResourceDeletion('tracking pixels')
            .subscribe(() => {
                this.trackingPixels.delete(this.datatable.selectedRows$.value).subscribe(() => {
                    this.datatable.reset();
                    this.linkUsage.reload();
                    this.toast.open(Messages.TRACKING_PIXEL_DELETE_SUCCESS);
                }, (errResponse: BackendErrorResponse) => {
                    this.toast.open(errResponse.message || HttpErrors.Default);
                });
            });
    }

    public showCrupdatePixelModal(pixel?: TrackingPixel) {
        this.datatable.openCrupdateResourceModal(CrupdateTrackingPixelModalComponent, {pixel})
            .subscribe(() => {
                this.linkUsage.reload();
            });
    }

    public showUserColumn(): boolean {
        return this.insideAdmin() || !!this.activeWorkspace.id;
    }

    public insideAdmin() {
        return this.router.url.indexOf('admin') > -1;
    }
}
