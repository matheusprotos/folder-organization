import CameraButton from "@components/camera-button";
import ImagePreview from "@components/image-preview";
import TakePictureButton from "@components/buttons/take-picture";
import { ColorHexaConstants } from "@constants/color-hexa.constants";
import { PermissionConstants } from "@constants/permission.constants";
import RouteConstants from "@constants/route.constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useImages } from "@hooks/use-images.hook";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { Container, StyledCamera } from "./styles";

export default function CameraScreen(): JSX.Element {
  const navigation: NavigationProp<any> = useNavigation();

  const { setImages } = useImages();

  const [hasPermission, setHasPermission] = useState<any>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState<Camera>();

  /**
   * @returns {boolean}
   */
  function onBackPress(): boolean {
    navigation.navigate(RouteConstants.CREATE_PET);

    return true;
  }

  const pickImages = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const image: any = result.uri;

      setPreviewVisible(true);
      setCapturedImage(image);
    }
  };

  const savePhoto = async () => {
    setImages((images: Array<string>) => [...images, capturedImage]);
    setPreviewVisible(false);
    setCapturedImage(undefined);

    navigation.navigate(RouteConstants.CREATE_PET);
  };

  /**
   *
   * @returns {Promise<void>}
   */
  const takePicture = async (): Promise<void> => {
    try {
      if (!camera) return;

      const image: CameraCapturedPicture = await camera.takePictureAsync();

      setPreviewVisible(true);
      setCapturedImage(image.uri);
    } catch (error) {
      console.error(error);
    }
  };

  useAsyncEffect(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    setHasPermission(status === PermissionConstants.GRANTED);
  }, []);

  return (
    <Container>
      {previewVisible ? (
        <ImagePreview
          capturedImage={capturedImage}
          onCancel={() => setPreviewVisible(false)}
          onSave={savePhoto}
        />
      ) : (
        <StyledCamera
          type={type}
          ref={(cameraRef: any) => setCamera(cameraRef)}
        >
          <CameraButton
            onPress={onBackPress}
            position={{
              top: "5%",
              left: "5%",
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              color={ColorHexaConstants.WHITE}
              size={30}
            />
          </CameraButton>
          <CameraButton
            onPress={pickImages}
            position={{
              bottom: "5%",
              left: "5%",
            }}
          >
            <Ionicons
              name="md-images"
              color={ColorHexaConstants.WHITE}
              size={30}
            />
          </CameraButton>
          <CameraButton
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
            position={{
              bottom: "5%",
              right: "5%",
            }}
          >
            <MaterialIcons
              name="flip-camera-ios"
              color={ColorHexaConstants.WHITE}
              size={30}
            />
          </CameraButton>
          <TakePictureButton onPress={takePicture} />
        </StyledCamera>
      )}
    </Container>
  );
}
