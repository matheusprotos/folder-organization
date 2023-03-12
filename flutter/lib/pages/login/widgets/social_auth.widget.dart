import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../login.controller.dart';

class SocialAuth extends StatelessWidget {
  final LoginController controller = Get.find();

  SocialAuth({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          GestureDetector(
            child: Image.asset(
              "assets/images/facebook.png",
              height: 40,
              width: 40,
            ),
            onTap: controller.facebookLogin,
          ),
          const SizedBox(
            width: 20,
          ),
          GestureDetector(
            child: Image.asset(
              "assets/images/google.png",
              height: 40,
              width: 40,
            ),
            onTap: controller.googleLogin,
          ),
        ],
      );
}
