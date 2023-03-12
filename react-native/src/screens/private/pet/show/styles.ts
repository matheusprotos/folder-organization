import { AppThemeOptions } from "@themes/types";
import styled from "styled-components/native";

export const StyledImage = styled.Image`
  flex: 1;
  max-height: 340px;
`;

export const Container: any = styled.View`
  margin-top: -20px;
  padding: 30px 20px 30px 20px;
  background: ${(props: { theme: AppThemeOptions }) =>
    props.theme.colors.primaryBackground};
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
`;

export const Title = styled.Text`
  font-family: ${(props: { theme: AppThemeOptions }) =>
    props.theme.fontFamily.heading};
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  color: ${(props: { theme: AppThemeOptions }) =>
    props.theme.colors.primaryTitle};
  text-align: center;
`;
