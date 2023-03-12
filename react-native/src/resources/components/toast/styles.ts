import styled from "styled-components/native";

export const Container: any = styled.View`
  margin: 30px;
  min-height: 58px;
  background: ${(props: { backgroundColor: string }) => props.backgroundColor};
  border-radius: 8px;
  justify-content: center;
`;

export const Content = styled.View`
  padding: 10px;
`;

export const Title: any = styled.Text`
  color: ${(props: any) => props.titleColor};
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
`;
