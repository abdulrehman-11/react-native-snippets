import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
} from "react-native";
import AudioRecord from "react-native-audio-record";
import Modal from "react-native-modal";
import RNFS from "react-native-fs";

import { Colors, Icons } from "../common";
import { Text } from ".";
import { Button } from "./Buttons";
import AudioRecordPlayer from "./AudioRecordPlayer";

const initalValues = {
  audioFile: "",
  recording: false,
  loaded: false,
  paused: true,
};

const AudioRecorder = ({ visible, setVisible, onUpload }) => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(initalValues);
  const [audioFile, setAudioFile] = useState(null);

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permissions Android Done");
      } else console.log("Permissions Android Failed");
    }
  };

  const start = () => {
    setState({ audioFile: "", recording: true, loaded: false });
    AudioRecord.start();
  };

  const stop = async () => {
    if (!state.recording) return;

    let audioFile = await AudioRecord.stop();
    setState({ audioFile, recording: false });
  };

  const setData = async () => {
    await requestPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "member_audio.wav",
    };

    AudioRecord.init(options);

    AudioRecord.on("data", async () => {
      const file = await RNFS.readFile(
        RNFS.DocumentDirectoryPath + "/member_audio.wav",
        "base64"
      );

      setAudioFile(`data:audio/wav;base64,${file}`);
    });
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
            setAudioFile(null);
            setState(initalValues);
          }}
        >
          <Icons.Entypo
            name="cross"
            size={30}
            color="red"
            style={{
              alignSelf: "flex-end",
              paddingRight: 10,
            }}
          />
        </TouchableOpacity>
        <View style={styles.row}>
          {!show ? (
            <TouchableOpacity
              style={styles.mainContainer}
              onPress={() => {
                start();
                setShow(true);
              }}
            >
              <View style={styles.iconContainer}>
                <Icons.Entypo name="mic" size={30} color="black" />
              </View>
              <Text style={styles.text}>Record</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.mainContainer}
              onPress={() => {
                stop();
                setShow(false);
              }}
            >
              <View style={styles.iconContainer}>
                <Icons.Entypo name="controller-stop" size={30} color="black" />
              </View>
              <Text style={styles.text}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
        {state.audioFile !== "" && (
          <>
            <AudioRecordPlayer
              link={state.audioFile}
              onDelete={() => {
                setState(initalValues);
              }}
            />
            <Button
              title="Upload"
              gradient
              onPress={() => {
                onUpload(audioFile);
                setAudioFile(null);
                setState(initalValues);
              }}
            />
          </>
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    paddingVertical: "5%",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  mainContainer: {
    alignItems: "center",
    alignContent: "center",
  },
  text: {
    color: Colors.black,
  },
  iconContainer: {
    backgroundColor: Colors.darkBlue,
    padding: 10,
    borderRadius: 25,
  },
});

export default AudioRecorder;
