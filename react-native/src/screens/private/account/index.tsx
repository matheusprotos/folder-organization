import { Container, SafeAreaContainer } from "@assets/styles";
import PrimaryButton from "@components/buttons/primary";
import Heading from "@components/header";
import MenuItem from "@components/items/menu";
import { translate } from "@config/i18n.config";
import RouteConstants from "@constants/route.constants";
import { UrlConstants } from "@constants/url.constants";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks/use-auth.hook";
import { LinkingProvider } from "@providers/linking.provider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppThemeOptions } from "@themes/types";
import React from "react";
import { ScrollView } from "react-native";
import { useTheme } from "styled-components";
import { Section } from "./styles";
import { MenuOption } from "./types";

export default function AccountScreen(): JSX.Element {
  const linkingProvider: LinkingProvider = LinkingProvider.Instance;

  const { signOut } = useAuth();

  const theme: AppThemeOptions = useTheme();
  const navigation: NavigationProp<any> = useNavigation();

  const menuOptions: Array<MenuOption> = [
    {
      id: 1,
      title: translate("button.my_pets"),
      iconName: "paw-outline",
      onPress: onMyPetsPress,
    },
    {
      id: 2,
      title: translate("button.update_password"),
      iconName: "lock-open-outline",
      onPress: onUpdatePasswordPress,
    },
    {
      id: 3,
      title: translate("button.your_privacy"),
      iconName: "finger-print-outline",
      onPress: onYourPrivacyPress,
    },
    {
      id: 4,
      title: translate("button.terms_of_use"),
      iconName: "document-text-outline",
      onPress: onTermsOfUsePress,
    },
    {
      id: 5,
      title: translate("button.sign_out"),
      iconName: "log-out-outline",
      onPress: onSignOutPress,
    },
  ];

  /**
   * @returns {void}
   */
  function onMyPetsPress(): void {
    navigation.navigate(RouteConstants.PETS);
  }

  /**
   * @returns {void}
   */
  function onUpdatePasswordPress(): void {
    navigation.navigate(RouteConstants.UPDATE_PASSWORD);
  }

  /**
   * @returns {void}
   */
  function onYourPrivacyPress(): void {
    navigation.navigate(RouteConstants.YOUR_PRIVACY);
  }

  /**
   * @returns {void}
   */
  function onTermsOfUsePress(): void {
    linkingProvider.openURL(UrlConstants.MAPPETS_WEBSITE_PRIVACY);
  }

  /**
   * @returns {Promise<void>}
   */
  async function onSignOutPress(): Promise<void> {
    await signOut();
  }

  /**
   * @returns {void}
   */
  function onViewFullProfilePress(): void {
    navigation.navigate(RouteConstants.PROFILE);
  }

  return (
    <>
      <SafeAreaContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <Heading
              title={translate("heading.account")}
              subtitle={translate("heading.your_data_with_us")}
            />

            <Section>
              {menuOptions.map((menuOption: MenuOption) => (
                <MenuItem
                  key={menuOption.id}
                  title={menuOption.title}
                  icon={
                    <Ionicons
                      name={menuOption.iconName}
                      size={22}
                      color={theme.colors.primaryTitle}
                    />
                  }
                  onPress={menuOption.onPress}
                />
              ))}
            </Section>

            <Section>
              <PrimaryButton
                title={translate("button.view_full_profile")}
                onPress={onViewFullProfilePress}
              />
            </Section>
          </Container>
        </ScrollView>
      </SafeAreaContainer>
    </>
  );
}
