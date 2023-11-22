import axios, { CancelTokenSource } from 'axios'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useStore } from 'react-redux'
import { axiosInstance } from './Request'
const cancelTokens: { [k: string]: CancelTokenSource | null } = {}
let cancelTokensIndex = 'DEFAULT'

/**
 * Flag trang thai co dang chay refresh token hay khong
 */
let isRefreshing = false

/**
 * Queue luu lai nhung request bi loi 401 de thuc hien xu ly sau khi refresh new token
 */
let failedQueue: any = []

export class AxiosRequestCancleToken {
  static cancel(key: string = 'DEFAULT') {
    cancelTokens?.[key]?.cancel()
  }

  static setIndex(key: string = 'DEFAULT') {
    cancelTokensIndex = key
  }

  static getToken() {
    if (!cancelTokens[cancelTokensIndex]) this.generate(cancelTokensIndex)
    return cancelTokens?.[cancelTokensIndex]?.token
  }

  static generate(key: string = 'DEFAULT') {
    const source = axios.CancelToken.source()
    if (key) cancelTokens[key] = source
    else cancelTokens['DEFAULT'] = source
    this.setIndex(key)
  }
}

const useRequestInterceptor = () => {
  const { messages } = useIntl()
  const dispatch = useDispatch()
  const store = useStore()
  const [ready, setReady] = useState(true)
  setReady(true)
  useEffect(() => {
    console.log('useRequestInterceptor')
  }, [])
  return ready
}

const RequestInterceptor = ({ children }: React.PropsWithChildren<any>) => {
  const initialized = useRequestInterceptor()
  console.log('initialized', initialized)
  if (initialized) return children
  else return null
}

export { useRequestInterceptor, RequestInterceptor }
