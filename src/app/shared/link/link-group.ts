import {User} from '@common/core/types/models/User';

export interface LinkGroup {
    id: number;
    name: string;
    description: string;
    hash: string;
    public: boolean;
    user_id: number;
    user?: User;
    links_count?: number;
    created_at: string;
    updated_at: string;
}
