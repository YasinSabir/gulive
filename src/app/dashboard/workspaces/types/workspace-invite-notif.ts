import {
    DatabaseNotification,
    DatabaseNotificationData
} from '../../../../common/notifications/database-notification';

export const WORKSPACE_INVITE_NOTIF_TYPE = 'App\\Notifications\\WorkspaceInvitation';

export interface WorkspaceInviteNotif extends DatabaseNotification {
    data: DatabaseNotificationData & {inviteId: string};
}
