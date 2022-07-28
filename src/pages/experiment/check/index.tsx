import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import { Button } from '@app/components/Button';
import { Encoder02LongVisualizerConfig } from '@app/constants/visualizerConfig';
import { deleteExpStorages } from '@app/utils/localStorageUtils';
import { url } from '@app/utils/urlConfig';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './check.module.scss';

const CheckPage: NextPage = () => {
  const router = useRouter();

  const [hasCheckedAll, setHasCheckedAll] =
    React.useState(false);

  const handleCheck = React.useCallback(() => {
    const checkList =
      document.querySelectorAll('.check__item');
    const checkedList = document.querySelectorAll(
      '.check__item:checked',
    );
    if (checkList.length === checkedList.length) {
      setHasCheckedAll(true);
    } else {
      setHasCheckedAll(false);
    }
  }, []);

  const startHandler = React.useCallback(() => {
    deleteExpStorages();
    router.push('/experiment/settingshape');
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p>
          実験の開始に当たって、いくつか注意事項、禁止事項、音声の再生確認がございます。
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
        <ul className={styles.check__list}>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            必ずPCで実験に参加してください。
          </li>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            必ずブラウザは
            <span className={styles.alert}>Chrome</span>
            で参加してください。Chrome以外のブラウザでこのページを開いている場合、Chromeでこのページを開きなおしてください。
          </li>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            静かな環境で、必ずイヤホンまたはヘッドホンを装着して実験に参加してください。
          </li>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            所要時間は約40分です。一度実験を始めたら最後まで中断することなく実験を行ってください。
          </li>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            実験の途中で前のページに戻ったり、ページを再読み込みしたりすると、エラーが発生してしまう可能性があります。実験が終了するまで、そのような行為は行わないでください。
          </li>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            独自のプログラムにより、実験にいい加減に取り組んでいないかをチェックしています。あまりにいい加減に回答しているとプログラムが判定した場合、再度初めから実験をやり直していただく可能性があります。予めご了承ください。
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>禁止事項</h2>
        <ul className={styles.check__list}>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            実験中の画面のスクリーンショットを撮る行為等を含む、実験内容を漏洩するような行為は禁止とさせて頂きます。仮にそのような行為を行った場合、当方が被った損害賠償を請求いたします。
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>音声確認</h2>
        <p>
          下の音を再生し、以下の項目を確認してください。
        </p>
        <audio
          src={url('/audios/expert.wav')}
          controls
          loop
          className={styles.check__audio}
        />
        <ul className={styles.check__list}>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            音が途中でブツブツと途切れたりせず、正常に聴こえることを確認してください。
          </li>
          <li>
            <input
              type="checkbox"
              className={`check__item ${styles.check__item}`}
              onChange={handleCheck}
            />
            音が快適に聴こえる音量にPCの音量を調節してください。
          </li>
        </ul>
      </div>
      <Button
        text={'実験開始'}
        onClick={startHandler}
        disabled={!hasCheckedAll}
        className={styles.start__button}
      />
    </div>
  );
};

export default CheckPage;
