import { Container, SafeAreaContainer } from "@assets/styles";
import BackHandlerProvider from "@components/back-handler";
import Heading from "@components/header";
import { translate } from "@config/i18n.config";
import { HTTPConstants } from "@constants/http.constants";
import RouteConstants from "@constants/route.constants";
import UpdatePasswordForm from "@forms/update-password";
import { ToastProvider } from "@providers/toast.provider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileService } from "@services/profile.service";
import { AxiosResponse } from "axios";
import { Formik, FormikProps } from "formik";
import React from "react";
import { ScrollView } from "react-native";
import UpdatePasswordYupFormSchema from "./schema.yup";
import { Section } from "./styles";
import { UpdatePasswordFormData } from "./types";

export default function UpdatePasswordScreen(): JSX.Element {
  const profileService: ProfileService = ProfileService.Instance;
  const toastProvider: ToastProvider = ToastProvider.Instance;

  const navigation: NavigationProp<any> = useNavigation();

  /**
   * @param {UpdatePasswordFormData} data
   * @returns {Promise<void>}
   */
  async function updatePassword(data: UpdatePasswordFormData): Promise<void> {
    const requestResponse: AxiosResponse<any> =
      await profileService.updatePassword(data);

    if (requestResponse.status === HTTPConstants.OK) {
      toastProvider.success({
        title: translate("validation.password_successfully_updated"),
      });
    }
  }

  /**
   * @param {UpdatePasswordFormData} data
   * @returns {Promise<void>}
   */
  const handleSubmit = async (data: UpdatePasswordFormData): Promise<void> => {
    try {
      await updatePassword(data);
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
                title={translate("heading.update_password")}
                subtitle={translate("heading.your_data_with_us")}
              />

              <Section>
                <Formik
                  initialValues={{
                    current_password: "",
                    new_password: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={UpdatePasswordYupFormSchema}
                  validateOnChange={false}
                  validateOnBlur
                >
                  {(props: FormikProps<UpdatePasswordFormData>) => (
                    <UpdatePasswordForm props={props} />
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
