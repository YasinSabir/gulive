import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AppHttpClient} from '../../../../common/core/http/app-http-client.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from '../../../../common/core/types/models/User';
import {Workspace} from '../types/workspace';

export interface WorkspaceRoleModalData {
    member: User;
    workspace: Workspace;
}

@Component({
    selector: 'workspace-role-modal',
    templateUrl: './workspace-role-modal.component.html',
    styleUrls: ['./workspace-role-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceRoleModalComponent implements OnInit {
    public selectedRole = new FormControl(12);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: WorkspaceRoleModalData,
        private http: AppHttpClient
    ) {
    }

    ngOnInit(): void {
    }

    public close() {

    }

    public confirm() {
        this.http.post(`workspace/${this.data.workspace.id}/member/${this.data.member.id}/attach-role`, {roleId: this.selectedRole.value})
            .subscribe(() => {
                //
            });
    }
}
