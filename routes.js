const repSoundIds = [
  'rs1_00',
  'rs1_01',
  'rs1_02',
  'rs2_00',
  'rs2_01',
  'rs2_02',
  'rs2_03',
  'rs2_04',
  'rs2_05',
  'rs2_06',
  'rs2_07',
  'rs2_08',
  'rs2_09',
  'rs2_10',
  'rs2_11',
  'rs2_12',
  'rs2_13',
  'rs2_14',
  'rs2_15',
  'rs2_16',
  'rs2_17',
  'rs2_18',
  'rs2_19',
  'rs2_20',
  'rs2_21',
  'rs2_22',
  'rs2_23',
  'rs2_24',
  'rs2_25',
  'rs2_26',
  'rs2_27',
  'rs2_28',
  'rs2_29',
];

const expSoundIds = [
  'es_1',
  'es_2',
  'es_3',
  'es_4',
  'es_5',
  'es_6',
  'es_7',
  'es_8',
  'es_9',
  'es_10',
  'es_11',
  'es_12',
  'es_13',
  'es_14',
  'es_15',
  'es_16',
  'es_17',
  'es_18',
  'es_19',
  'es_20',
  'es_21',
  'es_22',
  'es_23',
  'es_24',
  'es_25',
  'es_26',
  'es_27',
  'es_28',
  'es_29',
  'es_30',
];

const routes = {
  '/': { page: '/' },
  '/practice/shape': { page: '/practice/shape' },
  '/practice/sound': { page: '/practice/sound' },
  '/practice/latent': { page: '/practice/latent' },
  '/trial/shape': { page: '/trial/shape' },
  '/trial/sound': { page: '/trial/sound' },
  '/trial/latent': { page: '/trial/latent' },
  '/microphone': { page: '/microphone' },
  '/vae': { page: '/vae' },
  '/relation': { page: '/relation' },
  '/random': { page: '/random' },
  '/delaunay': { page: '/delaunay' },
  '/settingshape': { page: '/settingshape' },
  '/settingshape/nextroute': {
    page: '/settingshape/nextroute',
  },
  '/settingshape/step1': {
    page: '/settingshape/step1',
  },
  '/savedata': { page: '/savedata' },
  '/experiment': { page: '/experiment' },
  '/experiment/check': { page: '/experiment/check' },
  '/experiment/settingshape': {
    page: '/experiment/settingshape',
  },
  '/experiment/settingshape/nextroute': {
    page: '/experiment/settingshape/nextroute',
  },
  '/experiment/settingshape/step1': {
    page: '/experiment/settingshape/step1',
  },
  '/experiment/testshape': {
    page: '/experiment/testshape',
  },
  '/experiment/end': {
    page: '/experiment/end',
  },
};

repSoundIds.forEach((rsId) => {
  routes[`/settingshape/${rsId}`] = {
    page: '/settingshape/[repSoundId]',
  };
  routes[`/experiment/settingshape/${rsId}`] = {
    page: '/experiment/settingshape/[repSoundId]',
  };
});

expSoundIds.forEach((_, i) => {
  routes[`/experiment/testshape/${2 * i + 1}`] = {
    page: '/experiment/testshape/[order]',
  };
  routes[`/experiment/testshape/${2 * i + 2}`] = {
    page: '/experiment/testshape/[order]',
  };
});

module.exports = routes;
