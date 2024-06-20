import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../../components';
import Header from '../../components/HeaderComponents/Header';
import {useRoute} from '@react-navigation/native';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {useAuth, useLoader} from '../../hooks';
import {showErrorMessage} from '../../utils/toastMessages';
import styles from './styles';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import IndependentTable from '../../components/SafetyEvaluationsComponents/IndependentTable';

const SafetyEvaluationDetails = () => {
  const {params} = useRoute();
  const {setLoading} = useLoader();
  const {Logout} = useAuth();
  const {t} = useTranslation();
  const [evaluation, setEvaluation] = useState();
  const [trainingForm, setTrainingForm] = useState(
    Array.from({length: 3}, (_, index) => ({
      id: index + 1,
      score: null,
      comments: '',
    })),
  );
  const [maintainingJobSiteSafetyForm, setMaintainingJobSiteSafetyForm] =
    useState(
      Array.from({length: 5}, (_, index) => ({
        id: index + 1,
        score: null,
        comments: '',
      })),
    );
  const [safetyLeadershipSkillsForm, setSafetyLeadershipSkillsForm] = useState(
    Array.from({length: 2}, (_, index) => ({
      id: index + 1,
      score: null,
      comments: '',
    })),
  );
  const [
    postAccidentResponsibilitiesForm,
    setPostAccidentResponsibilitiesForm,
  ] = useState(
    Array.from({length: 3}, (_, index) => ({
      id: index + 1,
      score: null,
      comments: '',
    })),
  );
  const [safetyViolationsForm, setSafetyViolationsForm] = useState(
    Array.from({length: 2}, (_, index) => ({
      id: index + 1,
      score: null,
      comments: '',
    })),
  );
  const getEvaluation = async () => {
    setLoading(true);
    const response = await ApiCall.get(
      ApiRoutes.getSafetyEvaluationDetail + params.id,
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
    let tempResp = response?.data?.safetyEvaluation;
    setEvaluation(tempResp);
    setTrainingForm(tempResp?.training);
    setMaintainingJobSiteSafetyForm(tempResp?.jobSiteSafety);
    setSafetyLeadershipSkillsForm(tempResp?.safetyLeaderShipSkills);
    setSafetyViolationsForm(tempResp?.safetyViolations);
    setPostAccidentResponsibilitiesForm(tempResp?.postAccidentResponsibilities);
    setLoading(false);
  };
  useEffect(() => {
    getEvaluation();
  }, []);
  const training = {
    subHeader: t('Training'),
    list: [
      {
        label: t('ForemanTraining'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanAccidentInvestigation'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanWeeklySafety'),
        value: null,
        text: '',
      },
    ],
  };
  const maintainingJobSiteSafety = {
    subHeader: t('MaintainingJobSiteSafety'),
    list: [
      {
        label: t('ForemanStandardsSafety'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanInvolvedInPrePlanning'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanConductSafetyInspections'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanPromptlyCorrectsUnsafe'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanPromptlyAddressesUnsafe'),
        value: null,
        text: '',
      },
    ],
  };
  const safetyLeadershipSkills = {
    subHeader: t('SafetyLeadershipSkills'),
    list: [
      {
        label: t('ForemanDemonstratesCommitment'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanLeadsByExample'),
        value: null,
        text: '',
      },
    ],
  };
  const postAccidentResponsibilities = {
    subHeader: t('PostAccidentResponsibilities'),
    list: [
      {
        label: t('HasForemanCompletedEvaluation'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanReporsIncidentTimely'),
        value: null,
        text: '',
      },
      {
        label: t('ForemanAssistsIncidentTimely'),
        value: null,
        text: '',
      },
    ],
  };
  const safetyViolations = {
    subHeader: t('SafetyViolations'),
    list: [
      {
        label: t('HasForemanCompletedEvaluationWithoutWarning'),
        value: null,
        text: '',
      },
      {
        label: t('HasForemanCompletedEvaluationWithoutOSHA'),
        value: null,
        text: '',
      },
    ],
  };
  return (
    <Screen>
      <Header />
      <View style={styles.upperContainer}>
        <View style={styles.textLabelContainer}>
          <Text style={styles.labelText}>{t('Date')}:</Text>
          <Text style={styles.valueText}>
            {moment(evaluation?.date).format('YYYY-MM-DD')}
          </Text>
        </View>
        <View style={styles.textLabelContainer}>
          <Text style={styles.labelText}>{t('EvaluatedBy')}:</Text>
          <Text style={styles.valueText}>{evaluation?.evaluatedBy}</Text>
        </View>
      </View>
      <ScrollView>
        <IndependentTable
          data={training}
          formData={trainingForm}
          firstOne={true}
        />
        <IndependentTable
          data={maintainingJobSiteSafety}
          formData={maintainingJobSiteSafetyForm}
        />
        <IndependentTable
          data={safetyLeadershipSkills}
          formData={safetyLeadershipSkillsForm}
        />
        <IndependentTable
          data={postAccidentResponsibilities}
          formData={postAccidentResponsibilitiesForm}
        />
        <IndependentTable
          data={safetyViolations}
          formData={safetyViolationsForm}
        />
      </ScrollView>
    </Screen>
  );
};

export default SafetyEvaluationDetails;
