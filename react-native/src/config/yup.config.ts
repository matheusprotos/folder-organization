import * as YupSettings from "yup";
import { translate } from "./i18n.config";

YupSettings.setLocale({
  mixed: {
    required: translate("validation.required"),
    default: translate("validation.invalid"),
  },
  string: {
    email: translate("validation.invalid_email"),
    min: translate("validation.min"),
    max: translate("validation.max"),
  },
  number: {
    min: translate("validation.field_too_short"),
    max: translate("validation.field_too_big"),
  },
});

export default YupSettings;
