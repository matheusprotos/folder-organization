import { useContextSelector } from 'use-context-selector';
import UserContext, { PropsUserContext } from '../contexts/user-context';
import { User } from '../interfaces/user.interface';

export function useUser() {
  const user: User | undefined = useContextSelector(
    UserContext,
    (userContext: PropsUserContext): User | undefined => userContext.user
  );

  const setUser: React.Dispatch<React.SetStateAction<User | undefined>> =
    useContextSelector(
      UserContext,
      (
        userContext: PropsUserContext
      ): React.Dispatch<React.SetStateAction<User | undefined>> =>
        userContext.setUser
    );

  const updateUser: () => Promise<User | void> = useContextSelector(
    UserContext,
    (userContext: PropsUserContext): (() => Promise<User | void>) =>
      userContext.updateUser
  );

  return { user, setUser, updateUser };
}
