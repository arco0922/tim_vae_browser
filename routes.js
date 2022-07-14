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

const routes = {
  '/': { page: '/' },
  '/vae': { page: '/vae' },
  '/random': { page: '/random' },
  '/delaunay': { page: '/delaunay' },
  '/settingshape': { page: '/settingshape' },
  '/settingshape/nextroute': {
    page: '/settingshape/nextroute',
  },
};

repSoundIds.forEach((rsId) => {
  routes[`/settingshape/${rsId}`] = {
    page: '/settingshape/[repSoundId]',
  };
});

module.exports = routes;
