import 'package:badges/badges.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'custom_tabs.controller.dart';

class CustomTabs extends GetView {
  @override
  final CustomTabsController controller = Get.put(CustomTabsController());

  CustomTabs({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Obx(
        () {
          List<dynamic> notifications = [
            ...controller.user.value?.groupInvites ?? [],
            ...controller.user.value?.notifications ?? [],
          ];

          return Scaffold(
            backgroundColor: Theme.of(context).backgroundColor,
            appBar: AppBar(
              title: Text(
                controller.tabs[controller.currentTabIndex.value]["label"],
              ),
              backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
              leading: IconButton(
                icon: const Icon(
                  Icons.exit_to_app,
                ),
                onPressed: controller.exitApp,
              ),
              actions: [
                IconButton(
                  icon: notifications.isNotEmpty
                      ? Badge(
                          badgeContent: Text(
                            notifications.length.toString(),
                            style: const TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          child: const Icon(
                            Icons.notifications,
                          ),
                        )
                      : const Icon(
                          Icons.notifications,
                        ),
                  onPressed: controller.redirectToNotifications,
                ),
              ],
            ),
            body: controller.tabs[controller.currentTabIndex.value]["content"],
            bottomNavigationBar: BottomNavigationBar(
              backgroundColor:
                  Theme.of(context).bottomNavigationBarTheme.backgroundColor,
              items: List.generate(
                controller.tabs.length,
                (index) => BottomNavigationBarItem(
                  icon: controller.tabs[index]["icon"],
                  label: controller.tabs[index]["label"],
                ),
              ),
              currentIndex: controller.currentTabIndex.value,
              unselectedItemColor: Theme.of(context)
                  .bottomNavigationBarTheme
                  .unselectedItemColor,
              selectedItemColor:
                  Theme.of(context).bottomNavigationBarTheme.selectedItemColor,
              onTap: controller.onTabChange,
            ),
          );
        },
      );
}
