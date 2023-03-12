import { Container, SafeAreaContainer } from "@assets/styles";
import SocialButtons from "@components/buttons/social";
import Heading from "@components/header";
import TermsAndConditions from "@components/terms-and-conditions";
import { translate } from "@config/i18n.config";
import SignUpForm from "@forms/sign-up";
import { useAuth } from "@hooks/use-auth.hook";
import { Formik, FormikProps } from "formik";
import React from "react";
import { ScrollView } from "react-native";
import SignUpYupFormSchema from "./schema.yup";
import { Section } from "./styles";
import { SignUpFormData } from "./types";

export default function SignUpScreen(): JSX.Element {
  const { signUp } = useAuth();

  /**
   * @param {SignUpFormData} data
   * @returns {Promise<void>}
   */
  const handleSubmit = async (data: SignUpFormData): Promise<void> => {
    try {
      await signUp(data);
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
              subtitle={translate("heading.join_our_community")}
            />

            <Section>
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  phone_calling_code: "",
                  phone_number: "",
                  password: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={SignUpYupFormSchema}
                validateOnChange={false}
                validateOnBlur
              >
                {(props: FormikProps<SignUpFormData>) => (
                  <SignUpForm props={props} />
                )}
              </Formik>
            </Section>

            <Section>
              <SocialButtons />
            </Section>

            <Section>
              <TermsAndConditions />
            </Section>
          </Container>
        </ScrollView>
      </SafeAreaContainer>
    </>
  );
}
