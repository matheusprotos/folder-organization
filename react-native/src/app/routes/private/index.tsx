import { translate } from "@config/i18n.config";
import RouteConstants from "@constants/route.constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PermissionsScreen from "@screens/common/permission";
import AccountScreen from "@screens/private/account";
import CameraScreen from "@screens/private/camera";
import ExploreScreen from "@screens/private/explore";
import CreatePetScreen from "@screens/private/pet/create";
import PetsScreen from "@screens/private/pet/list";
import ShowPetScreen from "@screens/private/pet/show";
import ProfileScreen from "@screens/private/profile";
import UpdatePasswordScreen from "@screens/private/update-password";
import YourPrivacyScreen from "@screens/private/your-privacy";
import { AppThemeOptions } from "@themes/types";
import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "styled-components";
import { PrivateRoutesConstants } from "./constants";
import { TabsStackOptions } from "./types";

/**
 * @var any
 */
const Tab = createBottomTabNavigator();

/**
 * @var any
 */
const stackScreenOptions: any = {
  headerShown: false,
};

const PrivateRouter = ({}: TabsStackOptions): JSX.Element => {
  const theme: AppThemeOptions = useTheme();

  /**
   * Define navigation tab icons
   * @param route
   * @param color
   * @returns {JSX.Element}
   */
  const defineIcons = (
    route: { name: string },
    color: string | undefined
  ): JSX.Element => {
    const iconName: string = PrivateRoutesConstants.TAB_ICONS[route.name];

    return <Ionicons name={iconName} size={28} color={color} />;
  };

  /**
   * @var {any}
   */
  const tabBarLabelStyle: any = {
    fontFamily: theme.fontFamily.footer,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => defineIcons(route, color),
        animationEnabled: true,
        swipeEnabled: true,
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarButton: PrivateRoutesConstants.ROUTES_TO_HIDE.includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
        tabBarStyle: {
          display: PrivateRoutesConstants.ROUTES_TO_HIDE_TAB_BAR.includes(
            route.name
          )
            ? "none"
            : "flex",
          backgroundColor: theme.colors.tabBarBackground,
          height: 95,
          borderColor: "transparent",
          paddingBottom: 20,
          paddingTop: 20,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: tabBarLabelStyle,
      })}
      initialRouteName={RouteConstants.PETS}
    >
      <Tab.Screen
        name={RouteConstants.PERMISSIONS}
        component={PermissionsScreen}
        options={stackScreenOptions}
      />

      <Tab.Screen
        name={RouteConstants.PETS}
        component={PetsScreen}
        options={{ headerShown: false, title: translate("heading.pets") }}
      />

      <Tab.Screen
        name={RouteConstants.EXPLORE}
        component={ExploreScreen}
        options={{ headerShown: false, title: translate("heading.explore") }}
      />

      <Tab.Screen
        name={RouteConstants.ACCOUNT}
        component={AccountScreen}
        options={{ headerShown: false, title: translate("heading.account") }}
      />

      <Tab.Screen
        name={RouteConstants.PROFILE}
        component={ProfileScreen}
        options={stackScreenOptions}
      />

      <Tab.Screen
        name={RouteConstants.UPDATE_PASSWORD}
        component={UpdatePasswordScreen}
        options={stackScreenOptions}
      />

      <Tab.Screen
        name={RouteConstants.YOUR_PRIVACY}
        component={YourPrivacyScreen}
        options={stackScreenOptions}
      />

      <Tab.Screen
        name={RouteConstants.CREATE_PET}
        component={CreatePetScreen}
        options={stackScreenOptions}
      />

      <Tab.Screen
        name={RouteConstants.SHOW_PET}
        component={ShowPetScreen}
        options={stackScreenOptions}
      />

      <Tab.Screen
        name={RouteConstants.CAMERA}
        component={CameraScreen}
        options={stackScreenOptions}
      />
    </Tab.Navigator>
  );
};

export default PrivateRouter;
