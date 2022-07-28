import './global.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { Timestamp } from '@app/@types';
import { localStorageKeys } from '@app/constants/localStorageKeys';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  React.useEffect(() => {
    if (
      window === undefined ||
      !router.pathname.startsWith('/experiment') ||
      router.asPath.includes('nextroute') ||
      router.asPath.includes('[repSoundId]') ||
      router.asPath.includes('[order]')
    )
      return;
    const expTimestampsStorage = localStorage.getItem(
      localStorageKeys.EXP_TIMESTAMPS,
    );
    const expTimestamps = (
      expTimestampsStorage
        ? JSON.parse(expTimestampsStorage)
        : []
    ) as Timestamp[];
    const path = router.asPath;
    const time = new Date().getTime();
    const timestamp = [path, time] as Timestamp;
    expTimestamps.push(timestamp);
    localStorage.setItem(
      localStorageKeys.EXP_TIMESTAMPS,
      JSON.stringify(expTimestamps),
    );
  }, [router]);

  return (
    <>
      <Head>
        <title>tim_vae_browser</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
