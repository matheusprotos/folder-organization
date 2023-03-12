import RouteConstants from "@constants/route.constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPasswordScreen from "@screens/public/forgot-password";
import ResetPasswordScreen from "@screens/public/reset-password";
import SignInScreen from "@screens/public/sign-in";
import SignUpScreen from "@screens/public/sign-up";
import * as React from "react";

/**
 * @var any
 */
const Stack: any = createNativeStackNavigator();

/**
 * @var any
 */
const stackScreenOptions: any = {
  headerShown: false,
};

const PublicRouter = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={RouteConstants.SIGN_IN}>
      <Stack.Screen
        name={RouteConstants.SIGN_IN}
        component={SignInScreen}
        options={stackScreenOptions}
      />

      <Stack.Screen
        name={RouteConstants.SIGN_UP}
        component={SignUpScreen}
        options={stackScreenOptions}
      />

      <Stack.Screen
        name={RouteConstants.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={stackScreenOptions}
      />

      <Stack.Screen
        name={RouteConstants.RESET_PASSWORD}
        component={ResetPasswordScreen}
        options={stackScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default PublicRouter;
