import CheckedImage from "@assets/images/checked.svg";
import UnlockedImage from "@assets/images/unlocked.svg";
import { Container, SafeAreaContainer } from "@assets/styles";
import Advertisement from "@components/advertisement";
import Heading from "@components/header";
import { translate } from "@config/i18n.config";
import { HTTPConstants } from "@constants/http.constants";
import RouteConstants from "@constants/route.constants";
import ResetPasswordForm from "@forms/reset-password";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PasswordService } from "@services/password.service";
import { AxiosResponse } from "axios";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import ResetPasswordYupFormSchema from "./schema.yup";
import { ImageSection, Section } from "./styles";
import { ResetPasswordFormData } from "./types";

export default function ResetPasswordScreen({ route }): JSX.Element {
  const passwordService: PasswordService = PasswordService.Instance;

  const token: string | undefined = route?.params?.token;
  const email: string | undefined = route?.params?.email;

  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);

  const navigation: NavigationProp<any> = useNavigation();

  /**
   * @param {ResetPasswordFormData} data
   * @returns {Promise<void>}
   */
  const resetPassword = async (data: ResetPasswordFormData): Promise<void> => {
    const requestResponse: AxiosResponse<any> =
      await passwordService.resetPassword(data);

    if (requestResponse.status === HTTPConstants.OK) {
      setIsPasswordChanged(true);
    }
  };

  /**
   * @param {ResetPasswordFormData} data
   * @returns {Promise<void>}
   */
  const handleSubmit = async (data: ResetPasswordFormData): Promise<void> => {
    try {
      await resetPassword(data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @returns {void}
   */
  function onBackPress(): void {
    navigation.navigate(RouteConstants.SIGN_IN);
  }

  /**
   * @returns {void}
   */
  function onAdvertisementPress(): void {
    navigation.navigate(RouteConstants.SIGN_IN);
  }

  /**
   * @returns {void}
   */
  function onNoDataAdvertisementPress(): void {
    navigation.navigate(RouteConstants.FORGOT_PASSWORD);
  }

  return (
    <>
      <SafeAreaContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <Heading
              onBackPress={onBackPress}
              title={translate("heading.reset_password")}
              subtitle={translate("heading.now_you_can_update_your_password")}
            />

            <ImageSection>
              {isPasswordChanged ? <CheckedImage /> : <UnlockedImage />}
            </ImageSection>

            <Section>
              {token && email ? (
                isPasswordChanged ? (
                  <Advertisement
                    title={translate("heading.your_password_was_changed")}
                    subtitle={translate(
                      "heading.please_try_to_sign_in_and_collaborate_with_our_community"
                    )}
                    buttonTitle={translate("button.sign_in")}
                    onButtonPress={onAdvertisementPress}
                  />
                ) : (
                  <Formik
                    initialValues={{
                      token: token ?? "",
                      email: email ?? "",
                      password: "",
                      password_confirmation: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={ResetPasswordYupFormSchema}
                    validateOnChange={false}
                    validateOnBlur
                  >
                    {(props: FormikProps<ResetPasswordFormData>) => (
                      <ResetPasswordForm props={props} />
                    )}
                  </Formik>
                )
              ) : (
                <Advertisement
                  title={translate("heading.no_data_found")}
                  subtitle={translate(
                    "heading.please_try_to_get_a_reset_link_again"
                  )}
                  buttonTitle={translate("button.forgot_my_password")}
                  onButtonPress={onNoDataAdvertisementPress}
                />
              )}
            </Section>
          </Container>
        </ScrollView>
      </SafeAreaContainer>
    </>
  );
}
