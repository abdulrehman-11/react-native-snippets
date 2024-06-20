import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import RNVideoPlayer from "react-native-video-player";
import { createThumbnail } from "react-native-create-thumbnail";

import { recreateUrl } from "../utils/helpers";
import { Colors } from "../common";

const VideoPlayer = ({ url }) => {
  // const [thumbnail, setThumbnail] = useState();
  const [loading, setLoading] = useState(0);

  // useEffect(() => {
  //   generateThumbnail();
  // }, []);

  // const generateThumbnail = () => {
  //   createThumbnail({
  //     url: url,
  //     timeStamp: 0,
  //   })
  //     .then((response) => {
  //       setThumbnail(response.path);
  //     })
  //     .catch((err) => console.log("Error in thumbnial", err));
  // };

  return (
    <>
      <RNVideoPlayer
        video={{ uri: url }}
        // thumbnail={{ uri: thumbnail }}
        // endWithThumbnail
        videoWidth={100}
        videoHeight={50}
        onBuffer={(data) => console.log({ data })}
        onLoadStart={() => {
          setLoading(1);
        }}
        onLoad={() => {
          setLoading(0);
        }}
        disableFullscreen
        style={{ marginTop: "5%" }}
      />

      <ActivityIndicator
        animating
        size={50}
        color={Colors.darkBlue}
        style={[styles.activityIndicator, { opacity: loading }]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    top: 70,
    left: 70,
    right: 70,
    height: 50,
  },
});

export default VideoPlayer;
