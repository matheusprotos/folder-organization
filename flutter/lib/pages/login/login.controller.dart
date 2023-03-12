// ignore_for_file: avoid_print

import 'package:despesas_coletivas/shared/constants/route.constants.dart';
import 'package:despesas_coletivas/shared/constants/storage.constants.dart';
import 'package:despesas_coletivas/shared/providers/auth.provider.dart';
import 'package:despesas_coletivas/shared/providers/storage.provider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

class LoginController extends GetxController {
  final AuthProvider authProvider = Get.put(AuthProvider());
  final StorageProvider storageProvider = Get.put(StorageProvider());

  final formKey = GlobalKey<FormState>();

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  RxBool isBusy = false.obs;

  Future<void> appleLogin() async {
    BuildContext context = Get.context!;

    try {
      isBusy.value = true;

      final credential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
      ).catchError(
        (error) => throw error,
      );

      String appleUsername;
      String appleEmail;

      if (credential.email != null) {
        await storageProvider.setValue(
          boxKey: StorageConstants.appleBox,
          valueKey: StorageConstants.appleUsername,
          value: credential.givenName,
        );
        await storageProvider.setValue(
          boxKey: StorageConstants.appleBox,
          valueKey: StorageConstants.appleEmail,
          value: credential.email,
        );

        appleUsername = credential.givenName!;
        appleEmail = credential.email!;
      } else {
        appleUsername = await storageProvider.getValue(
          boxKey: StorageConstants.appleBox,
          valueKey: StorageConstants.appleUsername,
        );
        appleEmail = await storageProvider.getValue(
          boxKey: StorageConstants.appleBox,
          valueKey: StorageConstants.appleEmail,
        );
      }

      await authProvider.appleLogin({
        "name": appleUsername,
        "email": appleEmail,
      }).catchError(
        (error) => throw error,
      );

      Get.offAndToNamed(RouteConstants.customTabs);

      isBusy.value = false;
    } catch (error) {
      isBusy.value = false;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Ocorreu um erro no login',
            style: Theme.of(context).snackBarTheme.contentTextStyle,
          ),
          backgroundColor: Colors.red,
        ),
      );

      print(error);
    }
  }

  Future<void> facebookLogin() async {
    BuildContext context = Get.context!;

    try {
      isBusy.value = true;

      await authProvider.facebookLogin();

      Get.offAndToNamed(RouteConstants.customTabs);

      isBusy.value = false;
    } catch (error) {
      isBusy.value = false;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Ocorreu um erro no login',
            style: Theme.of(context).snackBarTheme.contentTextStyle,
          ),
          backgroundColor: Colors.red,
        ),
      );

      print(error);
    }
  }

  Future<void> forgotPassword() async {
    BuildContext context = Get.context!;

    try {
      if (emailController.text.isEmpty || !emailController.text.isEmail) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Favor digitar um e-mail válido',
              style: Theme.of(context).snackBarTheme.contentTextStyle,
            ),
            backgroundColor: Colors.red,
          ),
        );
      } else {
        isBusy.value = true;

        await authProvider.forgotPassword({
          "email": emailController.text,
        });

        isBusy.value = false;

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'E-mail de recuperação enviado com sucesso!',
              style: Theme.of(context).snackBarTheme.contentTextStyle,
            ),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (error) {
      isBusy.value = false;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Ocorreu ao enviar o e-mail de recuperação',
            style: Theme.of(context).snackBarTheme.contentTextStyle,
          ),
          backgroundColor: Colors.red,
        ),
      );

      print(error);
    }
  }

  Future<void> googleLogin() async {
    BuildContext context = Get.context!;

    try {
      isBusy.value = true;

      await authProvider.googleLogin();

      Get.offAndToNamed(RouteConstants.customTabs);

      isBusy.value = false;
    } catch (error) {
      isBusy.value = false;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Ocorreu um erro no login',
            style: Theme.of(context).snackBarTheme.contentTextStyle,
          ),
          backgroundColor: Colors.red,
        ),
      );

      print(error);
    }
  }

  Future<void> login() async {
    BuildContext context = Get.context!;

    try {
      if (formKey.currentState!.validate()) {
        isBusy.value = true;

        await authProvider
            .login(emailController.text, passwordController.text)
            .catchError((error) => throw error);

        Get.offAndToNamed(RouteConstants.customTabs);

        isBusy.value = false;
      }
    } catch (error) {
      isBusy.value = false;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'E-mail ou senha incorretos',
            style: Theme.of(context).snackBarTheme.contentTextStyle,
          ),
          backgroundColor: Colors.red,
        ),
      );

      print(error);
    }
  }

  void redirectToRegister() => Get.toNamed(RouteConstants.register);
}
