import 'package:despesas_coletivas/shared/constants/regex.constants.dart';

class ValidationHelper {
  static String? defaultValidate(dynamic value) {
    if (value.isEmpty) return 'Campo obrigatório';

    return null;
  }

  static String? validateEmail(dynamic value) {
    String? result = ValidationHelper.defaultValidate(value);

    bool invalidEmail = !RegexConstants.validEmail.hasMatch(value);

    if (result == null && invalidEmail) result = "Email inválido";

    return result;
  }

  static String? validatePassword(dynamic password, dynamic confirmPassword) {
    if (password.isEmpty) return "Campo obrigatório";

    String? result = ValidationHelper.defaultValidate(password);
    result = ValidationHelper.defaultValidate(confirmPassword);

    if (result == null && password.length < 6) return "Minímo 6 carácteres";

    bool differentPassword = password != confirmPassword;

    if (result == null && differentPassword) result = "Senhas diferentes";

    return result;
  }

  static String? validateDate(dynamic value) {
    String? result = ValidationHelper.defaultValidate(value);

    bool invalidDate = !RegexConstants.date.hasMatch(value);

    if (result == null && invalidDate) result = "Data inválida";

    return result;
  }
}
