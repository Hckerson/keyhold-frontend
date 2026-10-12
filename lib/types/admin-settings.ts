export type MaintenanceActionId = "purge-verifications" | "restore-defaults";

export interface MaintenanceAction {
    id: MaintenanceActionId;
    title: string;
    caption: string;
    label: string;
    confirmTitle: string;
    confirmLede: string;
    failure: string;
    danger: boolean;
}

export interface SettingChange {
    key: string;
    label: string;
    value: string;
    editor: string;
    ageMinutes: number;
}
