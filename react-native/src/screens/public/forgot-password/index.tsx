import CheckedImage from "@assets/images/checked.svg";
import LockedImage from "@assets/images/locked.svg";
import { Container, SafeAreaContainer } from "@assets/styles";
import Advertisement from "@components/advertisement";
import Heading from "@components/header";
import { translate } from "@config/i18n.config";
import { HTTPConstants } from "@constants/http.constants";
import RouteConstants from "@constants/route.constants";
import ForgotPasswordForm from "@forms/forgot-password";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PasswordService } from "@services/password.service";
import { AxiosResponse } from "axios";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import ForgotPasswordYupFormSchema from "./schema.yup";
import { ImageSection, Section } from "./styles";
import { ForgotPasswordFormData } from "./types";

export default function ForgotPasswordScreen(): JSX.Element {
  const passwordService: PasswordService = PasswordService.Instance;

  const navigation: NavigationProp<any> = useNavigation();

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  /**
   * @param {ForgotPasswordFormData} data
   * @returns {Promise<void>}
   */
  const forgotPassword = async (
    data: ForgotPasswordFormData
  ): Promise<void> => {
    const requestResponse: AxiosResponse<any> =
      await passwordService.forgotPassword(data);

    if (requestResponse.status === HTTPConstants.OK) {
      setIsEmailSent(true);
    }
  };

  /**
   * @param {ForgotPasswordFormData} data
   * @returns {Promise<void>}
   */
  const handleSubmit = async (data: ForgotPasswordFormData): Promise<void> => {
    try {
      await forgotPassword(data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @returns {void}
   */
  function onBackPress(): void {
    navigation.goBack();
  }

  /**
   * @returns {void}
   */
  function onAdvertisementPress(): void {
    navigation.navigate(RouteConstants.SIGN_IN);
  }

  return (
    <>
      <SafeAreaContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <Heading
              onBackPress={onBackPress}
              title={translate("heading.forgot_password")}
              subtitle={translate("heading.we_will_send_an_email_for_you")}
            />

            <ImageSection>
              {isEmailSent ? <CheckedImage /> : <LockedImage />}
            </ImageSection>

            <Section>
              {isEmailSent ? (
                <Advertisement
                  title="The email was sent"
                  subtitle="Please, try the link we sent in your email to update your password"
                  buttonTitle={translate("button.sign_in")}
                  onButtonPress={onAdvertisementPress}
                />
              ) : (
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={ForgotPasswordYupFormSchema}
                  validateOnChange={false}
                  validateOnBlur
                >
                  {(props: FormikProps<ForgotPasswordFormData>) => (
                    <ForgotPasswordForm props={props} />
                  )}
                </Formik>
              )}
            </Section>
          </Container>
        </ScrollView>
      </SafeAreaContainer>
    </>
  );
}
