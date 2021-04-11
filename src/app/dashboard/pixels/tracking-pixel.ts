import {User} from '@common/core/types/models/User';

export interface TrackingPixel {
    id: number;
    name: string;
    type: string;
    pixel_id: string;
    user_id: number;
    user?: User;
    head_code?: string;
    body_code?: string;
    created_at: string;
    updated_at: string;
}
