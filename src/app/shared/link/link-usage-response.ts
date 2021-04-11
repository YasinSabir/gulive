export interface ResourceUsage {
    used: number;
    total: number | null;
    forWorkspace: boolean;
    canCreate?: boolean;
    createFailType?: 'overQuota'|'noPermission'|null;
}

export interface LinkUsageResponse {
    forWorkspace?: boolean;
    userOwnsWorkspace?: boolean;
    usage: {
        links: ResourceUsage;
        link_clicks: ResourceUsage;
        link_overlays: ResourceUsage;
        custom_pages: ResourceUsage;
        custom_domains: ResourceUsage;
        link_groups: ResourceUsage;
        tracking_pixels: ResourceUsage;
    };
}
