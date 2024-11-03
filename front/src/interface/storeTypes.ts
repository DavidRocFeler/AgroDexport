import { ISettingsUserProps } from "./types";

export interface IUserSettingsState {
  userSettings: ISettingsUserProps | null;
  setUserSettings: (settings: ISettingsUserProps) => void;
  clearUserSettings: () => void;
  user_name: string | undefined;
  user_lastname: string | undefined;
}