import YupSettings from "@config/yup.config";
import { translate } from "@config/i18n.config";

const CreatePetYupFormSchema = YupSettings.object().shape({
  images: YupSettings.array()
    .min(1, translate("validation.required"))
    .required(),
  description: YupSettings.string().required(),
  size: YupSettings.number().required(),
  agressive: YupSettings.boolean().required(),
  name: YupSettings.string(),
  color: YupSettings.number(),
  gender: YupSettings.number(),
  age: YupSettings.number(),
  species: YupSettings.string(),
  location: YupSettings.object().required(),
  number: YupSettings.string().required(),
  complement: YupSettings.string(),
  reference_place: YupSettings.string(),
});

export default CreatePetYupFormSchema;
