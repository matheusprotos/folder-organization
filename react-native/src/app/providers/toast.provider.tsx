import ToastCard from "@components/toast";
import { translate } from "@config/i18n.config";
import { ColorHexaConstants } from "@constants/color-hexa.constants";
import React from "react";
import Toast, { ToastOptions } from "react-native-root-toast";
import { ToastParams, ToastShowParams } from "../../types/toast";

export class ToastProvider {
  private static _instance: ToastProvider;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * @returns {void}
   */
  private show = (params: ToastShowParams): void => {
    const toastOptions: ToastOptions = {
      duration: Toast.durations.LONG,
      position: params.position ?? Toast.positions.TOP,
      animation: true,
      shadow: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: "transparent",
    };

    /**
     * @var any
     */
    const toastElement: any = (
      <ToastCard
        title={params.title}
        backgroundColor={params.backgroundColor}
        titleColor={params.titleColor}
      />
    );

    Toast.show(toastElement, toastOptions);
  };

  /**
   * @returns {void}
   */
  public success = (params?: ToastParams): void => {
    const payload: any = {
      ...params,
      title: params?.title || translate("validation.request_success"),
      backgroundColor:
        params?.backgroundColor ?? ColorHexaConstants.STRONG_CYAN_LIME_GREEN,
      titleColor:
        params?.titleColor ?? ColorHexaConstants.VERY_DARK_GRAY_MOSTLY_BLACK,
    };

    this.show(payload);
  };

  /**
   * @returns {void}
   */
  public error = (params?: ToastParams): void => {
    const payload: any = {
      ...params,
      title: params?.title || translate("validation.request_error"),
      backgroundColor: params?.backgroundColor ?? ColorHexaConstants.DARK_RED,
      titleColor: params?.titleColor ?? ColorHexaConstants.LIGHT_GRAYISH_BLUE,
    };

    this.show(payload);
  };

  /**
   * @returns {void}
   */
  public warning = (params?: ToastParams): void => {
    const payload: any = {
      ...params,
      title: params?.title || translate("validation.request_warning"),
      backgroundColor:
        params?.backgroundColor ?? ColorHexaConstants.STRONG_YELLOW,
      titleColor:
        params?.titleColor ?? ColorHexaConstants.VERY_DARK_GRAY_MOSTLY_BLACK,
    };

    this.show(payload);
  };
}
