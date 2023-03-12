import { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { HTTPConstants } from "../constants/http.constants";
import { StorageConstants } from "../constants/storage.constants";
import { RestAPIProvider } from "./rest-api.provider";

export class AuthProvider {
  private static _instance: AuthProvider;

  private restAPIProvider: RestAPIProvider = RestAPIProvider.Instance;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private async _treatBearerToken(token: string): Promise<void> {
    const cookies = new Cookies();
    cookies.set(StorageConstants.BEARER_TOKEN, token, {
      path: "/",
      expires: new Date(
        new Date().getFullYear() + 1,
        new Date().getMonth(),
        new Date().getDay()
      ),
    });
    localStorage.setItem(StorageConstants.BEARER_TOKEN, token);
  }

  public async facebookLogin({ accessToken, email }: any): Promise<void> {
    const authenticationResponse = await this.restAPIProvider.facebookLogin({
      access_token: accessToken,
      email,
    });

    if (authenticationResponse.status == HTTPConstants.OK) {
      await this._treatBearerToken(authenticationResponse.data.token);
    }
  }

  public forgotPassword = (data: any): Promise<AxiosResponse> =>
    this.restAPIProvider.forgotPassword(data);

  public async googleLogin({ access_token }: any): Promise<void> {
    const authenticationResponse = await this.restAPIProvider.googleLogin({
      access_token,
    });

    if (authenticationResponse.status == HTTPConstants.OK) {
      await this._treatBearerToken(authenticationResponse.data.token);
    }
  }

  public loadAuthenticatedUser = (): Promise<AxiosResponse> =>
    this.restAPIProvider.getAuthenticatedUser();

  public async login(email: string, password: string): Promise<void> {
    const authenticationResponse: AxiosResponse =
      await this.restAPIProvider.login({
        email: email,
        password: password,
      });

    if (authenticationResponse.status == HTTPConstants.OK) {
      await this._treatBearerToken(authenticationResponse.data.token);
    }
  }

  public async logout(): Promise<void> {
    try {
      const logoutResponse: AxiosResponse = await this.restAPIProvider.logout();

      if (logoutResponse.status == HTTPConstants.OK) {
        localStorage.clear();
      }
    } catch (error) {
      console.error(error);
    }
  }

  public register = (data: any): Promise<AxiosResponse> =>
    this.restAPIProvider.register(data);

  public resetPassword = (data: any) =>
    this.restAPIProvider.resetPassword(data);
}
