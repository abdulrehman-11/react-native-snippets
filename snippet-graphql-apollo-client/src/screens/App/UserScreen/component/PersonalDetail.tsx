import React, { FC, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import useAuth from "../../../../hooks/useAuth";
import { Colors, Icons } from "../../../../common";
import {
  Button,
  ConfirmationModal,
  InputText,
  Label,
} from "../../../../components";
import { CSNetwork, Urls } from "../../../../config";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../components/Toastify";
import LangKeys from "../../../../i18n/translations/LangKeys";
import { useLoader } from "../../../../hooks";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  phone_number: Yup.string().required("Phone Number is required"),
  email: Yup.string().required("Email is required"),
});

const PersonalDetail: FC = () => {
  const [image, setImage] = useState<any>("");
  const { user, login, token, logout } = useAuth();
  const { t } = useTranslation();
  const { setLoading } = useLoader();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const initialValues = {
    name: user?.user_name || "",
    phone_number: user?.user_phone_number || "",
    email: user?.user_email || "",
  };

  const onSubmit = async (values: any) => {
    const updatedObject = {
      ...values,
      avatar: image.data,
    };
    setLoading(true);
    const response = await CSNetwork.patch(Urls.updateProfile, updatedObject);
    setLoading(false);
    if (!response.ok) {
      // @ts-ignore
      return showErrorMessage(response.data.message);
    }
    // @ts-ignore
    login({ data: response.data.data, token });
    // @ts-ignore
    showSuccessMessage(response.data.message);
  };

  const { handleChange, handleSubmit, values, errors, setFieldTouched } =
    useFormik({
      onSubmit,
      validationSchema,
      initialValues,
    });

  const selectImage = async () => {
    try {
      const NewImage = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
      });

      setImage(NewImage);
    } catch (error) {
      console.log("Image error : ", error);
    }
  };

  const handlePress = (name: any) => {
    name === "gallery"
      ? setTimeout(() => {
          selectImage();
        }, 1000)
      : null;
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false);
    setLoading(true);
    const response = await CSNetwork.delete(Urls.updateProfile);
    setLoading(false);
    if (!response.ok) {
      // @ts-ignore
      return showErrorMessage(response.data.message);
    }
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={
            image
              ? { uri: `data:${image.mime};base64,${image.data}` }
              : { uri: user?.user_avatar }
          }
        />
        <TouchableOpacity
          style={styles.iconContainer2}
          onPress={() => handlePress("gallery")}
        >
          <Icons.Feather name="camera" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <Label title={t(LangKeys.name)} />
      <InputText
        value={values.name}
        error={errors["name"]}
        onChangeText={handleChange("name")}
        onBlur={() => setFieldTouched("name")}
      />
      <Label title={t(LangKeys.mobileNumber)} />
      <InputText
        value={values.phone_number}
        error={errors["phone_number"]}
        onChangeText={handleChange("phone_number")}
        onBlur={() => setFieldTouched("phone_number")}
      />
      <Label title={t(LangKeys.email)} />
      <InputText
        value={values.email}
        error={errors["email"]}
        onChangeText={handleChange("email")}
        onBlur={() => setFieldTouched("email")}
        editable={false}
      />
      <Button title={t(LangKeys.update)} onPress={handleSubmit} />
      <Button
        title={t(LangKeys.deleteAccount)}
        onPress={() => setShowDeleteModal(true)}
        style={{ backgroundColor: Colors.danger }}
      />
      <ConfirmationModal
        title={t(LangKeys.sureToDeleteAccount)}
        description={t(LangKeys.deleteAccountDetail)}
        onAccept={handleDeleteAccount}
        isVisible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  img: { width: 92, height: 92, borderRadius: 46 },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  iconContainer2: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
    marginLeft: 60,
  },
  referalText: {
    alignSelf: "center",
    color: Colors.primary,
    textDecorationLine: "underline",
    marginRight: 20,
  },
});

export default PersonalDetail;
