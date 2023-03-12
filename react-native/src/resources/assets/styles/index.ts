import { PlatformConstants } from "@constants/platform.constants";
import { AppThemeOptions } from "@themes/types";
import { Platform, StatusBar } from "react-native";
import styled from "styled-components/native";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === PlatformConstants.ANDROID
    ? StatusBar.currentHeight + "px"
    : "0px"};
`;

export const SafeAreaContainer: any = styled.View`
  flex: 1;
  background: ${(props: { theme: AppThemeOptions }) =>
    props.theme.colors.primaryBackground};
`;

export const Container: any = styled.View`
  padding: 30px 20px 30px 20px;
`;
