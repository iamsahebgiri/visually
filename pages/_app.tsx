import "styles/globals.css";
import "styles/fonts.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import seo from 'site.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seo} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
