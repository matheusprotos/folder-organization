import CatPlayingImage from "@assets/images/cat-playing.gif";
import { SafeAreaContainer } from "@assets/styles";
import Advertisement from "@components/advertisement";
import BackHandlerProvider from "@components/back-handler";
import PrimaryButton from "@components/buttons/primary";
import Heading from "@components/header";
import PetItem from "@components/items/pet";
import { translate } from "@config/i18n.config";
import { HTTPConstants } from "@constants/http.constants";
import RouteConstants from "@constants/route.constants";
import { Pet, PetConvert } from "@entities/pet.entity";
import { ObjectHelper } from "@helpers/object.helper";
import { PetProvider } from "@providers/pet.provider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PetService } from "@services/pet.service";
import { FlashList } from "@shopify/flash-list";
import { AxiosResponse } from "axios";
import React, { useCallback, useState } from "react";
import { Image, RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import useAsyncEffect from "use-async-effect";
import {
  Centered,
  Container,
  Footer,
  Header,
  ImageSection,
  Section,
} from "./styles";

export default function PetsScreen(): JSX.Element | null {
  const petService: PetService = PetService.Instance;
  const petProvider: PetProvider = PetProvider.Instance;

  const [pets, setPets] = useState<Array<Pet>>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showRefreshingIndicator, setShowRefreshingIndicator] =
    useState<boolean>(false);
  const [isPetsBusy, setIsPetsBusy] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  const limit: number = 6;

  const navigation: NavigationProp<any> = useNavigation();

  /**
   * @returns {Promise<void>}
   */
  const loadPets = useCallback(
    async (receivedLimit: number, receivedPage: number): Promise<void> => {
      if (page === 1) {
        const loadedPets: string | null = await petProvider.get(receivedPage);

        if (loadedPets) {
          const parsedPets: Array<Pet> =
            ObjectHelper.tryParseJSONObject(loadedPets);

          setPets(parsedPets);
          setPage(receivedPage + 1);
        } else {
          await searchPetsOnWebService(receivedLimit, receivedPage);
        }
      } else {
        await searchPetsOnWebService(receivedLimit, receivedPage);
      }
    },
    []
  );

  /**
   * @param receivedLimit
   * @param receivedPage
   * @returns {Promise<void>}
   */
  const searchPetsOnWebService = useCallback(
    async (receivedLimit: number, receivedPage: number): Promise<void> => {
      const requestResponse: AxiosResponse<any> = await petService.getPaginated(
        receivedLimit,
        receivedPage
      );

      if (!requestResponse.data.data) return;

      if (requestResponse.status === HTTPConstants.OK) {
        const newPets: Array<Pet> = requestResponse.data.map((pet: Pet) =>
          PetConvert.toPet(JSON.stringify(pet))
        );

        if (receivedPage === 1) {
          await petProvider.create(newPets, receivedPage);

          setPets(newPets);
        } else {
          setPets([...pets, ...newPets]);
        }

        setLastPage(requestResponse.data.last_page);
        setPage(receivedPage + 1);
      }
    },
    []
  );

  /**
   * @returns {Promise<void>}
   */
  async function loadPetsOnStartReaching(
    receivedLimit: number,
    receivedPage: number
  ): Promise<void> {
    setIsPetsBusy(true);

    await loadPets(receivedLimit, receivedPage);

    setIsPetsBusy(false);
  }

  /**
   * @returns {Promise<void>}
   */
  async function loadPetsOnRefreshing(
    receivedLimit: number,
    receivedPage: number
  ): Promise<void> {
    setShowRefreshingIndicator(true);
    setIsRefreshing(true);
    setIsPetsBusy(true);

    await loadPets(receivedLimit, receivedPage);

    setIsRefreshing(false);
    setShowRefreshingIndicator(false);
    setIsPetsBusy(false);
  }

  /**
   * @returns {Promise<void>}
   */
  async function loadPetsOnEndReached(
    receivedLimit: number,
    receivedPage: number
  ): Promise<void> {
    setIsLoading(true);

    await loadPets(receivedLimit, receivedPage);

    setIsLoading(false);
  }

  /**
   * @returns {Promise<void>}
   */
  const onEndReached = async (): Promise<void> => {
    if (page <= lastPage) {
      if (isLoading) return;

      await loadPetsOnEndReached(limit, page);
    }
  };

  /**
   * @returns {Promise<void>}
   */
  const onRefresh = useCallback(async (): Promise<void> => {
    await loadPetsOnRefreshing(limit, 1);
  }, [isRefreshing]);

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
    /**
     * @returns {void}
     */
    function onPress(): void {
      navigation.navigate(RouteConstants.SHOW_PET, { pet: item });
    }

    return (
      <Container>
        <PetItem pet={item} onPress={onPress} />
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
          title={translate("heading.pets")}
          subtitle={translate("heading.view_your_pets_here")}
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

  /**
   * @returns {JSX.Element}
   */
  const renderEmpty = (): JSX.Element => {
    return (
      <>
        <Centered>
          {isPetsBusy ? (
            <ActivityIndicator size={"small"} />
          ) : (
            pets.length === 0 && (
              <>
                <ImageSection>
                  <Image
                    source={CatPlayingImage}
                    resizeMode="contain"
                    style={{
                      height: 250,
                    }}
                  />
                </ImageSection>

                <Section>
                  <Advertisement
                    title={translate("heading.we_did_not_find_anything")}
                    subtitle={translate(
                      "heading.add_a_pet_to_start_contributing_to_the_community"
                    )}
                    buttonTitle={`+ ${translate("button.new_pet")}`}
                    onButtonPress={onCreatePetPress}
                  />
                </Section>
              </>
            )
          )}
        </Centered>
      </>
    );
  };

  /**
   * @returns {JSX.Element}
   */
  const renderRefreshingControl = (): JSX.Element => {
    return (
      <RefreshControl
        refreshing={showRefreshingIndicator}
        onRefresh={onRefresh}
      />
    );
  };

  /**
   * @returns {boolean}
   */
  function onBackPress(): boolean {
    return true;
  }

  /**
   * @returns {Promise<void>}
   */
  useAsyncEffect(async (): Promise<void> => {
    try {
      await loadPetsOnStartReaching(limit, page);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <BackHandlerProvider onBackPress={onBackPress}>
        <SafeAreaContainer>
          <FlashList
            data={pets}
            keyExtractor={(item: Pet) => item.id.toString()}
            refreshing={isRefreshing}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            estimatedItemSize={410}
            onEndReached={onEndReached}
            renderItem={renderItem}
            refreshControl={renderRefreshingControl()}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </SafeAreaContainer>
      </BackHandlerProvider>
    </>
  );
}
