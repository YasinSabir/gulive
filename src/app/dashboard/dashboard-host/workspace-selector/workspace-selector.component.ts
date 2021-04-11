import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ActiveWorkspace} from '../../workspaces/active-workspace.service';
import {Workspace} from '../../workspaces/types/workspace';
import {CrupdateWorkspaceModalComponent} from '../../workspaces/crupdate-workspace-modal/crupdate-workspace-modal.component';
import {ManageWorkspaceMembersModalComponent} from '../../workspaces/manage-workspace-members-modal/manage-workspace-members-modal.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {Modal} from '../../../../common/core/ui/dialogs/modal.service';
import {WorkspaceApiService} from '../../workspaces/workspace-api.service';
import {CurrentUser} from '../../../../common/auth/current-user';

@Component({
    selector: 'workspace-selector',
    templateUrl: './workspace-selector.component.html',
    styleUrls: ['./workspace-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceSelectorComponent implements OnInit {
    @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

    constructor(
        public activeWorkspace: ActiveWorkspace,
        private modal: Modal,
        public workspaces: WorkspaceApiService,
        private currentUser: CurrentUser,
        private vcr: ViewContainerRef,
    ) {}

    ngOnInit() {
        this.workspaces.index({userId: this.currentUser.get('id'), withCount: ['members']})
            .subscribe();
    }

    public openCrupdateWorkspaceModal() {
        this.modal.open(CrupdateWorkspaceModalComponent, null, {viewContainerRef: this.vcr})
            .afterClosed()
            .subscribe();
    }

    public openWorkspaceMembersModal(workspace: Workspace) {
        this.modal.open(ManageWorkspaceMembersModalComponent, {workspace}, {viewContainerRef: this.vcr});
        this.menuTrigger.closeMenu();
    }
}
