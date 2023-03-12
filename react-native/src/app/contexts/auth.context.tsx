import { User, UserConvert } from "@entities/user.entity";
import { SignInFormData } from "@screens/public/sign-in/types";
import { AuthService } from "@services/auth.service";
import React, { useCallback, useState } from "react";
import { createContext } from "use-context-selector";
import { AxiosResponse, AxiosError } from "axios";
import { HTTPConstants } from "@constants/http.constants";
import { SessionEntity, SessionEntityConvert } from "@entities/session.entity";
import { SessionProvider } from "@providers/session.provider";
import useAsyncEffect from "use-async-effect";
import { SignUpFormData } from "@screens/public/sign-up/types";
import { ProfileFormData } from "@screens/private/profile/types";
import { ProfileService } from "@services/profile.service";
import { ToastProvider } from "@providers/toast.provider";

interface AuthProviderProps {
  children: JSX.Element;
}

export interface AuthContextOptions {
  isSigned: boolean;
  user: User | undefined;
  isAuthBusy: boolean;

  signIn(data: SignInFormData): Promise<void>;
  signUp(data: SignUpFormData): Promise<void>;
  signOut(): Promise<void>;
  updateProfile(data: ProfileFormData): Promise<void>;
}

export const AuthContext = createContext<AuthContextOptions>(
  {} as AuthContextOptions
);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}): JSX.Element => {
  const sessionProvider: SessionProvider = SessionProvider.Instance;
  const toastProvider: ToastProvider = ToastProvider.Instance;

  const authService: AuthService = AuthService.Instance;
  const profileService: ProfileService = ProfileService.Instance;

  const [isAuthBusy, setIsAuthBusy] = useState<boolean>(false);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  /**
   * @returns {Promise<void>}
   */
  const loadSession = useCallback(async (): Promise<void> => {
    const loadedUser: any = await sessionProvider.getUser();

    if (loadedUser) {
      setUser(loadedUser);
      setIsSigned(!!loadedUser);
    }
  }, []);

  /**
   * @returns {Promise<void>}
   */
  async function signIn(data: SignInFormData): Promise<void> {
    try {
      setIsAuthBusy(true);

      const requestResponse: AxiosResponse<any> = await authService.signIn(
        data
      );

      if (requestResponse.status === HTTPConstants.OK) {
        const sessionEntity: SessionEntity =
          SessionEntityConvert.toSessionEntity(
            JSON.stringify(requestResponse.data)
          );

        await saveSession(sessionEntity);

        setIsAuthBusy(false);
      }

      setIsAuthBusy(false);
    } catch (error: any) {
      setIsAuthBusy(false);
      console.error(error?.response?.data ?? error);
    }
  }

  /**
   * @returns {Promise<void>}
   */
  async function signUp(data: SignUpFormData): Promise<void> {
    try {
      setIsAuthBusy(true);

      const requestResponse: AxiosResponse<any> = await authService.signUp(
        data
      );

      if (requestResponse.status === HTTPConstants.CREATED) {
        const sessionEntity: SessionEntity =
          SessionEntityConvert.toSessionEntity(
            JSON.stringify(requestResponse.data)
          );

        await saveSession(sessionEntity);

        setIsAuthBusy(false);
      }

      setIsAuthBusy(false);
    } catch (error: any) {
      setIsAuthBusy(false);
      console.error(error?.response?.data ?? error);
    }
  }

  /**
   * @returns {Promise<void>}
   */
  async function updateProfile(data: ProfileFormData): Promise<void> {
    try {
      setIsAuthBusy(true);

      const requestResponse: AxiosResponse<any> = await profileService.update(
        data
      );

      if (requestResponse.status === HTTPConstants.OK) {
        const updatedUser: User = UserConvert.toUser(
          JSON.stringify(requestResponse.data)
        );

        await sessionProvider.setUser(updatedUser);
        setUser(updatedUser);

        toastProvider.success();

        setIsAuthBusy(false);
      }

      setIsAuthBusy(false);
    } catch (error: any) {
      setIsAuthBusy(false);
      console.error(error?.response?.data ?? error);
    }
  }

  /**
   * @returns {Promise<void>}
   */
  async function saveSession(sessionEntity: SessionEntity): Promise<void> {
    await sessionProvider.createSession(sessionEntity);

    setIsSigned(true);

    const userEntity: User = UserConvert.toUser(
      JSON.stringify(sessionEntity.user)
    );

    setUser(userEntity);
  }

  /**
   * @returns {Promise<void>}
   */
  async function signOut(): Promise<void> {
    setIsAuthBusy(true);

    await sessionProvider.removeSession();
    setIsSigned(false);

    setIsAuthBusy(false);
  }

  /**
   * @returns {Promise<void>}
   */
  useAsyncEffect(async (): Promise<void> => {
    try {
      setIsAuthBusy(true);
      loadSession();
      setIsAuthBusy(false);
    } catch (error) {
      setIsAuthBusy(false);
      console.error(error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSigned: isSigned,
        user,
        isAuthBusy: isAuthBusy,

        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
