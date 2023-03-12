import YupSettings from "@config/yup.config";

const SignInYupFormSchema = YupSettings.object().shape({
  email: YupSettings.string().email().required(),
  password: YupSettings.string().required(),
});

export default SignInYupFormSchema;
