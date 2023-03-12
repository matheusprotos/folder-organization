import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarMenu from '../components/sidebar-menu';
import { RoutesConstants } from '../public/constants/routes.constants';
import GlobalContext from '../public/contexts/global-context';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const authRoutes: Array<string> = [
    RoutesConstants.LOGIN,
    RoutesConstants.REGISTER,
    RoutesConstants.FORGOT_PASSWORD,
  ];

  return (
    <ThemeProvider enableSystem attribute="class">
      <GlobalContext>
        <ToastContainer position="top-right" closeOnClick pauseOnHover />

        {!authRoutes.includes(router.pathname) && <SidebarMenu />}

        <Component {...pageProps} />
      </GlobalContext>
    </ThemeProvider>
  );
};

export default MyApp;
