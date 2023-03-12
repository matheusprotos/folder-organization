import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const StyledMapView = styled(MapView)`
  width: ${() => `${windowWidth}px`};
  height: ${() => `${windowHeight}px`};
`;

export const HeaderContainer: any = styled.View`
  padding: 30px 20px 30px 20px;
`;
