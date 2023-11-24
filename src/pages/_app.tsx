import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import AppContextProvider from '../@crema/utility/AppContextProvider';
import {Provider} from 'react-redux';
import AppThemeProvider from '../@crema/utility/AppThemeProvider';
import AppStyleProvider from '../@crema/utility/AppStyleProvider';
import AppLocaleProvider from '../@crema/utility/AppLocaleProvider';
import {useStore} from '../redux/store'; // Client-side cache, shared for the whole session of the user in the browser.
import {EmotionCache} from '@emotion/cache';
import {RequestInterceptor} from 'api/RequestInterceptor';
import '../@crema/services/index';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/all.scss';
import {SSOListenerProvider} from '@crema/utility/SSOListenerProvider';
import {BrowserRouter} from 'react-router-dom';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Vars CRM</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <AppContextProvider>
        <Provider store={store}>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                <SSOListenerProvider>
                  <RequestInterceptor>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </RequestInterceptor>
                </SSOListenerProvider>
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
        </Provider>
      </AppContextProvider>
    </CacheProvider>
  );
}
