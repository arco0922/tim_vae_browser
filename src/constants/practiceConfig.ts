import { NumVector } from '@app/@types/index';
import { EncoderId } from '@app/constants/encoders';

export interface PracticeGoalInfo {
  audioFilePath: string;
  coord: { [encoderId in EncoderId]?: NumVector };
}

export interface PracticeConfig {
  goalInfo: PracticeGoalInfo;
  mode: 'SOUND' | 'SHAPE' | 'LATENT';
}

export const practiceGoal01: PracticeGoalInfo = {
  audioFilePath: '/audios/goalSounds/gs_01.wav',
  coord: {
    encoder02_long: [0.5147301, 0.13485481],
    encoder01_new: [-0.21044958, 0.03782072],
  },
};

export const practiceGoal02: PracticeGoalInfo = {
  audioFilePath: '/audios/goalSounds/gs_02.wav',
  coord: { encoder01_new: [-3.118562, -0.25676975] },
};

export const practiceGoal03: PracticeGoalInfo = {
  audioFilePath: '/audios/goalSounds/gs_03.wav',
  coord: {
    encoder03_arai_iphone: [-1.6408138, -0.2598094],
  },
};

export const practiceGoal04: PracticeGoalInfo = {
  audioFilePath: '/audios/goalSounds/gs_04.wav',
  coord: {
    encoder04_arai_mac: [1.4737622, 0.6487303],
  },
};

export const latestPracticeGoal = practiceGoal04;
