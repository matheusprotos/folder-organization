import { AuthContext, AuthContextOptions } from "@contexts/auth.context";
import { ProfileFormData } from "@screens/private/profile/types";
import { SignInFormData } from "@screens/public/sign-in/types";
import { SignUpFormData } from "@screens/public/sign-up/types";
import { useContextSelector } from "use-context-selector";

export function useAuth() {
  const signIn: (data: SignInFormData) => Promise<void> = useContextSelector(
    AuthContext,
    (auth: AuthContextOptions): ((data: SignInFormData) => Promise<void>) =>
      auth.signIn
  );

  const signOut: () => Promise<void> = useContextSelector(
    AuthContext,
    (auth: AuthContextOptions): (() => Promise<void>) => auth.signOut
  );

  const signUp: (data: SignUpFormData) => Promise<void> = useContextSelector(
    AuthContext,
    (auth: AuthContextOptions): ((data: SignUpFormData) => Promise<void>) =>
      auth.signUp
  );

  const updateProfile: (data: ProfileFormData) => Promise<void> =
    useContextSelector(
      AuthContext,
      (auth: AuthContextOptions): ((data: ProfileFormData) => Promise<void>) =>
        auth.updateProfile
    );

  const isAuthBusy: boolean = useContextSelector(
    AuthContext,
    (auth: AuthContextOptions): boolean => auth.isAuthBusy
  );

  return { signIn, signOut, signUp, updateProfile, isAuthBusy };
}
