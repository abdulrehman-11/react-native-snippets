import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Icons} from '../common';
import {Text} from '.';
import Sound from 'react-native-sound';

const AudioRecordPlayer = ({link, onDelete}) => {
  const [music, setMusic] = useState(null);
  const [second, setSecond] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [show, setShow] = useState(false);

  const secondsToHHMMSS = seconds => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
    const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
    const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';

    return `${hrs}${mins}${scnds}`;
  };

  const play = () => {
    let summer = new Sound(link, null, err => {
      if (err) {
        console.log('hata', err);
        return;
      }
      summer.play(success => {
        console.log('end', success);
        setShow(false);
      });

      setDuration(secondsToHHMMSS(summer.getDuration()));
    });

    setMusic(summer);
  };

  useEffect(() => {
    if (music) {
      setInterval(() => {
        music?.getCurrentTime((second, play) => {
          if (parseInt(music.getDuration()) === parseInt(second)) {
            setShow(false);
          }
          setSecond(secondsToHHMMSS(second));
        });
      }, 100);
    }
  }, [music]);

  return (
    <View style={styles.container}>
      <View>
        {!show ? (
          <TouchableOpacity
            onPress={() => {
              setShow(true);
              music ? music.play() : play();
            }}>
            <Icons.Entypo name="controller-play" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              music?.pause();
              setShow(false);
            }}>
            <Icons.AntDesign name="pause" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <Text>{second}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Icons.AntDesign name="delete" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 50,
    backgroundColor: '#CCD1E4',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
  },
});

export default AudioRecordPlayer;
