import { translate } from "@config/i18n.config";
import { HTTPConstants } from "@constants/http.constants";
import { RestAPIProvider } from "@providers/rest-api.provider";
import { ToastProvider } from "@providers/toast.provider";
import { SignInFormData } from "@screens/public/sign-in/types";
import { SignUpFormData } from "@screens/public/sign-up/types";
import { AxiosResponse } from "axios";

export class AuthService {
  private static _instance: AuthService;

  private restAPIProvider: RestAPIProvider = RestAPIProvider.Instance;
  private toastProvider: ToastProvider = ToastProvider.Instance;

  public static get Instance(): AuthService {
    return this._instance || (this._instance = new this());
  }

  /**
   * @param {SignInFormData} data
   * @returns {Promise<AxiosResponse<any>>}
   */
  public signIn = async (data: SignInFormData): Promise<AxiosResponse<any>> =>
    this.restAPIProvider.signIn(data).catch((error: any) => {
      if (error?.response?.status === HTTPConstants.BAD_REQUEST) {
        this.toastProvider.warning({
          title: translate("validation.invalid_email_or_password"),
        });
      } else {
        this.toastProvider.error({
          title: translate("validation.request_error"),
        });
      }

      throw error;
    });

  /**
   * @param {SignUpFormData} data
   * @returns {Promise<AxiosResponse<any>>}
   */
  public signUp = async (data: SignUpFormData): Promise<AxiosResponse<any>> =>
    this.restAPIProvider.signUp(data).catch((error: any) => {
      this.toastProvider.error({
        title: translate("validation.request_error"),
      });

      throw error;
    });
}
