interface IMask {
    pattern: RegExp;
}

export interface IMaskPattern {
    [key: string]: IMask;
}

export interface IMaskGroup {
    mask: string;
    pattern?: IMaskPattern;
}

export interface IMaskGroups {
    [key: string]: IMaskGroup;
}
