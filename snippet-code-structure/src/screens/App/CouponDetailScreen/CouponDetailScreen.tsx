import React, { FC, useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageCropPicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";

import {
  Button,
  Label,
  Screen,
  InputText,
  AppHeader,
  CalenderInput,
  ConfirmationModal,
  Text,
  RadioButton,
} from "../../../components";
import styles from "./styles";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../components/Toastify";
import { CSNetwork, Urls } from "../../../config";
import { useLoader, useShop } from "../../../hooks";
import { Colors, Icons, Routes } from "../../../common";
import { Coupon, Game } from "../../../types";
import LangKeys from "../../../i18n/translations/LangKeys";

const CouponDetailScreen: FC = () => {
  const { t } = useTranslation();
  const { params } = useRoute();
  // @ts-ignore
  const coupon: Coupon | null = params?.coupon || null;
  const navigation = useNavigation();
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(
    coupon?.coupon_associated_game || null
  );
  const [showAssignButton, setShowAssignButton] = useState<boolean>(true);
  const [showGameList, setShowGameList] = useState<boolean>(false);
  const [gameID, setGameID] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { shop } = useShop();
  const isFocused = useIsFocused();

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setShowAssignButton(false);
  };

  const validationSchema = Yup.object().shape({
    coupon_name: Yup.string().required(
      `${t(LangKeys.couponName)} ${t(LangKeys.isRequired)}`
    ),
    coupon_description: Yup.string().required(
      `${t(LangKeys.couponDescription)} ${t(LangKeys.isRequired)}`
    ),
    coupon_price: Yup.string().required(
      `${t(LangKeys.couponPrice)} ${t(LangKeys.isRequired)}`
    ),
    coupon_sale_start_date: Yup.string().required(
      `${t(LangKeys.couponSaleStartDate)} ${t(LangKeys.isRequired)}`
    ),
    coupon_sale_end_date: Yup.string().required(
      `${t(LangKeys.couponSaleEndDate)} ${t(LangKeys.isRequired)}`
    ),
    coupon_usage_start_date: Yup.string().required(
      `${t(LangKeys.couponUsageStartDate)} ${t(LangKeys.isRequired)}`
    ),
    coupon_usage_end_date: Yup.string().required(
      `${t(LangKeys.couponUsageEndDate)} ${t(LangKeys.isRequired)}`
    ),
    coupons_available: Yup.string(),
  });

  // @ts-ignore
  const mode: string = params?.mode;
  const { setLoading } = useLoader();
  const [coupon_image, setCouponImage] = useState<string>(
    coupon?.coupon_image || ""
  );
  const [coupon_rebuyible, setCouponRebuyible] = useState<boolean>(
    coupon?.coupon_rebuyible || false
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCheckToggle = () => {
    setCouponRebuyible(!coupon_rebuyible);
  };

  const initialValues = {
    coupon_name: coupon?.coupon_name || "",
    coupon_description: coupon?.coupon_description || "",
    coupon_price: coupon?.coupon_price.toString() || "",
    coupon_sale_start_date: coupon?.coupon_sale_start_date || "",
    coupon_sale_end_date: coupon?.coupon_sale_end_date || "",
    coupon_usage_start_date: coupon?.coupon_usage_start_date || "",
    coupon_usage_end_date: coupon?.coupon_usage_end_date || "",
    coupons_available: coupon?.coupons_available?.toString() ?? "",
  };

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  const onSubmit = async (values: any) => {
    if (!coupon_image) return showErrorMessage("Please upload coupon image");

    if (showPreview === true)
      // @ts-ignore
      return navigation.navigate(Routes.BoughtCouponDetailScreen, {
        coupon: { ...values, coupon_image, coupon_background: shop?.shop_logo },
        id: null,
      });

    const url =
      mode === "Create"
        ? Urls.manageCoupons
        : `${Urls.manageCoupons}/${coupon?.coupon_id}`;

    const method = mode === "Create" ? "post" : "patch";

    setLoading(true);
    const { coupons_available, ...restValues } = values;

    const obj = {
      ...restValues,
      coupon_image: coupon_image.includes("hhtps")
        ? coupon_image
        : coupon_image.split("base64,")[1],
      game_id: gameID,
      coupon_rebuyible: coupon_rebuyible === true ? 1 : 0,
    };

    if (coupons_available !== "") obj["coupons_available"] = coupons_available;

    const response: any = await CSNetwork[method](url, obj);
    setLoading(false);

    if (!response.ok) return showErrorMessage(response.data.message);
    showSuccessMessage(response.data.message);
    navigation.goBack();
  };

  const handleImageSelect = async (imageType: string) => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
      });

      if (imageType === "foreground")
        // @ts-ignore
        setCouponImage(`data:${image.mime};base64,${image.data}`);
      // @ts-ignore
      else setCouponBackgroundImage(`data:${image.mime};base64,${image.data}`);
    } catch (error) {
      console.log("image error", error);
    }
  };

  const handleDeleteCoupon = async () => {
    setLoading(true);
    const response: any = await CSNetwork.delete(
      `${Urls.manageCoupons}/${coupon?.coupon_id}`
    );
    setLoading(false);

    setShowDeleteModal(false);

    if (!response.ok) return showErrorMessage(response.data.message);
    showSuccessMessage(response.data.message);

    navigation.goBack();
  };

  const getAllGames = async () => {
    setLoading(true);

    const response: any = await CSNetwork.get(Urls.allGames);
    setLoading(false);

    if (!response.ok) return showErrorMessage(response.data.message);
    setAllGames(response.data.data);
    setShowAssignButton(false);
    setShowGameList(true);
  };

  const renderGameItem = ({ item }: { item: Game }) => (
    <TouchableOpacity onPress={() => handleGameSelect(item)}>
      <View
        style={{
          ...styles.mainContainer,
          borderColor:
            selectedGame?.game_id === item.game_id ? Colors.primary : "white",
        }}
      >
        <Image source={{ uri: item.game_image }} style={styles.gameImage} />
        <Text
          style={{
            color:
              selectedGame?.game_id === item.game_id ? Colors.primary : "black",
          }}
        >
          {item.game_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const addSelectedGame = () => {
    if (!selectedGame) return Alert.alert("Please select a game");
    const gameId = selectedGame?.game_id || "";
    setGameID(gameId);
    setShowGameList(false);
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (showPreview) handleSubmit();
  }, [showPreview]);

  useEffect(() => {
    if (isFocused) setShowPreview(false);
  }, [isFocused]);

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 16 }}>
          {/* @ts-ignore */}
          <AppHeader showBack={true} title={t(`${mode}Coupon`)} />
        </View>

        <TouchableOpacity onPress={() => handleImageSelect("foreground")}>
          {coupon_image ? (
            <Image style={styles.img} source={{ uri: coupon_image }} />
          ) : (
            <View style={styles.imgView}>
              <Icons.Ionicons
                name="image-outline"
                size={35}
                color={Colors.black}
              />
            </View>
          )}
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <Label title={`${t(LangKeys.couponName)}*`} />
          <InputText
            placeholder={t(LangKeys.couponName)}
            value={values.coupon_name}
            onChangeText={handleChange("coupon_name")}
            onBlur={() => setFieldTouched("coupon_name")}
            error={errors.coupon_name}
            touched={touched.coupon_name}
          />
          <Label title={`${t(LangKeys.description)}*`} />
          <InputText
            placeholder={t(LangKeys.couponDescription)}
            value={values.coupon_description}
            onChangeText={handleChange("coupon_description")}
            onBlur={() => setFieldTouched("coupon_description")}
            error={errors.coupon_description}
            touched={touched.coupon_description}
          />
          <Label title={`${t(LangKeys.price)}*`} />
          <InputText
            placeholder={t(LangKeys.couponPrice)}
            value={values.coupon_price}
            onChangeText={handleChange("coupon_price")}
            onBlur={() => setFieldTouched("coupon_price")}
            error={errors.coupon_price}
            touched={touched.coupon_price}
          />

          <Label title={t(LangKeys.couponsAvailable)} />
          <InputText
            placeholder={t(LangKeys.couponsAvailable)}
            value={values.coupons_available}
            onChangeText={handleChange("coupons_available")}
            onBlur={() => setFieldTouched("coupons_available")}
            error={errors.coupons_available}
            touched={touched.coupons_available}
          />
          <Label title={`${t(LangKeys.couponSaleStartDate)}*`} />
          <CalenderInput
            placeholder={t(LangKeys.couponSaleStartDate)}
            onChange={handleChange("coupon_sale_start_date")}
            value={values.coupon_sale_start_date}
            onBlur={() => setFieldTouched("coupon_sale_start_date")}
            error={errors.coupon_sale_start_date}
            touched={touched.coupon_sale_start_date}
          />

          <Label title={`${t(LangKeys.couponSaleEndDate)}*`} />
          <CalenderInput
            placeholder={t(LangKeys.couponSaleEndDate)}
            onChange={handleChange("coupon_sale_end_date")}
            value={values.coupon_sale_end_date}
            onBlur={() => setFieldTouched("coupon_sale_end_date")}
            error={errors.coupon_sale_end_date}
            touched={touched.coupon_sale_end_date}
          />
          <Label title={`${t(LangKeys.couponUsageStartDate)}*`} />
          <CalenderInput
            placeholder={t(LangKeys.couponUsageStartDate)}
            onChange={handleChange("coupon_usage_start_date")}
            value={values.coupon_usage_start_date}
            onBlur={() => setFieldTouched("coupon_usage_start_date")}
            error={errors.coupon_usage_start_date}
            touched={touched.coupon_usage_start_date}
          />

          <Label title={`${t(LangKeys.couponUsageEndDate)}*`} />
          <CalenderInput
            placeholder={t(LangKeys.couponUsageEndDate)}
            onChange={handleChange("coupon_usage_end_date")}
            value={values.coupon_usage_end_date}
            onBlur={() => setFieldTouched("coupon_usage_end_date")}
            error={errors.coupon_usage_end_date}
            touched={touched.coupon_usage_end_date}
          />
          <RadioButton
            value={coupon_rebuyible}
            onChange={handleCheckToggle}
            title={t(LangKeys.couponRebuyible)}
          />

          <ConfirmationModal
            title={t(LangKeys.confirmation)}
            description={t(LangKeys.modalConfirmationMessage)}
            onAccept={handleDeleteCoupon}
            onCancel={() => setShowDeleteModal(false)}
            isVisible={showDeleteModal}
          />

          <Modal isVisible={showGameList}>
            <View style={styles.modalContainer}>
              <Label title={t(LangKeys.gameList)} size="lg" />
              <ScrollView>
                <View style={{ height: 200 }}>
                  <FlatList data={allGames} renderItem={renderGameItem} />
                </View>
              </ScrollView>

              <Button
                title={t(LangKeys.selectGame)}
                onPress={addSelectedGame}
              />
            </View>
          </Modal>
          {selectedGame ? (
            <View style={styles.modalInnerContainer}>
              <View>
                <Label title={t(LangKeys.selectGame)} />
                <Text style={styles.selectedName}>
                  {selectedGame?.game_name}
                </Text>
              </View>
              {/* {mode === "Edit" ? ( */}
              <TouchableOpacity onPress={getAllGames}>
                <Icons.AntDesign size={20} name="edit" color={Colors.primary} />
              </TouchableOpacity>
              {/* ) : null} */}
            </View>
          ) : null}

          {showAssignButton && mode === "Create" ? (
            <Button title={t(LangKeys.assignGame)} onPress={getAllGames} />
          ) : (
            <>
              <Button
                title={t(LangKeys.preview)}
                type="secondary"
                onPress={() => setShowPreview(true)}
              />
              <Button title={t(mode)} onPress={handleSubmit} />
            </>
          )}

          {mode === "Edit" && (
            <Button
              title={t(LangKeys.delete)}
              type="danger"
              onPress={() => setShowDeleteModal(true)}
            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};
export default CouponDetailScreen;
