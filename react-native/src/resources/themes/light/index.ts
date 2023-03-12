import { ColorHexaConstants } from "@constants/color-hexa.constants";
import { FontFamilyConstants } from "@constants/font-family.constants";
import { ThemeConstants } from "@constants/theme.constants";
import { AppThemeOptions } from "../types";

const light: AppThemeOptions = {
  title: ThemeConstants.LIGHT,

  colors: {
    primaryBackground: ColorHexaConstants.WHITE,
    secondaryBackground: ColorHexaConstants.WHITE,

    primarySurface: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    secondarySurface: ColorHexaConstants.LIGHT_GRAYISH_BLUE,

    primaryGradient: ColorHexaConstants.SLIGHTLY_DESATURATED_BLUE,
    secondaryGradient: ColorHexaConstants.DARK_MODERATE_BLUE,

    disabled: ColorHexaConstants.VERY_LIGHT_GRAY,

    primaryTitle: ColorHexaConstants.VERY_DARK_GRAY,
    secondaryTitle: ColorHexaConstants.VERY_DARK_GRAY,
    primarySubtitle: ColorHexaConstants.GRAY,
    secondarySubtitle: ColorHexaConstants.GRAY,
    primaryText: ColorHexaConstants.DARK_GRAY,
    secondaryText: ColorHexaConstants.DARK_GRAY,

    tabBarActive: ColorHexaConstants.VERY_DARK_GRAY,
    tabBarInactive: ColorHexaConstants.DARK_GRAYISH_BLUE,
    tabBarBackground: ColorHexaConstants.WHITE,

    buttonPrimaryTitle: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    buttonSecondaryTitle: ColorHexaConstants.VERY_DARK_GRAY,
    buttonPrimaryBackground: ColorHexaConstants.SLIGHTLY_DESATURATED_BLUE,
    buttonSecondaryBackground: ColorHexaConstants.DARK_MODERATE_BLUE,
    buttonPrimaryBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    buttonSecondaryBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    buttonPrimaryIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    buttonSecondaryIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,

    googleButtonPrimaryTitle: ColorHexaConstants.VERY_DARK_GRAY,
    googleButtonSecondaryTitle: ColorHexaConstants.VERY_DARK_GRAY,
    googleButtonPrimaryBackground: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    googleButtonSecondaryBackground: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    googleButtonPrimaryBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    googleButtonSecondaryBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    googleButtonPrimaryIcon: ColorHexaConstants.BRIGHT_RED,
    googleButtonSecondaryIcon: ColorHexaConstants.BRIGHT_RED,

    facebookButtonPrimaryTitle: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    facebookButtonSecondaryTitle: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    facebookButtonPrimaryBackground: ColorHexaConstants.VERY_DARK_MODERATE_BLUE,
    facebookButtonSecondaryBackground:
      ColorHexaConstants.VERY_DARK_MODERATE_BLUE,
    facebookButtonPrimaryBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    facebookButtonSecondaryBorder: ColorHexaConstants.VERY_DARK_MODERATE_BLUE,
    facebookButtonPrimaryIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    facebookButtonSecondaryIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,

    appleButtonPrimaryTitle: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    appleButtonSecondaryTitle: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    appleButtonPrimaryBackground:
      ColorHexaConstants.VERY_DARK_GRAY_MOSTLY_BLACK,
    appleButtonSecondaryBackground:
      ColorHexaConstants.VERY_DARK_GRAY_MOSTLY_BLACK,
    appleButtonPrimaryBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    appleButtonSecondaryBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    appleButtonPrimaryIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    appleButtonSecondaryIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,

    dangerButtonPrimaryTitle: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    dangerButtonSecondaryTitle: ColorHexaConstants.VERY_LIGHT_GRAYISH_BLUE,
    dangerButtonPrimaryBackground: ColorHexaConstants.DARK_RED,
    dangerButtonSecondaryBackground: ColorHexaConstants.VERY_DARK_RED,
    dangerButtonPrimaryBorder: ColorHexaConstants.DARK_RED,
    dangerButtonSecondaryBorder: ColorHexaConstants.VERY_DARK_RED,
    dangerButtonPrimaryIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    dangerButtonSecondaryIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,

    cleanButtonPrimaryTitle: ColorHexaConstants.VERY_DARK_GRAY,
    cleanButtonSecondaryTitle: ColorHexaConstants.VERY_DARK_GRAY,
    cleanButtonPrimaryBackground: ColorHexaConstants.WHITE,
    cleanButtonSecondaryBackground: ColorHexaConstants.WHITE,
    cleanButtonPrimaryBorder: ColorHexaConstants.WHITE,
    cleanButtonSecondaryBorder: ColorHexaConstants.WHITE,
    cleanButtonPrimaryIcon: ColorHexaConstants.VERY_DARK_GRAY,
    cleanButtonSecondaryIcon: ColorHexaConstants.VERY_DARK_GRAY,

    separatorLine: ColorHexaConstants.LIGHT_GRAYISH_BLUE,

    inputBorder: ColorHexaConstants.VERY_LIGHT_GRAY,
    inputBackground: ColorHexaConstants.VERY_LIGHT_GRAY,
    inputText: ColorHexaConstants.VERY_DARK_GRAY,
    inputPlaceholder: ColorHexaConstants.GRAY,
    inputLabel: ColorHexaConstants.GRAY,
    inputError: ColorHexaConstants.DARK_RED,

    errorIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    errorText: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    errorBorder: ColorHexaConstants.DARK_RED,
    errorBackground: ColorHexaConstants.DARK_RED,

    warningIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    warningText: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    warningBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    warningBackground: ColorHexaConstants.PURE_OR_MOSTLY_PURE_GREEN,

    infoIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    infoText: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    infoBorder: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    infoBackground: ColorHexaConstants.LIGHT_GRAYISH_BLUE,

    successIcon: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    successText: ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    successBorder: ColorHexaConstants.STRONG_CYAN_LIME_GREEN,
    successBackground: ColorHexaConstants.STRONG_CYAN_LIME_GREEN,
  },

  fontFamily: {
    heading: FontFamilyConstants.ROBOTO,
    body: FontFamilyConstants.ROBOTO,
    footer: FontFamilyConstants.ROBOTO,
  },
};

export default light;
