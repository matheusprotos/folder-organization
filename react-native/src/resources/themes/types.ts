import { StatusBarStyle } from "expo-status-bar";

/**
 * The entire theme for application components
 * @interface AppThemeOptions
 */
export interface AppThemeOptions {
  /**
   * Theme name
   * @var StatusBarStyle
   */
  title: StatusBarStyle;

  /**
   * App colors
   * @var string
   */
  colors: AppThemeColorOptions;

  /**
   * App fonts
   * @var string
   */
  fontFamily: AppThemeFontOptions;
}

/**
 * The colors for the theme
 * @interface AppThemeColorOptions
 */
export interface AppThemeColorOptions {
  primaryBackground: string;
  secondaryBackground: string;

  primarySurface: string;
  secondarySurface: string;

  primaryGradient: string;
  secondaryGradient: string;

  disabled: string;

  primaryTitle: string;
  secondaryTitle: string;
  primarySubtitle: string;
  secondarySubtitle: string;
  primaryText: string;
  secondaryText: string;

  tabBarActive: string;
  tabBarInactive: string;
  tabBarBackground: string;

  buttonPrimaryTitle: string;
  buttonSecondaryTitle: string;
  buttonPrimaryBackground: string;
  buttonSecondaryBackground: string;
  buttonPrimaryBorder: string;
  buttonSecondaryBorder: string;
  buttonPrimaryIcon: string;
  buttonSecondaryIcon: string;

  googleButtonPrimaryTitle: string;
  googleButtonSecondaryTitle: string;
  googleButtonPrimaryBackground: string;
  googleButtonSecondaryBackground: string;
  googleButtonPrimaryBorder: string;
  googleButtonSecondaryBorder: string;
  googleButtonPrimaryIcon: string;
  googleButtonSecondaryIcon: string;

  facebookButtonPrimaryTitle: string;
  facebookButtonSecondaryTitle: string;
  facebookButtonPrimaryBackground: string;
  facebookButtonSecondaryBackground: string;
  facebookButtonPrimaryBorder: string;
  facebookButtonSecondaryBorder: string;
  facebookButtonPrimaryIcon: string;
  facebookButtonSecondaryIcon: string;

  appleButtonPrimaryTitle: string;
  appleButtonSecondaryTitle: string;
  appleButtonPrimaryBackground: string;
  appleButtonSecondaryBackground: string;
  appleButtonPrimaryBorder: string;
  appleButtonSecondaryBorder: string;
  appleButtonPrimaryIcon: string;
  appleButtonSecondaryIcon: string;

  dangerButtonPrimaryTitle: string;
  dangerButtonSecondaryTitle: string;
  dangerButtonPrimaryBackground: string;
  dangerButtonSecondaryBackground: string;
  dangerButtonPrimaryBorder: string;
  dangerButtonSecondaryBorder: string;
  dangerButtonPrimaryIcon: string;
  dangerButtonSecondaryIcon: string;

  cleanButtonPrimaryTitle: string;
  cleanButtonSecondaryTitle: string;
  cleanButtonPrimaryBackground: string;
  cleanButtonSecondaryBackground: string;
  cleanButtonPrimaryBorder: string;
  cleanButtonSecondaryBorder: string;
  cleanButtonPrimaryIcon: string;
  cleanButtonSecondaryIcon: string;

  separatorLine: string;

  inputBorder: string;
  inputBackground: string;
  inputPlaceholder: string;
  inputText: string;
  inputLabel: string;
  inputError: string;

  errorIcon: string;
  errorText: string;
  errorBorder: string;
  errorBackground: string;

  warningIcon: string;
  warningText: string;
  warningBorder: string;
  warningBackground: string;

  infoIcon: string;
  infoText: string;
  infoBorder: string;
  infoBackground: string;

  successIcon: string;
  successText: string;
  successBorder: string;
  successBackground: string;
}

/**
 * The theme fonts initial settings
 * @interface AppThemeAnimationOptions
 */
export interface AppThemeFontOptions {
  heading: string;
  body: string;
  footer: string;
}
