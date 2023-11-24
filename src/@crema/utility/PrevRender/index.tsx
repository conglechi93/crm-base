import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {initialUrl} from 'shared/constants/AppConst';

type PrevRenderProps = {
  children: React.ReactNode;
};
export const PrevRender = (prop: PrevRenderProps) => {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState<any>(null);
  const {children} = prop;
  const dispatch = useAppDispatch();
  // const {accessToken} = useAppSelector((state) => state.auth);
  const {shopInfo} = useAppSelector((state) => state.shop);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const pathName = /^\/[^/]*\/?$/.test(router?.pathname);
  useEffect(() => {
    if (shopInfo) {
      if (pathName) {
        router.push(initialUrl);
      } else {
        router.push(currentUrl);
      }
    }
  }, [shopInfo]);
  return <>{children}</>;
};
