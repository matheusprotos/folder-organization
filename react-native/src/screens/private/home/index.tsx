import { SafeAreaContainer } from "@assets/styles";
import PrimaryButton from "@components/buttons/primary";
import Heading from "@components/header";
import PetItem from "@components/items/pet";
import { translate } from "@config/i18n.config";
import RouteConstants from "@constants/route.constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";
import { HomeConstants } from "./constants";
import { Container, Footer, Header } from "./styles";

export default function HomeScreen(): JSX.Element {
  const navigation: NavigationProp<any> = useNavigation();

  /**
   * @returns {void}
   */
  function onCreatePetPress(): void {
    navigation.navigate(RouteConstants.CREATE_PET);
  }

  /**
   * @param {Pet} pet
   * @returns {JSX.Element}
   */
  const renderItem = ({ item }: any): JSX.Element => {
    return (
      <Container>
        <PetItem pet={item} />
      </Container>
    );
  };

  /**
   * @returns {JSX.Element}
   */
  const renderHeader = (): JSX.Element => {
    return (
      <Header>
        <Heading
          title={translate("heading.home")}
          subtitle={translate("heading.explore_more_with_mappets")}
          action={
            <PrimaryButton
              title={`+ ${translate("button.new_pet")}`}
              onPress={onCreatePetPress}
            />
          }
        />
      </Header>
    );
  };

  /**
   * @returns {JSX.Element}
   */
  const renderFooter = (): JSX.Element => {
    return <Footer />;
  };

  return (
    <>
      <SafeAreaContainer>
        <FlatList
          data={HomeConstants.PETS}
          keyExtractor={(item: any) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaContainer>
    </>
  );
}
