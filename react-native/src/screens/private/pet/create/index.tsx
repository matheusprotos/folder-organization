import { Container, SafeAreaContainer } from "@assets/styles";
import BackHandlerProvider from "@components/back-handler";
import Heading from "@components/header";
import { translate } from "@config/i18n.config";
import { HTTPConstants } from "@constants/http.constants";
import { RestAPIConstants } from "@constants/rest-api.constants";
import RouteConstants from "@constants/route.constants";
import { Color } from "@entities/color.entity";
import { Gender } from "@entities/gender.entity";
import { Size } from "@entities/size.entity";
import { Specie } from "@entities/specie.entity";
import PetForm from "@forms/pet";
import { RestAPIProvider } from "@providers/rest-api.provider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ColorService } from "@services/color.service";
import { GenderService } from "@services/gender.service";
import { PetService } from "@services/pet.service";
import { SizeService } from "@services/size.service";
import { SpecieService } from "@services/specie.service";
import { AppThemeOptions } from "@themes/types";
import { AxiosResponse } from "axios";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { useTheme } from "styled-components";
import useAsyncEffect from "use-async-effect";
import CreatePetYupFormSchema from "./schema.yup";
import { LoadingContainer } from "./styles";
import { CreatePetFormData } from "./types";

export default function CreatePetScreen(): JSX.Element {
  const petService: PetService = PetService.Instance;
  const genderService: GenderService = GenderService.Instance;
  const colorService: ColorService = ColorService.Instance;
  const specieService: SpecieService = SpecieService.Instance;
  const sizeService: SizeService = SizeService.Instance;

  const navigation: NavigationProp<any> = useNavigation();
  const theme: AppThemeOptions = useTheme();

  const [isBusy, setIsBusy] = useState<boolean>(true);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  /**
   * @param {CreatePetFormData} data
   * @returns {Promise<void>}
   */
  const handleSubmit = async (data: CreatePetFormData): Promise<void> => {
    try {
      const petId: string | void = await sendPetImages(data);

      if (petId) {
        console.log(`Pet criado: ${petId}`);

        await Promise.all([
          sendPetLocation(petId, data),
          sendPetInformation(petId, data),
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @return {Promise<void>} Carregamento das cores
   */
  const loadColors = async (): Promise<void> => {
    const colorsResponse: AxiosResponse = await colorService.get();

    if (colorsResponse.status === HTTPConstants.OK) {
      setColors(colorsResponse.data.results);
    }
  };

  /**
   * @return {Promise<void>} Carregamento dos gêneros
   */
  const loadGenders = async (): Promise<void> => {
    const gendersResponse: AxiosResponse = await genderService.get();

    if (gendersResponse.status === HTTPConstants.OK) {
      setGenders(gendersResponse.data.results);
    }
  };

  /**
   * @return {Promise<void>} Carregamento dos tamanhos
   */
  const loadSizes = async (): Promise<void> => {
    const sizesResponse: AxiosResponse = await sizeService.get();

    if (sizesResponse.status === HTTPConstants.OK) {
      setSizes(sizesResponse.data.results);
    }
  };

  /**
   * @return {Promise<void>} Carregamento das espécies
   */
  const loadSpecies = async (): Promise<void> => {
    const speciesResponse: AxiosResponse = await specieService.get();

    if (speciesResponse.status === HTTPConstants.OK) {
      setSpecies(speciesResponse.data.results);
    }
  };

  /**
   * @returns {boolean}
   */
  function onBackPress(): boolean {
    if (currentStep === 1) {
      navigation.navigate(RouteConstants.PETS);
    } else {
      setCurrentStep((currentStep: number) => currentStep - 1);
    }

    return true;
  }

  /**
   * @param {CreatePetFormData} data Dados do pet
   * @returns {Promise<string | void>} Id do pet criado
   */
  const sendPetImages = async ({
    images,
  }: CreatePetFormData): Promise<string | void> => {
    images = images.map((uri: string) => {
      const extension = uri.split(".").pop();

      return {
        uri,
        type: RestAPIConstants.CONTENT_TYPE_MULTIPART,
        name: `${new Date().getTime()}.${extension}`,
      };
    });

    const sendPetImagesResponse: AxiosResponse = await petService.createImages({
      images,
    });

    if (sendPetImagesResponse.status === HTTPConstants.CREATED) {
      return sendPetImagesResponse.data.pet.id;
    }
  };

  /**
   * @param {string} petId Id do pet que será descrito
   * @param {CreatePetFormData} data Dados do pet
   * @returns {Promise<AxiosResponse>} Resultado da criação da descrição
   */
  const sendPetInformation = async (
    petId: string,
    {
      description,
      agressive,
      name,
      age,
      size,
      color,
      gender,
      species,
    }: CreatePetFormData
  ): Promise<AxiosResponse> => {
    return petService.createInformation(petId, {
      description,
      agressive,
      name,
      age,
      size,
      color,
      gender,
      species,
    });
  };

  /**
   * @param {string} petId Id do pet que está na localização
   * @param {CreatePetFormData} data Dados do pet
   * @returns {Promise<AxiosResponse>} Resultado da criação da localização
   */
  const sendPetLocation = async (
    petId: string,
    { location, number, complement, reference_place }: CreatePetFormData
  ): Promise<AxiosResponse> => {
    const { latitude, longitude } = location;

    return petService.createLocation(petId, {
      latitude: +latitude.toFixed(5),
      longitude: +longitude.toFixed(5),
      number,
      complement,
      reference_place,
    });
  };

  useAsyncEffect(async () => {
    try {
      await Promise.all([
        loadSizes(),
        loadColors(),
        loadGenders(),
        loadSpecies(),
      ]);

      setIsBusy(false);
    } catch (error) {
      console.error(error);

      setIsBusy(false);
    }
  }, []);

  return (
    <>
      <BackHandlerProvider onBackPress={onBackPress}>
        <SafeAreaContainer>
          <Formik
            initialValues={{
              images: [],
              description: "",
              size: 1,
              agressive: false,
              name: "",
              color: 1,
              gender: 1,
              age: 1,
              species: "",
              location: undefined,
              number: "",
              complement: "",
              reference_place: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={CreatePetYupFormSchema}
            validateOnChange={false}
            validateOnBlur
          >
            {(props: FormikProps<CreatePetFormData>) => (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Container>
                    <Heading
                      onBackPress={onBackPress}
                      title={translate("heading.create_pet")}
                      subtitle={translate(
                        "heading.tell_us_something_about_your_pet"
                      )}
                    />

                    {isBusy ? (
                      <LoadingContainer>
                        <ActivityIndicator
                          color={theme.colors.buttonPrimaryBackground}
                          size="large"
                        />
                      </LoadingContainer>
                    ) : (
                      <PetForm
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        props={props}
                        genders={genders}
                        species={species}
                        colors={colors}
                        sizes={sizes}
                        isLoading={props.isSubmitting}
                        handleSubmit={props.handleSubmit}
                      />
                    )}
                  </Container>
                </ScrollView>
              </>
            )}
          </Formik>
        </SafeAreaContainer>
      </BackHandlerProvider>
    </>
  );
}
