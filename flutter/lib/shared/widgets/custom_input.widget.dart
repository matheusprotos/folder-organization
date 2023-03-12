import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomInput extends StatelessWidget {
  final TextEditingController controller;
  final String label;
  final bool obscureText;
  final TextInputType? textInputType;
  final TextInputAction? textInputAction;
  final Function()? onEditingComplete;
  final Function(String)? onChanged;
  final String? Function(String?)? validator;
  final bool? enabled;
  final List<TextInputFormatter>? inputFormatters;
  final bool? autofocus;

  const CustomInput({
    Key? key,
    required this.controller,
    required this.label,
    this.obscureText = false,
    this.textInputType,
    this.textInputAction,
    this.onEditingComplete,
    this.onChanged,
    this.validator,
    this.enabled,
    this.inputFormatters,
    this.autofocus,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double borderWidth = 2;

    OutlineInputBorder errorBorder = OutlineInputBorder(
      borderSide: BorderSide(
        color: Colors.red,
        width: borderWidth,
      ),
      borderRadius: BorderRadius.circular(10),
    );

    return TextFormField(
      controller: controller,
      keyboardType: textInputType,
      obscureText: obscureText,
      decoration: InputDecoration(
        labelText: label,
        fillColor: Theme.of(context).inputDecorationTheme.fillColor,
        labelStyle: const TextStyle(
          color: Color(0xFFB0B0B2),
        ),
        floatingLabelStyle: TextStyle(
          color:
              Theme.of(context).inputDecorationTheme.floatingLabelStyle?.color,
        ),
        errorStyle: const TextStyle(
          fontWeight: FontWeight.bold,
        ),
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: const Color(0xFFF4F3F5),
            width: borderWidth,
          ),
          borderRadius: BorderRadius.circular(10),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: Theme.of(context)
                    .inputDecorationTheme
                    .focusedBorder
                    ?.borderSide
                    .color ??
                Theme.of(context).primaryColor,
            width: borderWidth,
          ),
          borderRadius: BorderRadius.circular(10),
        ),
        errorBorder: errorBorder,
        focusedErrorBorder: errorBorder,
      ),
      textInputAction: textInputAction,
      onEditingComplete: onEditingComplete,
      onChanged: onChanged,
      validator: validator,
      enabled: enabled,
      inputFormatters: inputFormatters,
      autofocus: autofocus ?? false,
    );
  }
}
