import { SafeAreaContainer } from "@assets/styles";
import BackHandlerProvider from "@components/back-handler";
import RouteConstants from "@constants/route.constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import { StyledImage, Container, Title } from "./styles";
import DogWalkerImage from "@assets/images/pet-walking.png";
import TabView from "@components/tab-view";
import { translate } from "@config/i18n.config";
import AboutTabView from "@components/tab-views/show-pet/about";
import AdditionalTabView from "@components/tab-views/show-pet/additional";
import LocationsTabView from "@components/tab-views/show-pet/locations";
import { TabViewItemOptions } from "@components/tab-view/types";

export default function ShowPetScreen(): JSX.Element {
  const [selectedView, setSelectedView] = useState<number>(1);

  const navigation: NavigationProp<any> = useNavigation();

  /**
   * @returns void
   */
  function onAdoptPetPress(): void {
    //
  }

  /**
   * @returns void
   */
  function onAddPetLocationPress(): void {
    //
  }

  const tabViewOptions: Array<TabViewItemOptions> = [
    {
      id: 1,
      title: translate("heading.about"),
      component: <AboutTabView onPress={onAdoptPetPress} />,
    },
    {
      id: 2,
      title: translate("heading.locations"),
      component: <LocationsTabView onPress={onAddPetLocationPress} />,
    },
    {
      id: 3,
      title: translate("heading.additional"),
      component: <AdditionalTabView onPress={onAdoptPetPress} />,
    },
  ];

  /**
   * @returns {void}
   */
  function onPress(value: number): void {
    setSelectedView(value);
  }

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
            <StyledImage source={DogWalkerImage} />

            <Container>
              <Title>Totó</Title>

              <TabView
                views={tabViewOptions}
                selectedView={selectedView}
                onPress={onPress}
              />
            </Container>
          </ScrollView>
        </SafeAreaContainer>
      </BackHandlerProvider>
    </>
  );
}
