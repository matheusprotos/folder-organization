import 'dart:io';

import 'package:despesas_coletivas/pages/login/widgets/social_auth.widget.dart';
import 'package:despesas_coletivas/shared/helpers/validation.helper.dart';
import 'package:despesas_coletivas/shared/widgets/custom_button.widget.dart';
import 'package:despesas_coletivas/shared/widgets/custom_input.widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

import 'login.controller.dart';

class LoginPage extends GetView {
  @override
  final LoginController controller = Get.put(LoginController());

  LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: Theme.of(context).backgroundColor,
        body: GestureDetector(
          child: ListView(
            shrinkWrap: true,
            padding: const EdgeInsets.all(16),
            children: [
              const SizedBox(
                height: 50,
              ),
              Image.asset(
                "assets/images/splash-logo.png",
                height: 200,
                width: 200,
              ),
              const SizedBox(
                height: 50,
              ),
              const Text(
                "Bem-vindo ao Despesas Coletivas",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 18,
                ),
              ),
              const SizedBox(
                height: 12,
              ),
              Text(
                "Organize suas despesas",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16,
                  color: (Theme.of(context).brightness == Brightness.dark)
                      ? Colors.white
                      : const Color(0xFF7C7A7A),
                ),
              ),
              Form(
                key: controller.formKey,
                child: Column(
                  children: [
                    const SizedBox(
                      height: 20,
                    ),
                    CustomInput(
                      controller: controller.emailController,
                      label: "E-mail",
                      textInputType: TextInputType.emailAddress,
                      validator: ValidationHelper.validateEmail,
                      textInputAction: TextInputAction.next,
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    CustomInput(
                      controller: controller.passwordController,
                      label: "Senha",
                      obscureText: true,
                      validator: ValidationHelper.defaultValidate,
                      textInputAction: TextInputAction.done,
                      onEditingComplete: controller.login,
                    ),
                    const SizedBox(
                      height: 60,
                    ),
                    CustomButton(
                      child: Obx(
                        () => controller.isBusy.value
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                ),
                              )
                            : const Text(
                                "Login",
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                      ),
                      onPressed: controller.login,
                    ),
                    const SizedBox(
                      height: 12,
                    ),
                    GestureDetector(
                      child: Text(
                        "Esqueceu a senha?",
                        style: TextStyle(
                          fontSize: 12,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                      onTap: controller.forgotPassword,
                    ),
                    const SizedBox(
                      height: 12,
                    ),
                    const Text(
                      "Ou conecte com ",
                    ),
                    const SizedBox(
                      height: 12,
                    ),
                    if (Platform.isIOS) ...{
                      SignInWithAppleButton(
                        style: (Theme.of(context).brightness == Brightness.dark)
                            ? SignInWithAppleButtonStyle.white
                            : SignInWithAppleButtonStyle.black,
                        onPressed: controller.appleLogin,
                      ),
                    },
                    const SizedBox(
                      height: 12,
                    ),
                    SocialAuth(),
                    const SizedBox(
                      height: 35,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          "Não tem uma conta? ",
                        ),
                        GestureDetector(
                          child: Text(
                            "Cadastrar",
                            style: TextStyle(
                              color: Theme.of(context).primaryColor,
                            ),
                          ),
                          onTap: controller.redirectToRegister,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
        ),
      );
}
