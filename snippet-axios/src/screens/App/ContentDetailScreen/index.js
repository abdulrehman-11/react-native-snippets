import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Image } from "react-native";

import {
  Screen,
  ActivityIndicator,
  Text,
  Field,
  VideoPlayer,
  TrackPlayer,
  YoutubeVideoPlayer,
} from "../../../components";
import { getContentDetail } from "./helpers";
import { AppHeader } from "../../../components/Headers";
import { PdfModal } from "../../../components/Modals";
import styles from "./styles";

const ContentDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState();
  const [selectedPdf, setSelectedPdf] = useState();
  const [viewPdf, setViewPdf] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getContentDetail(id);
      if (result) setContent(result);
      setLoading(false);
    })();
  }, []);

  const ViewPdf = ({ selectedPdf, onPress }) => (
    <>
      <TouchableOpacity style={styles.viewPdfContainer} onPress={onPress}>
        <Text>View</Text>
      </TouchableOpacity>
      <PdfModal link={selectedPdf} visible={viewPdf} setVisible={setViewPdf} />
    </>
  );

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader title={content?.heading} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {content?.ContentFiles.map((item, index) => {
            return (
              <View key={item.content_info_id + index} style={styles.container}>
                {item.file_type === "pdf" ? (
                  <ViewPdf
                    selectedPdf={selectedPdf}
                    onPress={() => {
                      setSelectedPdf(item.file_link);
                      setViewPdf(true);
                    }}
                  />
                ) : item.file_type === "video" && item.file_link !== null ? (
                  <VideoPlayer url={item.file_link} />
                ) : item.file_type === "audio" ? (
                  <TrackPlayer link={item.file_link} />
                ) : item.file_type === "image" ? (
                  <Image
                    source={{ uri: item.file_link }}
                    style={{ width: "100%", height: 300 }}
                    resizeMode="contain"
                  />
                ) : item.file_type === "youtube" ? (
                  <YoutubeVideoPlayer
                    VideoId={item.file_link.split("https://youtu.be/")[1]}
                  />
                ) : item.file_type === "vimeo" ? (
                  <YoutubeVideoPlayer
                    type="vimeo"
                    VideoId={item.file_link.split("https://vimeo.com/")[1]}
                  />
                ) : null}
                <Text style={styles.title}>{item.title}</Text>
                {item.description && (
                  <Field title="Description" value={item.description} />
                )}
              </View>
            );
          })}
        </ScrollView>
      </Screen>
    </>
  );
};

export default ContentDetailScreen;
