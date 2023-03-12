import 'package:get/get.dart';

import '../pages/login/login.page.dart';
import '../shared/constants/route.constants.dart';

List<GetPage> appRoutes = [
  GetPage(
    name: RouteConstants.login,
    page: () => LoginPage(),
  ),
];
