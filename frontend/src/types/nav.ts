import type { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
    id: string; 
    label: string;
    path: string;
    icon: LucideIcon;
    badge?: string | number;
    children?: NavLinkItem[];
}


export interface NavGroup{
    group: string;
    items: NavLinkItem[];
}