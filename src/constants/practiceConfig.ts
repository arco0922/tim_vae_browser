import { NumVector } from '@app/@types/index';
import { EncoderId } from '@app/constants/encoders';

export interface PracticeGoalInfo {
  audioFilePath: string;
  coord: { [encoderId in EncoderId]?: NumVector };
}

export interface PracticeConfig {
  goalInfo: PracticeGoalInfo;
  mode: 'SOUND' | 'SHAPE' | 'LATENT';
  encoderId: EncoderId;
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
