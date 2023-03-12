import { Container, SafeAreaContainer } from "@assets/styles";
import BackHandlerProvider from "@components/back-handler";
import Heading from "@components/header";
import { translate } from "@config/i18n.config";
import RouteConstants from "@constants/route.constants";
import ProfileForm from "@forms/profile";
import { useAuth } from "@hooks/use-auth.hook";
import { useSession } from "@hooks/use-session.hook";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik, FormikProps } from "formik";
import React from "react";
import { ScrollView } from "react-native";
import ProfileYupFormSchema from "./schema.yup";
import { Section } from "./styles";
import { ProfileFormData } from "./types";

export default function ProfileScreen(): JSX.Element {
  const { user } = useSession();
  const { updateProfile } = useAuth();

  const navigation: NavigationProp<any> = useNavigation();

  /**
   * @param {ProfileFormData} data
   * @returns {Promise<void>}
   */
  const handleSubmit = async (data: ProfileFormData): Promise<void> => {
    try {
      const payload: any = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        phone_calling_code: data.phone_calling_code,
      };

      await updateProfile(payload);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @returns {boolean}
   */
  function onBackPress(): boolean {
    navigation.navigate(RouteConstants.ACCOUNT);

    return true;
  }

  return (
    <>
      <BackHandlerProvider onBackPress={onBackPress}>
        <SafeAreaContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
              <Heading
                onBackPress={onBackPress}
                title={translate("heading.profile")}
                subtitle={
                  !!user?.first_name
                    ? user?.first_name
                    : translate("heading.view_your_profile_here")
                }
              />

              <Section>
                <Formik
                  initialValues={{
                    first_name: user?.first_name ?? "",
                    last_name: user?.last_name ?? "",
                    email: user?.email ?? "",
                    phone_number: user?.phone_number ?? "",
                    phone_calling_code: user?.phone_calling_code ?? "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={ProfileYupFormSchema}
                  validateOnChange={false}
                  validateOnBlur
                >
                  {(props: FormikProps<ProfileFormData>) => (
                    <ProfileForm props={props} />
                  )}
                </Formik>
              </Section>
            </Container>
          </ScrollView>
        </SafeAreaContainer>
      </BackHandlerProvider>
    </>
  );
}
