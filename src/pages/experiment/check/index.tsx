import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import { Button } from '@app/components/Button';
import { Encoder02LongVisualizerConfig } from '@app/constants/visualizerConfig';
import { deleteExpStorages } from '@app/utils/localStorageUtils';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './check.module.scss';

const LongFastAudioVisualizer = dynamic<
  AudioVisualizerProps<Float32Array[]>
>(
  () =>
    import('../../../components/AudioVisualizer').then(
      (module) => module.AudioVisualizer,
    ) as any,
  {
    ssr: false,
    loading: () => (
      <p className={styles.loading__text}>Loading...</p>
    ),
  },
);

const CheckPage: NextPage = () => {
  const router = useRouter();
  const startHandler = React.useCallback(() => {
    deleteExpStorages();
    router.push('/experiment/settingshape');
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p>
          実験の開始に当たって、いくつか注意事項、禁止事項、及びお使いの環境で実験を行うことができるかの動作確認がございます。
          <br />
          <span className={styles.alert}>
            以下の項目を全て確認し、全てのチェックボックスにチェックを入れたうえで、
          </span>
          <br />
          ページ下の「実験開始」ボタンを押してください。
        </p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>注意事項</h2>
        <ul>
          <li>必ずPCで実験に参加してください。</li>
          <li>
            必ずブラウザは
            <span className={styles.alert}>Chrome</span>
            で参加してください。Chrome以外のブラウザでこのページを開いている場合、Chromeでこのページを開きなおしてください。
          </li>
          <li>
            静かな環境で、必ずイヤホンを装着して実験に参加してください。
          </li>
          <li>
            所要時間は約30分です。一度実験を始めたら最後まで中断することなく実験を行ってください。
          </li>
          <li>
            実験の途中で前のページに戻ったり、ページを再読み込みしたりすると、エラーが発生してしまう可能性があります。実験が終了するまで、そのような行為は行わないでください。
          </li>
          <li>
            独自のプログラムにより、実験にいい加減に取り組んでいないかをチェックしています。あまりにいい加減に回答しているとプログラムが判定した場合、再度初めから実験をやり直していただく可能性があります。予めご了承ください。
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>禁止事項</h2>
        <ul>
          <li>
            実験中の画面のスクリーンショットを撮る行為等を含む、実験内容を漏洩するような行為は禁止とさせて頂きます。仮にそのような行為を行った場合、当方が被った損害賠償を請求いたします。
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>動作確認</h2>
        <p>
          下の音を再生し、以下の項目を確認してください。
        </p>
        <p>
          なお、一つでもうまくいっていない場合、お使いの環境で本実験を実施することが出来ません。他の環境で再度試して頂くか、それでもうまくいかない場合は、本実験への参加をご断念頂きますようお願い申し上げます。参加を検討して頂いたにもかかわらず、誠に申し訳ございません。
        </p>
        <LongFastAudioVisualizer
          audioFilePath="/audios/expert.wav"
          visualizerConfig={Encoder02LongVisualizerConfig}
          visualizeMode={'CHECK'}
          className={styles.visualizer}
        />
        <ul>
          <li>
            音が快適に聴こえる音量にPCの音量を調節してください。
          </li>
          <li>
            音が途中でブツブツと途切れたりせず、滑らかに聴こえることを確認してください。
          </li>
          <li>
            ステータスが「成功」に変わることを確認してください。(音を再生してから「成功」に変わるまでしばらくかかる可能性があります。)
          </li>
        </ul>
      </div>
      <Button text={'実験開始'} onClick={startHandler} />
    </div>
  );
};

export default CheckPage;
