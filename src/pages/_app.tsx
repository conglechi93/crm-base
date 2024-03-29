import React, {useEffect, useState} from 'react';
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
import {persistor, store, useStore} from '../redux/store'; // Client-side cache, shared for the whole session of the user in the browser.
import {EmotionCache} from '@emotion/cache';
import {RequestInterceptor} from 'api/RequestInterceptor';
import '../@crema/services/index';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/all.scss';
import {BrowserRouter} from 'react-router-dom';
import {SSOListenerProvider} from '@crema/utility/SSOListenerProvider';
import {PersistGate} from 'redux-persist/integration/react';
import {PrevRender} from '@crema/utility/PrevRender';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  // const store = useStore(pageProps.initialReduxState);
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  return (
    isBrowser && (
      <BrowserRouter>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Vars CRM</title>
            <meta
              name='viewport'
              content='initial-scale=1, width=device-width'
            />
          </Head>
          <AppContextProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <SSOListenerProvider>
                  <AppThemeProvider>
                    <AppStyleProvider>
                      <AppLocaleProvider>
                        <RequestInterceptor>
                          <PrevRender>
                            <CssBaseline />
                            <Component {...pageProps} />
                          </PrevRender>
                        </RequestInterceptor>
                      </AppLocaleProvider>
                    </AppStyleProvider>
                  </AppThemeProvider>
                </SSOListenerProvider>
              </PersistGate>
            </Provider>
          </AppContextProvider>
        </CacheProvider>
      </BrowserRouter>
    )
  );
}
