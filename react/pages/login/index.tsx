import { useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosResponse } from "axios";
import { ErrorMessage, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useEffect } from "react";
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import { FaFacebookSquare, FaGooglePlusSquare } from "react-icons/fa";
import { toast } from "react-toastify";
import Input from "../../components/input";
import SubmitButton from "../../components/submit-button";
import { FacebookConstants } from "../../public/constants/facebook.constants";
import { HTTPConstants } from "../../public/constants/http.constants";
import { RoutesConstants } from "../../public/constants/routes.constants";
import { StorageConstants } from "../../public/constants/storage.constants";
import { useUser } from "../../public/hooks/user.hook";
import { UserConvert } from "../../public/interfaces/user.interface";
import { AuthProvider } from "../../public/providers/auth.provider";
import Yup from "../../public/settings/yup.settings";

const ValidationSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const Login = () => {
  const authProvider: AuthProvider = AuthProvider.Instance;

  const { setUser } = useUser();

  const facebookLogin = async (
    userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    try {
      await authProvider.facebookLogin(userInfo);

      const authenticatedUserResponse: AxiosResponse = await authProvider
        .loadAuthenticatedUser()
        .catch((error) => {
          throw error;
        });

      if (authenticatedUserResponse.status == HTTPConstants.OK) {
        const userString: string = JSON.stringify(
          authenticatedUserResponse.data
        );
        localStorage.setItem(StorageConstants.USER, userString);

        setUser(UserConvert.toUser(userString));
      }

      await router.replace(RoutesConstants.GROUPS);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const googleLoginResponse = async (tokenResponse: any) => {
    try {
      await authProvider.googleLogin(tokenResponse);

      const authenticatedUserResponse: AxiosResponse = await authProvider
        .loadAuthenticatedUser()
        .catch((error) => {
          throw error;
        });

      if (authenticatedUserResponse.status == HTTPConstants.OK) {
        const userString: string = JSON.stringify(
          authenticatedUserResponse.data
        );
        localStorage.setItem(StorageConstants.USER, userString);

        setUser(UserConvert.toUser(userString));
      }

      await router.replace(RoutesConstants.GROUPS);
    } catch (error) {
      console.error(error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleLoginResponse,
  });

  const handleSubmit = async ({ email, password }: any) => {
    try {
      await authProvider.login(email, password).catch((error) => {
        throw error;
      });

      const authenticatedUserResponse: AxiosResponse = await authProvider
        .loadAuthenticatedUser()
        .catch((error) => {
          throw error;
        });

      if (authenticatedUserResponse.status == HTTPConstants.OK) {
        const userString: string = JSON.stringify(
          authenticatedUserResponse.data
        );
        localStorage.setItem(StorageConstants.USER, userString);

        setUser(UserConvert.toUser(userString));
      }

      await router.replace(RoutesConstants.GROUPS);
    } catch (error) {
      console.error(error);

      toast.error("E-mail ou senha incorretos");
    }
  };

  useEffect(() => {
    axios.get("https://192.168.18.7:3333");
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image
        src="/images/splash-logo.png"
        alt="Despesas Coletivas logo"
        height="200%"
        width="200%"
      />

      <div className="flex flex-col items-center mt-4	container">
        <p>Bem-vindo ao Despesas Coletivas</p>
        <p className="mt-1">Organize suas despesas</p>

        <Formik
          initialValues={{
            email: "matheusprotos@gmail.com",
            password: "Math@3533",
          }}
          validationSchema={ValidationSchema}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, isSubmitting }) => (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <Input
                label="E-mail"
                name="email"
                type="email"
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
              />

              <ErrorMessage
                name="email"
                render={(message: string) => (
                  <p className="mt-4 text-error">{message}</p>
                )}
              />

              <Input
                label="Senha"
                name="password"
                type="password"
                placeholder="Senha"
                value={values.password}
                onChange={handleChange}
              />

              <ErrorMessage
                name="password"
                render={(message: string) => (
                  <p className="mt-4 text-error">{message}</p>
                )}
              />

              <SubmitButton label="Login" loading={isSubmitting} />
            </form>
          )}
        </Formik>

        <p className="mt-2">Ou conecte com</p>

        <div className="flex row justify-between mt-2">
          <FacebookLogin
            appId={FacebookConstants.APP_ID}
            fields="email"
            callback={facebookLogin}
            cssClass="mr-10 cursor-pointer text-[#3B5998] dark:text-white"
            textButton=""
            icon={<FaFacebookSquare size={40} />}
          />

          <FaGooglePlusSquare
            size={40}
            className="cursor-pointer text-[#DB4437] dark:text-white"
            onClick={() => googleLogin()}
          />
        </div>

        <Link href="/forgot-password" passHref>
          <span className="mt-2 cursor-pointer text-primary-light">
            {" "}
            Esqueceu a senha?
          </span>
        </Link>

        <p className="mt-2">
          Não tem uma conta?{" "}
          <Link href="/register" passHref>
            <span className="cursor-pointer text-primary-light">Cadastrar</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
