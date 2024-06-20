import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Text } from "../../../components";
import { AppHeader } from "../../../components/Headers";
import BeoDocumentCard from "../../../components/Cards/BeoDocumentCard";
import { PdfModal } from "../../../components/Modals";
import { Colors, Fonts, TextSizes } from "../../../common";

const BeoDocumentScreen = ({ route }) => {
  const [viewPdf, setViewPDF] = useState(false);
  const eventPdf = route.params.PDFS;
  const [pdf, setPdf] = useState(null);

  const List = ({ data }) => {
    if (!data.length) {
      return <Text style={styles.noText}>No Document Found</Text>;
    }

    return data.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <BeoDocumentCard
            name={item.file_name}
            onPress={() => {
              setPdf(item.pdf_link);
              setViewPDF(!viewPdf);
            }}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <Screen>
        <AppHeader title="Documents List" />
        <View style={styles.container}>
          <List data={eventPdf} />
        </View>
        <PdfModal visible={viewPdf} setVisible={setViewPDF} link={pdf} />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  noText: {
    alignSelf: "center",
    marginTop: "50%",
    fontSize: TextSizes.SubHeading,
    color: Colors.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
});

export default BeoDocumentScreen;
