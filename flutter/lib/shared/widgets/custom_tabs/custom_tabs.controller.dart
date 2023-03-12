// ignore_for_file: avoid_print

import 'package:despesas_coletivas/pages/expenses/expenses.page.dart';
import 'package:despesas_coletivas/pages/groups/groups.page.dart';
import 'package:despesas_coletivas/pages/settings/settings.page.dart';
import 'package:despesas_coletivas/shared/constants/route.constants.dart';
import 'package:despesas_coletivas/shared/models/user.model.dart';
import 'package:despesas_coletivas/shared/providers/auth.provider.dart';
import 'package:despesas_coletivas/shared/providers/user.provider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CustomTabsController extends GetxController {
  UserProvider userProvider = Get.put(UserProvider());
  AuthProvider authProvider = Get.put(AuthProvider());

  Rx<User?> user = Rx<User?>(null);

  @override
  onInit() {
    user.value = userProvider.user!.value;

    super.onInit();
  }

  List<Map<String, dynamic>> tabs = [
    {
      "icon": const Icon(
        Icons.groups,
      ),
      "label": "Grupos",
      "content": GroupsPage(),
    },
    {
      "icon": const Icon(
        Icons.request_page_outlined,
      ),
      "label": "Despesas",
      "content": ExpensesPage(),
    },
    {
      "icon": const Icon(
        Icons.settings,
      ),
      "label": "Configurações",
      "content": SettingsPage(),
    }
  ];

  RxInt currentTabIndex = 0.obs;

  Future<void> exitApp() async {
    try {
      await authProvider.logout().catchError(
            (error) => throw error,
          );

      Get.offAndToNamed(RouteConstants.login);
    } catch (error) {
      print(error);
    }
  }

  void onTabChange(int index) => currentTabIndex.value = index;

  Future<void> redirectToNotifications() async {
    await Get.toNamed(RouteConstants.notifications);

    await authProvider.loadAuthenticatedUser();

    user.value = userProvider.user!.value;
  }
}
