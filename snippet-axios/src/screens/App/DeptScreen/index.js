import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableWithoutFeedback } from "react-native";
import RadioButton from "react-native-simple-radio-button-input";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { getDepartments } from "./helpers";
import { Colors, Routes } from "../../../common";
import { Screen, Text, ActivityIndicator } from "../../../components";
import { Button } from "../../../components/Buttons";
import { AppHeader } from "../../../components/Headers";
import { useUser, useDepartmentId } from "../../../hooks";

const DeptScreen = () => {
  const [dept, setDept] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { setDepartmentId } = useDepartmentId();
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    return () => {
      setDepartments([]);
    };
  }, []);

  const getData = async () => {
    setLoading(true);
    const result = await getDepartments();
    if (result) {
      setDepartments(result);
      setDept(result.filter((item) => item.id === user?.employee_type_id)[0]);
    }
    setLoading(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    setDepartmentId(dept.id);
    navigation.navigate(Routes.HomeScreen);
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader title="Change Department" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {departments.map((department) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => setDept(department)}
                key={department.id}
              >
                <View style={styles.container}>
                  <Text style={styles.cardTxt}>{department.name}</Text>
                  <RadioButton
                    color={Colors.blue}
                    selected={dept?.name === department.name}
                    onPress={() => setDept(department)}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}

          <Button
            title={dept != "" ? "Submit" : "Change Department"}
            gradient
            style={styles.btnStyles}
            textStyle={styles.btnText}
            onPress={onSubmit}
          />
        </ScrollView>
      </Screen>
    </>
  );
};

export default DeptScreen;
