import { PermissionConstants } from "@constants/permission.constants";

export interface PermissionStepOptions {
  location: PermissionStepItemOptions;
  notification: PermissionStepItemOptions;
  tracking: PermissionStepItemOptions;
}

export interface PermissionStepItemOptions {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  explanation: string;
  image: any;
  onPress: () => void;
  onBackPress: () => void;
}
