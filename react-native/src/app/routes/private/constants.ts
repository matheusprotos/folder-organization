import RouteConstants from "@constants/route.constants";

export class PrivateRoutesConstants {
  public static readonly TAB_ICONS: object = {
    [RouteConstants.HOME]: "home-sharp",
    [RouteConstants.EXPLORE]: "navigate-circle-sharp",
    [RouteConstants.PETS]: "paw-sharp",
    [RouteConstants.ACCOUNT]: "person-sharp",
  };

  public static readonly ROUTES_TO_HIDE: Array<string> = [
    RouteConstants.CREATE_PET,
    RouteConstants.PROFILE,
    RouteConstants.UPDATE_PASSWORD,
    RouteConstants.YOUR_PRIVACY,
    RouteConstants.CAMERA,
    RouteConstants.SHOW_PET,
    RouteConstants.PERMISSIONS,
  ];

  public static readonly ROUTES_TO_HIDE_TAB_BAR: Array<string> = [
    RouteConstants.CREATE_PET,
    RouteConstants.PROFILE,
    RouteConstants.UPDATE_PASSWORD,
    RouteConstants.YOUR_PRIVACY,
    RouteConstants.CAMERA,
    RouteConstants.SHOW_PET,
    RouteConstants.PERMISSIONS,
  ];
}
