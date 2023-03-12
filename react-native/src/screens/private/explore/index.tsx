import { Container, SafeAreaContainer } from "@assets/styles";
import Heading from "@components/header";
import MapMarker from "@components/map-marker";
import { translate } from "@config/i18n.config";
import { AppThemeOptions } from "@themes/types";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Region } from "react-native-maps";
import { useTheme } from "styled-components";
import { ExploreConstants } from "./constants";
import { StyledMapView } from "./styles";

export default function ExploreScreen(): JSX.Element {
  const [initialRegion, setInitialRegion] = useState<Region>(
    ExploreConstants.INITIAL_REGION
  );
  const [region, setRegion] = useState<Region>(ExploreConstants.INITIAL_REGION);
  const [markers, setMarkers] = useState<any>(ExploreConstants.MARKERS);

  const theme: AppThemeOptions = useTheme();

  const getCurrentPosition = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();

    if (status !== "granted") {
      console.error("Permissão de acesso a localização negada.");
    } else {
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 100,
        longitudeDelta: 100,
      });
    }
  };

  /**
   * @returns {void}
   */
  useEffect((): void => {
    getCurrentPosition();
  }, []);

  return (
    <>
      <SafeAreaContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <Heading
              title={translate("heading.explore")}
              subtitle={translate(
                "heading.find_pets_orgs_establishments_and_more"
              )}
            />
          </Container>

          <StyledMapView
            region={region}
            initialRegion={initialRegion}
            showsCompass
            showsMyLocationButton
            showsUserLocation
            zoomControlEnabled
            zoomEnabled
            zoomTapEnabled
            toolbarEnabled
            userLocationCalloutEnabled
          >
            {markers.map((marker: any, index: number) => (
              <MapMarker key={index} marker={marker} />
            ))}
          </StyledMapView>
        </ScrollView>
      </SafeAreaContainer>
    </>
  );
}
