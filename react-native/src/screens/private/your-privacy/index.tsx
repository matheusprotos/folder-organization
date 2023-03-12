import { Container, SafeAreaContainer } from "@assets/styles";
import BackHandlerProvider from "@components/back-handler";
import DangerButton from "@components/buttons/danger";
import DestroyDecision from "@components/decisions/destroy";
import Heading from "@components/header";
import PrivacyItem from "@components/items/privacy";
import WithChildrenModal from "@components/modals/with-children";
import { translate } from "@config/i18n.config";
import { HTTPConstants } from "@constants/http.constants";
import RouteConstants from "@constants/route.constants";
import { useAuth } from "@hooks/use-auth.hook";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileService } from "@services/profile.service";
import { AxiosResponse } from "axios";
import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import { Section } from "./styles";

export default function YourPrivacyScreen(): JSX.Element {
  const profileService: ProfileService = ProfileService.Instance;

  const { signOut } = useAuth();

  const navigation: NavigationProp<any> = useNavigation();

  const deactivateAccountModalizeRef = useRef<Modalize>(null);

  /**
   * @returns {void}
   */
  const openDeactivateAccountModalize = (): void => {
    deactivateAccountModalizeRef.current?.open();
  };

  /**
   * @returns {void}
   */
  const closeDeactivateAccountModalize = (): void => {
    deactivateAccountModalizeRef.current?.close();
  };

  /**
   * @returns {boolean}
   */
  function onBackPress(): boolean {
    navigation.navigate(RouteConstants.ACCOUNT);

    return true;
  }

  /**
   * @returns {void}
   */
  function onDeactivateAccountPress(): void {
    openDeactivateAccountModalize();
  }

  /**
   * @returns {Promise<void>}
   */
  async function onPrimaryButtonPress(): Promise<void> {
    const requestResponse: AxiosResponse<any> =
      await profileService.deactivate();

    if (requestResponse.status === HTTPConstants.NO_CONTENT) {
      await signOut();
    }

    closeDeactivateAccountModalize();
  }

  /**
   * @returns {void}
   */
  function onSecondaryButtonPress(): void {
    closeDeactivateAccountModalize();
  }

  return (
    <>
      <BackHandlerProvider onBackPress={onBackPress}>
        <SafeAreaContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
              <Heading
                onBackPress={onBackPress}
                title={translate("heading.your_privacy")}
                subtitle={translate("heading.your_data_with_us")}
              />

              <Section>
                <PrivacyItem
                  title={"We have nothing to show"}
                  subtitle={
                    "Please, try to add a new pet and share with all people around the world"
                  }
                />

                <PrivacyItem
                  title={"We have nothing to show"}
                  subtitle={
                    "Please, try to add a new pet and share with all people around the world"
                  }
                />

                <PrivacyItem
                  title={"We have nothing to show"}
                  subtitle={
                    "Please, try to add a new pet and share with all people around the world"
                  }
                />
              </Section>

              <Section>
                <DangerButton
                  title={translate("button.deactivate_account")}
                  onPress={onDeactivateAccountPress}
                />
              </Section>
            </Container>
          </ScrollView>

          <WithChildrenModal
            ref={deactivateAccountModalizeRef}
            children={
              <DestroyDecision
                title={translate("heading.deactivate_account")}
                subtitle={translate(
                  "heading.you_are_about_to_deactivate_your_account_after_thirty_days_without_signing_in_again_your_account_will_be_deleted"
                )}
                primaryButtonTitle={translate("button.confirm")}
                secondaryButtonTitle={translate("button.cancel")}
                onPrimaryButtonPress={onPrimaryButtonPress}
                onSecondaryButtonPress={onSecondaryButtonPress}
              />
            }
          />
        </SafeAreaContainer>
      </BackHandlerProvider>
    </>
  );
}
