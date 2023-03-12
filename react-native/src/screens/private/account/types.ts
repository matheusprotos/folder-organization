export interface MenuOption {
  id: number;
  title: string;
  iconName: any;
  onPress: () => void | Promise<void>;
}
