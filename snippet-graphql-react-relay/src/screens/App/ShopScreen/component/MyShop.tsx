import React, { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { Button, InputText, Label } from "../../../../components";
import { useLoader, useShop } from "../../../../hooks";
import { CSNetwork, Urls } from "../../../../config";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../components/Toastify";
import type { Shop } from "../../../../types";
import LangKeys from "../../../../i18n/translations/LangKeys";
import ImageCropPicker from "react-native-image-crop-picker";
import { Colors, Icons } from "../../../../common";

const MyShop: FC = () => {
  const { setLoading } = useLoader();
  const [shop, setShopDetail] = useState<Shop | null>(null);
  const [shop_logo, setShopLogo] = useState<string>("");
  const { t } = useTranslation();
  const { setShop } = useShop();

  const getCompanyDetails = async () => {
    setLoading(true);

    const response: any = await CSNetwork.get(Urls.manageCompany);
    setLoading(false);

    if (!response.ok) return showErrorMessage(response.data.message);
    setShopDetail(response.data.data);
    setShop(response.data.data);
    setShopLogo(response.data.data.shop_logo);
  };
  useEffect(() => {
    getCompanyDetails();
  }, []);

  const validationSchema = Yup.object().shape({
    shop_name: Yup.string().required(
      `${t(LangKeys.shopName)} ${t(LangKeys.isRequired)}`
    ),
    shop_name_furigana: Yup.string().required(
      `${t(LangKeys.shopNameFurigana)} ${t(LangKeys.isRequired)}`
    ),
    shop_pr: Yup.string().required(
      `${t(LangKeys.shopPr)} ${t(LangKeys.isRequired)}`
    ),
    postal_code: Yup.string().required(
      `${t(LangKeys.shopPostalCode)} ${t(LangKeys.isRequired)}`
    ),
    prefecture: Yup.string().required(
      `${t(LangKeys.shopPrefecture)} ${t(LangKeys.isRequired)}`
    ),
    address: Yup.string().required(
      `${t(LangKeys.shopAddress)} ${t(LangKeys.isRequired)}`
    ),
    building: Yup.string(),
    name: Yup.string().required(
      `${t(LangKeys.shopContactName)} ${t(LangKeys.isRequired)}`
    ),
    name_furigana: Yup.string().required(
      `${t(LangKeys.shopContactNameFurigana)} ${t(LangKeys.isRequired)}`
    ),
    url: Yup.string(),
    phone_number: Yup.string(),
  });

  const initialValues = {
    shop_name: shop?.shop_name || "",
    shop_name_furigana: shop?.shop_name_furigana || "",
    shop_pr: shop?.shop_pr || "",
    postal_code: shop?.shop_location.location_postal_code || "",
    prefecture: shop?.shop_location.location_prefecture || "",
    address: shop?.shop_location.location_address || "",
    building: shop?.shop_location.location_building || "",
    name: shop?.shop_contact.contact_name || "",
    name_furigana: shop?.shop_contact.contact_name_furigana || "",
    url: shop?.shop_contact.contact_url || "",
    phone_number: shop?.shop_contact.contact_phone_number || "",
  };

  const onSubmit = async (values: any) => {
    if (!shop_logo) {
      return showErrorMessage(
        `${t(LangKeys.shopLogo)} ${t(LangKeys.isRequired)}`
      );
    }
    const {
      shop_name,
      shop_name_furigana,
      shop_pr,
      postal_code,
      prefecture,
      address,
      building,
      name,
      name_furigana,
      url,
      phone_number,
    } = values;
    const obj = {
      shop_name,
      shop_name_furigana,
      shop_pr,
      shop_location: {
        postal_code,
        prefecture,
        address,
      },
      shop_contact: {
        name,
        name_furigana,
      },
    };

    // @ts-ignore
    if (!shop_logo.includes("https")) obj.shop_logo = shop_logo.split(",")[1];

    if (url !== "") {
      // @ts-ignore
      obj.shop_contact["url"] = url;
    }

    if (phone_number !== "") {
      // @ts-ignore
      obj["shop_contact"]["contact_phone_number"] = phone_number;
    }
    // @ts-ignore
    if (building !== "") obj.shop_location["building"] = building;

    setLoading(true);
    const response: any = await CSNetwork.post(Urls.manageCompany, obj);
    setLoading(false);
    if (!response.ok) return showErrorMessage(response.data.message);
    showSuccessMessage(response.data.message);
  };

  const {
    setFieldTouched,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const selectImage = async () => {
    try {
      const NewImage: any = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
      });

      setShopLogo(`data:${NewImage.mime};base64,${NewImage.data}`);
    } catch (error) {
      console.log("Image error : ", error);
    }
  };

  const postalLocation = async () => {
    setLoading(true);
    const response: any = await CSNetwork.get(
      Urls.shopLocation(values.postal_code)
    );

    setLoading(false);
    if (!response.ok) return showErrorMessage(response.data.message);

    setFieldValue("prefecture", response.data.data.location_prefecture);

    console.log(response.data.data.location_prefecture, "ider");
    showSuccessMessage(response.data.message);
  };

  const handlePress = () => {
    setTimeout(() => {
      selectImage();
    }, 1000);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.imgContainer}>
            {shop_logo ? (
              <Image style={styles.img} source={{ uri: shop_logo }} />
            ) : (
              <View
                style={{
                  width: 92,
                  height: 92,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 92 / 2,
                  borderWidth: 1,
                  borderColor: Colors.black,
                }}
              >
                <Icons.Ionicons name="person" size={25} color={Colors.black} />
              </View>
            )}
            <TouchableOpacity
              style={styles.iconContainer2}
              onPress={() => handlePress()}
            >
              <Icons.Feather name="camera" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Label title={`${t(LangKeys.shopName)}*`} />
          <InputText
            placeholder={t(LangKeys.shopName)}
            value={values.shop_name}
            onChangeText={handleChange("shop_name")}
            onBlur={() => setFieldTouched("shop_name")}
            error={errors.shop_name}
            touched={touched.shop_name}
          />
          <Label title={`${t(LangKeys.shopNameFurigana)}*`} />
          <InputText
            placeholder={t(LangKeys.shopNameFurigana)}
            value={values.shop_name_furigana}
            onChangeText={handleChange("shop_name_furigana")}
            onBlur={() => setFieldTouched("shop_name_furigana")}
            error={errors.shop_name_furigana}
            touched={touched.shop_name_furigana}
          />
          <Label title={`${t(LangKeys.shopPr)}*`} />
          <InputText
            placeholder={t(LangKeys.shopPr)}
            value={values.shop_pr}
            onChangeText={handleChange("shop_pr")}
            onBlur={() => setFieldTouched("shop_pr")}
            error={errors.shop_pr}
            touched={touched.shop_pr}
          />
          <Label title={`${t(LangKeys.shopPostalCode)}*`} />
          <InputText
            placeholder={t(LangKeys.shopPostalCode)}
            value={values.postal_code}
            onChangeText={handleChange("postal_code")}
            onBlur={() => {
              setFieldTouched("postal_code");
              postalLocation();
            }}
            error={errors.postal_code}
            touched={touched.postal_code}
          />
          <Label title={`${t(LangKeys.shopPrefecture)}*`} />
          <InputText
            placeholder={t(LangKeys.shopPrefecture)}
            value={values.prefecture}
            onChangeText={handleChange("prefecture")}
            onBlur={() => setFieldTouched("prefecture")}
            error={errors.prefecture}
            touched={touched.prefecture}
            editable={false}
          />
          <Label title={`${t(LangKeys.shopAddress)}*`} />
          <InputText
            placeholder={t(LangKeys.shopAddress)}
            value={values.address}
            onChangeText={handleChange("address")}
            onBlur={() => setFieldTouched("address")}
            error={errors.address}
            touched={touched.address}
          />
          <Label title={t(LangKeys.shopBuilding)} />
          <InputText
            placeholder={t(LangKeys.shopBuilding)}
            value={values.building}
            onChangeText={handleChange("building")}
            onBlur={() => setFieldTouched("building")}
            error={errors.building}
            touched={touched.building}
          />
          <Label title={`${t(LangKeys.shopContactName)}*`} />
          <InputText
            placeholder={t(LangKeys.shopContactName)}
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={() => setFieldTouched("name")}
            error={errors.name}
            touched={touched.name}
          />
          <Label title={`${t(LangKeys.shopContactNameFurigana)}*`} />
          <InputText
            placeholder={t(LangKeys.shopContactNameFurigana)}
            value={values.name_furigana}
            onChangeText={handleChange("name_furigana")}
            onBlur={() => setFieldTouched("name_furigana")}
            error={errors.name_furigana}
            touched={touched.name_furigana}
          />
          <Label title={t(LangKeys.shopContactUrl)} />
          <InputText
            placeholder={t(LangKeys.shopContactUrl)}
            value={values.url}
            onChangeText={handleChange("url")}
            onBlur={() => setFieldTouched("url")}
            error={errors.url}
            touched={touched.url}
          />
          <Label title={t(LangKeys.shopContactPhoneNumber)} />
          <InputText
            placeholder={t(LangKeys.shopContactPhoneNumber)}
            value={values.phone_number}
            onChangeText={handleChange("phone_number")}
            onBlur={() => setFieldTouched("phone_number")}
            error={errors.phone_number}
            touched={touched.phone_number}
          />
        </View>
        <Button title={t(LangKeys.save)} onPress={handleSubmit} />
        <View style={{ height: 150 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  img: {
    width: 92,
    height: 92,
    borderRadius: 46,
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
});

export default MyShop;
