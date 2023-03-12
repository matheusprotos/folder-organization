import 'package:flutter/material.dart';

class CustomClearButton extends StatelessWidget {
  final Widget child;
  final Function()? onPressed;

  const CustomClearButton({Key? key, required this.child, this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) => SizedBox(
        height: 50,
        width: MediaQuery.of(context).size.width,
        child: TextButton(
          onPressed: onPressed,
          child: child,
        ),
      );
}
