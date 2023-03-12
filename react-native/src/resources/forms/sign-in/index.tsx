import ActionButtonsSection from "@components/buttons/action-section";
import PrimaryButton from "@components/buttons/primary";
import TextInput from "@components/inputs/text";
import { translate } from "@config/i18n.config";
import { InputConstants } from "@constants/input.constants";
import RouteConstants from "@constants/route.constants";
import { InputHelper } from "@helpers/input.helper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Spacer } from "./styles";
import { SignInFormOptions } from "./types";

const SignInForm = ({ props }: SignInFormOptions): JSX.Element => {
  const navigation: NavigationProp<any> = useNavigation();

  /**
   * @returns {void}
   */
  function onActionLeftButtonPress(): void {
    navigation.navigate(RouteConstants.SIGN_UP);
  }

  /**
   * @returns {void}
   */
  function onActionRightButtonPress(): void {
    navigation.navigate(RouteConstants.FORGOT_PASSWORD);
  }

  return (
    <>
      <Spacer>
        <TextInput
          name={InputConstants.EMAIL}
          props={props}
          options={{
            placeholder: translate("placeholder.email"),
            autoCapitalize: "none",
            keyboardType: "email-address",
            textContentType: "emailAddress",
            autoCorrect: false,
            autoCompleteType: "email",
            value: props.values[InputConstants.EMAIL],
            onChangeText: (text) =>
              props.setFieldValue(
                InputConstants.EMAIL,
                InputHelper.trimAndTransformToLowerCase(text)
              ),
          }}
          label={translate("input.email")}
        />
      </Spacer>

      <Spacer>
        <TextInput
          name={InputConstants.PASSWORD}
          props={props}
          options={{
            placeholder: translate("placeholder.password"),
            autoCapitalize: "none",
            value: props.values[InputConstants.PASSWORD],
            onChangeText: props.handleChange(InputConstants.PASSWORD),
            secureTextEntry: true,
          }}
          label={translate("input.password")}
        />
      </Spacer>

      <Spacer>
        <ActionButtonsSection
          leftButtonTitle={translate("button.create_an_account")}
          onLeftButtonPress={onActionLeftButtonPress}
          rightButtonTitle={translate("button.forgot_my_password")}
          onRightButtonPress={onActionRightButtonPress}
        />
      </Spacer>

      <Spacer>
        <PrimaryButton
          title={translate("button.sign_in")}
          onPress={() => props.submitForm()}
          isLoading={props.isSubmitting}
          disabled={props.isSubmitting}
        />
      </Spacer>
    </>
  );
};

export default SignInForm;
