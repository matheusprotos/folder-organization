import YupSettings from "@config/yup.config";

const SignInYupFormSchema = YupSettings.object().shape({
  first_name: YupSettings.string().required(),
  last_name: YupSettings.string().required(),
  email: YupSettings.string().email().required(),
  phone_number: YupSettings.string().required(),
  phone_calling_code: YupSettings.string().required(),
  password: YupSettings.string().required(),
});

export default SignInYupFormSchema;
