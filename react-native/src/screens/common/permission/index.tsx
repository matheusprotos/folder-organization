import LocationWorldImage from "@assets/images/location-world.svg";
import NotificationImage from "@assets/images/notification.svg";
import TrackingImage from "@assets/images/tracking.svg";
import GalleryImage from "@assets/images/gallery.svg";
import { Container, SafeAreaContainer } from "@assets/styles";
import Advertisement from "@components/advertisement";
import BackHandlerProvider from "@components/back-handler";
import Heading from "@components/header";
import CustomProgressBar from "@components/progress-bar";
import { translate } from "@config/i18n.config";
import { PermissionConstants } from "@constants/permission.constants";
import { PlatformConstants } from "@constants/platform.constants";
import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { ImageSection, Section } from "./styles";
import { PermissionStepOptions } from "./types";

export default function PermissionsScreen(): JSX.Element {
  const [isLocationPermissionBusy, setIsLocationPermissionBusy] =
    useState<boolean>(false);
  const [isNotificationPermissionBusy, setIsNotificationPermissionBusy] =
    useState<boolean>(false);
  const [isGalleryPermissionBusy, setIsGalleryPermissionBusy] =
    useState<boolean>(false);
  const [isTrackingPermissionBusy, setIsTrackingPermissionBusy] =
    useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<string>(
    PermissionConstants.LOCATION_PERMISSION_STEP
  );

  let permissionSteps: PermissionStepOptions = {
    [PermissionConstants.LOCATION_PERMISSION_STEP]: {
      id: 1,
      title: translate("heading.location_permissions"),
      subtitle: translate("heading.we_really_need_to_do_that"),
      description: translate("heading.allow_your_location"),
      explanation: translate(
        "heading.we_will_need_your_location_to_give_you_better_experience"
      ),
      image: <LocationWorldImage />,
      onPress: onRequestLocationPermissionPress,
      onBackPress: onRequestLocationPermissionBackPress,
      isLoading: isLocationPermissionBusy,
      isPermissionGranted: true,
    },
    [PermissionConstants.NOTIFICATION_PERMISSION_STEP]: {
      id: 2,
      title: translate("heading.notification_permissions"),
      subtitle: translate("heading.we_really_need_to_do_that"),
      description: translate("heading.allow_your_notifications"),
      explanation: translate(
        "heading.we_will_need_your_notification_permissions_to_give_you_better_experience"
      ),
      image: <NotificationImage />,
      onPress: onRequestNotificationPermissionPress,
      onBackPress: onRequestNotificationPermissionBackPress,
      isLoading: isNotificationPermissionBusy,
      isPermissionGranted: false,
    },
    [PermissionConstants.GALLERY_PERMISSION_STEP]: {
      id: 3,
      title: translate("heading.gallery_permissions"),
      subtitle: translate("heading.we_really_need_to_do_that"),
      description: translate("heading.allow_your_gallery"),
      explanation: translate(
        "heading.we_will_need_your_gallery_permissions_to_give_you_better_experience"
      ),
      image: <GalleryImage />,
      onPress: onRequestGalleryPermissionPress,
      onBackPress: onRequestGalleryPermissionBackPress,
      isLoading: isGalleryPermissionBusy,
      isPermissionGranted: false,
    },
  };

  if (Platform.OS === PlatformConstants.IOS) {
    permissionSteps[PermissionConstants.TRACKING_PERMISSION_STEP] = {
      id: 4,
      title: translate("heading.tracking_permissions"),
      subtitle: translate("heading.we_really_need_to_do_that"),
      description: translate("heading.allow_your_tracking"),
      explanation: translate(
        "heading.we_will_need_your_tracking_permissions_to_give_you_better_experience"
      ),
      image: <TrackingImage />,
      onPress: onRequestTrackingPermissionPress,
      onBackPress: onRequestTrackingPermissionBackPress,
      isLoading: isTrackingPermissionBusy,
      isPermissionGranted: false,
    };
  }

  /**
   * @returns {void}
   */
  function onRequestLocationPermissionPress(): void {
    setIsLocationPermissionBusy(true);

    setCurrentStep(PermissionConstants.NOTIFICATION_PERMISSION_STEP);

    setIsLocationPermissionBusy(false);
  }

  /**
   * @returns {void}
   */
  function onRequestNotificationPermissionPress(): void {
    setIsNotificationPermissionBusy(true);

    setCurrentStep(PermissionConstants.TRACKING_PERMISSION_STEP);

    setIsNotificationPermissionBusy(false);
  }

  /**
   * @returns {void}
   */
  function onRequestGalleryPermissionPress(): void {
    setIsGalleryPermissionBusy(true);

    //

    setIsGalleryPermissionBusy(false);
  }

  /**
   * @returns {void}
   */
  function onRequestTrackingPermissionPress(): void {
    setIsTrackingPermissionBusy(true);

    //

    setIsTrackingPermissionBusy(false);
  }

  /**
   * @returns {void}
   */
  function onRequestLocationPermissionBackPress(): void {
    setIsLocationPermissionBusy(true);

    //

    setIsTrackingPermissionBusy(false);
  }

  /**
   * @returns {void}
   */
  function onRequestNotificationPermissionBackPress(): void {
    setIsNotificationPermissionBusy(true);

    setCurrentStep(PermissionConstants.LOCATION_PERMISSION_STEP);

    setIsNotificationPermissionBusy(false);
  }

  /**
   * @returns {void}
   */
  function onRequestGalleryPermissionBackPress(): void {
    setIsGalleryPermissionBusy(true);

    setCurrentStep(PermissionConstants.NOTIFICATION_PERMISSION_STEP);

    setIsGalleryPermissionBusy(false);
  }

  /**
   * @returns {void}
   */
  function onRequestTrackingPermissionBackPress(): void {
    setIsTrackingPermissionBusy(true);

    setCurrentStep(PermissionConstants.GALLERY_PERMISSION_STEP);

    setIsTrackingPermissionBusy(false);
  }

  /**
   * @returns {boolean}
   */
  function onBackPress(): boolean {
    permissionSteps[currentStep]?.onBackPress();

    return true;
  }

  return (
    <>
      <BackHandlerProvider onBackPress={onBackPress}>
        <SafeAreaContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
              <Heading
                onBackPress={onBackPress}
                title={permissionSteps[currentStep]?.title}
                subtitle={permissionSteps[currentStep]?.subtitle}
              />

              <CustomProgressBar
                current={permissionSteps[currentStep]?.id}
                length={Object.keys(permissionSteps).length}
              />

              <ImageSection>{permissionSteps[currentStep]?.image}</ImageSection>

              <Section>
                <Advertisement
                  title={
                    permissionSteps[currentStep]?.isPermissionGranted
                      ? translate("heading.thanks")
                      : permissionSteps[currentStep]?.description
                  }
                  subtitle={
                    permissionSteps[currentStep]?.isPermissionGranted
                      ? translate(
                          "heading.you_has_already_granted_your_permissions"
                        )
                      : permissionSteps[currentStep]?.explanation
                  }
                  buttonTitle={
                    permissionSteps[currentStep]?.isPermissionGranted
                      ? translate("button.continue")
                      : translate("button.sure_id_like_that")
                  }
                  onButtonPress={() => permissionSteps[currentStep]?.onPress()}
                  isButtonLoading={permissionSteps[currentStep]?.isLoading}
                />
              </Section>
            </Container>
          </ScrollView>
        </SafeAreaContainer>
      </BackHandlerProvider>
    </>
  );
}
