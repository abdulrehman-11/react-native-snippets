const config = {
  screens: {
    Training: {path: 'Trainings'},
    MyCertificates: {
      path: 'MyCertificates',
    },
    TrainingDetails: {
      path: 'training/training-details/:id',
      parse: {
        id: id => `${id}`,
      },
    },
  },
};

const linking = {
  prefixes: ['https://user-panel.rooftechnologypartners.com/', 'roofingapp://'],
  config,
};

export default linking;
