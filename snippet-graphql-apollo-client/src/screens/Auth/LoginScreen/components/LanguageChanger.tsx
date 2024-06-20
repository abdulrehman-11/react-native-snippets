import React, { FC, useState } from "react";
import { View, StyleSheet, Platform, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Text } from "../../../../components";
import { Colors, Icons } from "../../../../common";
import { Languages } from "../../../../common/DummyData";
import { useLanguage } from "../../../../hooks";

const LanguageChanger: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { language, saveLanguage } = useLanguage();

  return (
    <View
      style={{
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        marginTop: 10,
      }}
    >
      <View style={styles.androidContainer}>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <View style={styles.selectedContainer}>
            <Text>{Languages.find((item) => item.id === language)?.label}</Text>
            <Icons.AntDesign
              name="caretdown"
              style={{ marginLeft: 10 }}
              size={10}
              color={Colors.black}
            />
          </View>
        </TouchableOpacity>
        {showMenu && (
          <View style={styles.optioncontainer}>
            {Languages.map((item) => (
              <Pressable
                style={{
                  position: "relative",
                }}
                onPress={() => {
                  saveLanguage(item.id);
                  setShowMenu(false);
                }}
                key={item.id}
              >
                <Text
                  style={{
                    color: item.id === language ? Colors.primary : Colors.black,
                  }}
                >
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  androidContainer: {
    position: "absolute",
    right: 10,
    top: "5%",
    width: 100,
  },
  iosContainer: {
    left: 10,
    top: "5%",
    width: 100,
  },
  selectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 5,
    borderRadius: 10,
    width: 100,
  },
  optioncontainer: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
});

export default LanguageChanger;
