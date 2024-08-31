export class IAlert {
    id?: string;
    type: AlertType;
    message: string | undefined;
    title: string | undefined;
    autoClose: boolean;
}

export enum AlertType {
    Success,
    Error,
    Warning,
}
