import {User} from '@common/core/types/models/User';

export interface LinkOverlay {
    id: number;
    name: string;
    position: 'top-left'|'top-right'|'bottom-left'|'bottom-right';
    theme: 'default'|'full-width'|'rounded'|'pill';
    message: string;
    label: string;
    btn_text: string;
    btn_link: string;
    user_id: number;
    user?: User;
    colors: {[key: string]: string};
    created_at: string;
    updated_at: string;
}
