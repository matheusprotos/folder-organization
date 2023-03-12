import { ThemeConstants } from "@constants/theme.constants";
import { useSession } from "@hooks/use-session.hook";
import PrivateStack from "@stacks/private.stack";
import PublicStack from "@stacks/public.stack";
import { AppThemeOptions } from "@themes/types";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components";

const MainRouter: React.FC = (): JSX.Element => {
  const { isSigned } = useSession();

  const theme: AppThemeOptions = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primaryBackground}
        translucent
        animated
        style={
          theme.title === ThemeConstants.DARK
            ? ThemeConstants.LIGHT
            : ThemeConstants.DARK
        }
      />

      {isSigned ? <PrivateStack /> : <PublicStack />}
    </>
  );
};

export default MainRouter;
