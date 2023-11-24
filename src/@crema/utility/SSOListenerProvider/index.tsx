import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSearchParams} from 'react-router-dom';
import {CodeChallengePayload} from 'models/auth';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {onSetAccessToken} from 'redux/actions/Auth';
import {createChallenge} from 'utils/CodeChallenge';

type SSOListenerProps = {
  children: React.ReactNode;
};
export const SSOListenerProvider = (prop: SSOListenerProps) => {
  console.log('SSOListener');
  const {children} = prop;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector((state) => state.auth);
  // const [searchParams, setSearchParams] = useSearchParams('');
  const [isLoading, setIsLoading] = useState(true);

  // const removeQueryParams = (paramName: string) => {
  //   const param = searchParams.get(paramName);
  //   if (param) {
  //     searchParams.delete(paramName);
  //     setSearchParams(searchParams);
  //   }
  // };

  // const handleGetAccessToken = async (
  //   codeChallengePayload: CodeChallengePayload,
  // ) => {
  //   await dispatch(onSetAccessToken(codeChallengePayload));
  //   await removeQueryParams('authCode');
  // };

  useEffect(() => {
    const REACT_APP_SSO_SERVER_URL = process.env.REACT_APP_SSO_SERVER_URL;
    console.log('REACT_APP_SSO_SERVER_URL', REACT_APP_SSO_SERVER_URL);
    // const authCode = searchParams.get('authCode');
    // if (authCode && !accessToken) {
    //   const codeVerifier = localStorage.getItem('codeVerifier');
    //   const codeChallengePayload = {
    //     authCode: authCode,
    //     codeVerifier: codeVerifier,
    //   };
    //   handleGetAccessToken(codeChallengePayload);
    //   return;
    // }
    // if (!accessToken) {
    //   const handleRedirectToSSO = async () => {
    //     const REACT_APP_SSO_SERVER_URL = process.env.REACT_APP_SSO_SERVER_URL;
    //     const APP_CODE = process.env.REACT_APP_SSO_APP_CODE;
    //     const CLIENT_ID = process.env.REACT_APP_SSO_CLIENT_ID;
    //     const challenge = await createChallenge();
    //     const urlObj = new URL(window.location.href);
    //     urlObj.hash = '';
    //     window.history.pushState('', '', urlObj);
    //     const redirectTo = window.location.href;
    //     const codeVerifier = challenge.code_verifier;
    //     localStorage.setItem('codeVerifier', codeVerifier);
    //     const codeChallenge = challenge.code_challenge;
    //     const url = `${REACT_APP_SSO_SERVER_URL}?redirectTo=${redirectTo}&appCode=${APP_CODE}&clientId=${CLIENT_ID}&codeChallenge=${codeChallenge}`;
    //     router.push(url);
    //   };
    //   handleRedirectToSSO();
    // }
    // setIsLoading(false);
  }, [accessToken]);
  return <>{isLoading ? null : children}</>;
};
