import {User} from '@common/core/types/models/User';

export interface ApiKey {
    id: number;
    user_id: number;
    title: string;
    api_key: string;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    user?: User;
}
