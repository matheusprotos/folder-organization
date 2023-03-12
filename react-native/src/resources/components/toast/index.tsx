import React from "react";
import { Container, Content, Title } from "./styles";
import { ToastCardOptions } from "./types";

const ToastCard = ({
  title,
  backgroundColor,
  titleColor,
}: ToastCardOptions): JSX.Element => {
  return (
    <>
      <Container backgroundColor={backgroundColor}>
        <Content>
          <Title titleColor={titleColor}>{title}</Title>
        </Content>
      </Container>
    </>
  );
};

export default ToastCard;
