import { translate } from "@config/i18n.config";
import YupSettings from "@config/yup.config";

const UpdatePasswordYupFormSchema = YupSettings.object().shape({
  current_password: YupSettings.string()
    .min(
      5,
      `${translate("validation.number_of_characters_must_be_more_than")} 5`
    )
    .required(),
  new_password: YupSettings.string()
    .min(
      5,
      `${translate("validation.number_of_characters_must_be_more_than")} 5`
    )
    .required()
    .notOneOf(
      [YupSettings.ref("current_password"), null],
      translate("validation.passwords_must_not_match")
    ),
});

export default UpdatePasswordYupFormSchema;
