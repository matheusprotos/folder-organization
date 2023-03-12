import router from 'next/router';
import { useEffect } from 'react';
import { RoutesConstants } from '../public/constants/routes.constants';
import { StorageConstants } from '../public/constants/storage.constants';

const App = () => {
  const checkAuthenticated = () => {
    const userString: string | null = localStorage.getItem(
      StorageConstants.USER
    );

    if (userString) {
      return router.replace(RoutesConstants.GROUPS);
    }

    return router.replace(RoutesConstants.LOGIN);
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return <></>;
};

export default App;
