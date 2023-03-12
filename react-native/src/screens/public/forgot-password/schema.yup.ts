import YupSettings from "@config/yup.config";

const ForgotPasswordYupFormSchema = YupSettings.object().shape({
  email: YupSettings.string().email().required(),
});

export default ForgotPasswordYupFormSchema;
