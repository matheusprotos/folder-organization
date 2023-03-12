import YupSettings from "@config/yup.config";

const ProfileYupFormSchema = YupSettings.object().shape({
  first_name: YupSettings.string().required(),
  last_name: YupSettings.string().required(),
  phone_number: YupSettings.string().required(),
  phone_calling_code: YupSettings.string().required(),
});

export default ProfileYupFormSchema;
