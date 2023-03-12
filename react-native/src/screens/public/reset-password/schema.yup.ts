import { translate } from "@config/i18n.config";
import YupSettings from "@config/yup.config";

const ResetPasswordYupFormSchema = YupSettings.object().shape({
  email: YupSettings.string().email().required(),
  token: YupSettings.string().required(),
  password: YupSettings.string()
    .min(
      6,
      `${translate("validation.number_of_characters_must_be_more_than")} 6`
    )
    .required(),
  password_confirmation: YupSettings.string()
    .min(
      6,
      `${translate("validation.number_of_characters_must_be_more_than")} 6`
    )
    .required()
    .oneOf(
      [YupSettings.ref("password"), null],
      translate("validation.passwords_must_match")
    ),
});

export default ResetPasswordYupFormSchema;
