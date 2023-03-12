import { Container, SafeAreaContainer } from "@assets/styles";
import SocialButtons from "@components/buttons/social";
import Heading from "@components/header";
import TermsAndConditions from "@components/terms-and-conditions";
import { translate } from "@config/i18n.config";
import { EnvironmentConstants } from "@constants/environment.constants";
import SignInForm from "@forms/sign-in";
import { useAuth } from "@hooks/use-auth.hook";
import { Formik, FormikProps } from "formik";
import React from "react";
import { ScrollView } from "react-native";
import SignInYupFormSchema from "./schema.yup";
import { Section } from "./styles";
import { SignInFormData } from "./types";

export default function SignInScreen(): JSX.Element {
  const { signIn } = useAuth();

  const isSocialSignInEnabled: boolean =
    EnvironmentConstants.IS_APPLE_SOCIAL_SIGN_IN_ENABLED ||
    EnvironmentConstants.IS_APPLE_SOCIAL_SIGN_IN_ENABLED ||
    EnvironmentConstants.IS_GOOGLE_SOCIAL_SIGN_IN_ENABLED;

  /**
   * @param {SignInFormData} data
   * @returns {Promise<void>}
   */
  const handleSubmit = async (data: SignInFormData): Promise<void> => {
    try {
      await signIn(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <Heading
              title={translate("heading.lets_start_here")}
              subtitle={translate("heading.fill_your_details_to_begin")}
            />

            <Section>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={SignInYupFormSchema}
                validateOnChange={false}
                validateOnBlur
              >
                {(props: FormikProps<SignInFormData>) => (
                  <SignInForm props={props} />
                )}
              </Formik>
            </Section>

            {isSocialSignInEnabled && (
              <Section>
                <SocialButtons />
              </Section>
            )}

            <Section>
              <TermsAndConditions />
            </Section>
          </Container>
        </ScrollView>
      </SafeAreaContainer>
    </>
  );
}
