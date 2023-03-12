import 'dart:convert';

import 'package:despesas_coletivas/shared/constants/storage.constants.dart';
import 'package:despesas_coletivas/shared/models/user.model.dart';
import 'package:get/get.dart';

import 'storage.provider.dart';

class UserProvider extends GetxService {
  final StorageProvider storageProvider = Get.put(StorageProvider());

  Rx<User>? user;

  Future<UserProvider> init() async {
    String? storageUser = await storageProvider.getValue(
      boxKey: StorageConstants.authBox,
      valueKey: StorageConstants.user,
    );

    if (storageUser != null) user = User.fromJson(json.decode(storageUser)).obs;

    return this;
  }

  Future<void> setUser(Map<String, dynamic> userJSON) async {
    user = User.fromJson(userJSON).obs;

    await storageProvider.setValue(
      boxKey: StorageConstants.authBox,
      valueKey: StorageConstants.user,
      value: json.encode(userJSON),
    );
  }
}
