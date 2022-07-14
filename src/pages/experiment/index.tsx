import { Button } from '@app/components/Button';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './experiment.module.scss';

const ExpTop: NextPage = () => {
  const router = useRouter();
  const goNextHandler = React.useCallback(() => {
    router.push('/experiment/check');
  }, [router]);
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.title}>研究説明</h2>
        <p>
          東京大学、葛岡・雨宮・鳴海研究室所属の新井康太と申します。
        </p>
        <p>
          この度は、web実験へのご協力ありがとうございます。
        </p>
        <p>
          実験へのご協力に際し、以下の研究説明書をお読み下さい。
          <br />
          <span className={styles.alert}>
            この研究説明書の内容に同意できる方のみ実験に参加することが出来ます。
          </span>
        </p>
        <p>
          何か分からないことがございましたら、Lancersのメッセージ、
          <br />
          もしくは研究説明書に記載されているメールアドレスまでご連絡下さい。
        </p>
        <p>研究説明書 (pdfファイル、1.7MB)：ダウンロード</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>同意確認</h2>
        <p>以下の項目について、説明を受け理解しました。</p>
        <ul>
          <li>この研究の概要について</li>
          <li>研究協力の任意性と撤回の自由について</li>
          <li>個人情報の保護について</li>
          <li>研究結果の発表について</li>
          <li>
            研究参加者にもたらされる利益及び不利益について
          </li>
          <li>情報の取り扱い方針について</li>
          <li>費用負担について</li>
          <li>その他について</li>
        </ul>
        <p>
          上記研究への参加にあたり、説明文書の記載事項について説明を受け、
          <br />
          これを十分に理解できましたので本研究の研究参加者となることに同意いたします。
        </p>
      </div>
      <Button
        text={'次のページへ'}
        onClick={goNextHandler}
      />
    </div>
  );
};

export default ExpTop;
