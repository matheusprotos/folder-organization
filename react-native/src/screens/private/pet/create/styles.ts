import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { height } = Dimensions.get("window");

export const LoadingContainer = styled.View`
  display: flex;
  justify-content: center;
  height: ${height * 0.5}px;
`;
