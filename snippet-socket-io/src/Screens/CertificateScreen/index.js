import {FlatList, ScrollView, View, Platform, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/HeaderComponents/Header';
import {Table, Row} from 'react-native-table-component';
import CustomTableRow from '../../components/MyCertificateComponents/CustomTableRow';
import {useTranslation} from 'react-i18next';
import lang from '../../common/languages/lang';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {useAuth, useLoader} from '../../hooks';
import RNFetchBlob from 'rn-fetch-blob';
import {Screen} from '../../components';
import styles from './styles';
import {showErrorMessage, showSuccessMessage} from '../../utils/toastMessages';
import {useIsFocused} from '@react-navigation/native';

const CertificateScreen = () => {
  const {t, i18n} = useTranslation();
  const {setLoading} = useLoader();
  const [certificates, setCertificates] = useState([]);
  const [certificatesFull, setFullCertificates] = useState([]);
  const [dataRecieved, setDataRecieved] = useState(false);
  const {Logout} = useAuth();
  const isFocused = useIsFocused();
  const tableHead = [
    t(lang.CategoryTitle),
    t(lang.ExpiryDate),
    t(lang.Certificate),
  ];
  const widthArr = [140, 140, 150];
  const returnRow = (item, index, onPress) => {
    return (
      <CustomTableRow
        data={item}
        widthArr={widthArr}
        index={index}
        onPress={onPress}
      />
    );
  };
  const GetCertificates = async () => {
    setLoading(true);
    const response = await ApiCall.get(
      ApiRoutes.getCertificate,
      (
        await config()
      ).headers,
    );
    if (!response.ok) {
      showErrorMessage(response?.data.error);

      setLoading(false);
      if (response.status == 401) {
        Logout();
      }
      return;
    }
    setDataRecieved(true);
    setFullCertificates(response.data.certificates);
    mapCertificateForTable(response.data.certificates);
    setLoading(false);
  };
  useEffect(() => {
    GetCertificates();
  }, [i18n.language, isFocused]);

  const mapCertificateForTable = certificates => {
    let newCertificate = [];
    certificates.map(certificate => {
      const {category, expiryDate} = certificate;
      newCertificate = [
        ...newCertificate,
        [category, expiryDate, 'certificate'],
      ];
    });
    setCertificates(newCertificate);
  };
  const onCertificatePress = async certificateIndex => {
    const {
      dirs: {DownloadDir, DocumentDir},
    } = RNFetchBlob.fs;
    const config = RNFetchBlob;
    const isIOS = Platform.OS === 'ios';
    const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
    var downloadURL =
      'https://www.backend.rooftechnologypartners.com/' +
      certificatesFull[certificateIndex].url;
    var ext = 'pdf';
    var file_ex = `${certificatesFull[certificateIndex].title}.pdf`;
    const fPath = `${aPath}/${file_ex}`;

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        appentExt: ext,
      },
      android: {
        fileCache: false,
        appentExt: ext,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: aPath + '/' + file_ex,
          description: 'PDF',
        },
      },
    });
    setLoading(true);
    if (isIOS) {
      RNFetchBlob.config(configOptions)
        .fetch('GET', downloadURL)
        .then(res => {
          setLoading(false);
          RNFetchBlob.ios.previewDocument('file://' + res.path());
        });
    } else {
      RNFetchBlob.config(configOptions)
        .fetch('GET', downloadURL)
        .then(res => {
          showSuccessMessage('File has been downloaded');
          setLoading(false);
        });
    }
  };
  return (
    <Screen>
      <Header />
      <ScrollView horizontal={true}>
        <View>
          <Table>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>

          {certificates?.length > 0 ? (
            <ScrollView style={styles.dataWrapper} horizontal>
              <Table
                style={{
                  padding: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 4.11,

                  elevation: 1,
                }}>
                <FlatList
                  data={certificates}
                  renderItem={({item, index}) =>
                    returnRow(item, index, onCertificatePress)
                  }
                />
              </Table>
            </ScrollView>
          ) : null}
          {dataRecieved && certificates?.length === 0 ? (
            <Text style={styles.noDataText}>{t(lang.NoData)}</Text>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default CertificateScreen;
