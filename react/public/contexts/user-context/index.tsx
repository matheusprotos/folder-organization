import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';
import { HTTPConstants } from '../../constants/http.constants';
import { StorageConstants } from '../../constants/storage.constants';
import { User, UserConvert } from '../../interfaces/user.interface';
import { AuthProvider } from '../../providers/auth.provider';

export type PropsUserContext = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updateUser: () => Promise<User | void>;
};

const UserContext = createContext<PropsUserContext | undefined>(undefined);

const UserContextProvider = ({ children }) => {
  const authProvider: AuthProvider = AuthProvider.Instance;

  const [user, setUser] = useState<User>();

  const updateUser = useCallback(async (): Promise<User | void> => {
    const authenticatedUserResponse: AxiosResponse =
      await authProvider.loadAuthenticatedUser();

    if (authenticatedUserResponse.status === HTTPConstants.OK) {
      const userString: string = JSON.stringify(authenticatedUserResponse.data);

      localStorage.setItem(StorageConstants.USER, userString);

      const newUser: User = UserConvert.toUser(userString);

      setUser(newUser);

      return newUser;
    }
  }, [authProvider]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContextProvider };
export default UserContext;
