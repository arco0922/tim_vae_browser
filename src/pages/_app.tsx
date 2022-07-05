import './global.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>tim_vae_browser</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
