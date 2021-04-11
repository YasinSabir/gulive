export interface TrackingPixelType {
    name: string;
    type: 'number'|'text';
    pattern?: string;
}

export const TrackingPixelTypes: TrackingPixelType[] = [
    {
        name: 'facebook',
        type: 'number',
    },
    {
        name: 'twitter',
        type: 'number',
    },
    {
        name: 'google-tag-manager',
        type: 'text',
        pattern: 'GTM-[a-zA-Z0-9]+'
    },
    {
        name: 'google-analytics',
        type: 'text',
    },
    {
        name: 'adwords',
        type: 'number',
    },
    {
        name: 'bing',
        type: 'number',
    },
    {
        name: 'pinterest',
        type: 'number',
    },
    {
        name: 'linkedin',
        type: 'text',
    },
    {
        name: 'quora',
        type: 'text',
        pattern: '[a-z0-9]+',
    },
    {
        name: 'adroll',
        type: 'text',
    },
    {
        name: 'nexus-segment',
        type: 'text',
    },
    {
        name: 'custom',
        type: 'text',
    },
];
