import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import router from "next/router";
import { MdMenu } from "react-icons/md";
import useAsyncEffect from "use-async-effect";
import { RoutesConstants } from "../../public/constants/routes.constants";
import { StorageConstants } from "../../public/constants/storage.constants";
import { useMenu } from "../../public/hooks/menu.hook";
import { useUser } from "../../public/hooks/user.hook";
import GroupsInvitesMenu from "../groups-invites-menu";
import NotificationsMenu from "../notifications-menu";
import SettingsMenu from "../settings-menu";
import UserMenu from "../user-menu";

const CustomAppBar = () => {
  const { setMenuOpen } = useMenu();
  const { updateUser } = useUser();

  const checkAuthenticated = () => {
    const userString: string | null = localStorage.getItem(
      StorageConstants.USER
    );

    if (userString == null) {
      return router.replace(RoutesConstants.LOGIN);
    }
  };

  useAsyncEffect(async () => {
    try {
      await updateUser();
    } catch (error) {
      console.error(error);
    }

    checkAuthenticated();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar className="bg-primary-light dark:bg-dark-mode-app-bar">
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={() => setMenuOpen(true)}
        >
          <MdMenu />
        </IconButton>

        <span className="flex-1"></span>

        <SettingsMenu />
        <GroupsInvitesMenu />
        <NotificationsMenu />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
