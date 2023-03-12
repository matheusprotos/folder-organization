import { PlatformConstants } from "@constants/platform.constants";
import { NativeModules, Platform } from "react-native";
import { LocaleConstants } from "@constants/locale.constants";

export class LanguageHelper {
  /**
   * @returns {string}
   */
  public static getLanguageByDevice(): string {
    let locale: string = LocaleConstants.PT_BR;

    const isIOSPlatform: boolean = Platform.OS === PlatformConstants.IOS;

    if (isIOSPlatform) {
      locale = this.getIOSLanguage();
    } else {
      locale = this.getAndroidLanguage();
    }

    if (typeof locale === "undefined") {
      console.error("Could not get device locale");
      return "en";
    }

    return locale ?? LocaleConstants.PT_BR;
  }

  /**
   * @returns {string}
   */
  public static getIOSLanguage(): string {
    let locale: string = LocaleConstants.PT_BR;

    if (
      NativeModules.SettingsManager &&
      NativeModules.SettingsManager.settings &&
      NativeModules.SettingsManager.settings.AppleLanguages
    ) {
      locale =
        NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0];
    }

    return locale;
  }

  /**
   * @returns {string}
   */
  public static getAndroidLanguage(): string {
    let locale: string = LocaleConstants.PT_BR;

    if (NativeModules.I18nManager) {
      locale = NativeModules.I18nManager.localeIdentifier;
    }

    return locale;
  }
}
