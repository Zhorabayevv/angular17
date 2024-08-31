export interface IMenuItem {
    icon: MenuIconType;
    label: string;
    link?: string;
    badge?: boolean;
    isActive?: boolean;
    children?: IMenuItemChildren[];
}

interface IMenuItemChildren {
    label: string;
    link: string;
    count?: number;
}

export type MenuIconType =
    | 'users'
    | 'chart-line-up'
    | 'clipboard-list'
    | 'bell'
    | 'gear'
    | 'triangle-exclamation'
    | 'headphones-alt-2';
