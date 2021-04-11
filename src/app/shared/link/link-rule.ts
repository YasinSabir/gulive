export interface LinkRule {
    type: 'geo'|'device';
    link_id: number;
    key: string;
    value: string;
}
