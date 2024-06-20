import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Vimeo } from "react-native-vimeo-iframe";
import Youtube from "react-native-youtube-iframe";

const YoutubeVideoPlayer = ({ VideoId, type = "youtube" }) => {
  if (type !== "youtube") {
    return (
      <View style={{ width: "100%", height: 200 }}>
        <Vimeo videoId={VideoId} params={"api=1&autoplay=0"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Youtube
        width="100%"
        height="100%"
        videoId={VideoId}
        allowWebViewZoom={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default YoutubeVideoPlayer;
