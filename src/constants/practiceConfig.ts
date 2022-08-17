import { NumVector } from '@app/@types/index';

export interface PracticeGoalInfo {
  audioFilePath: string;
  coord: NumVector;
}

export interface PracticeConfig {
  goalInfo: PracticeGoalInfo;
  mode: 'SOUND' | 'SHAPE';
}

export const practiceGoal01: PracticeGoalInfo = {
  audioFilePath: '/audios/goalSounds/gs_01.wav',
  coord: [0.5147301, 0.13485481],
};
