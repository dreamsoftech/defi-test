import { useEffect } from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { lightTheme } from '../config/theme'

import store from '../redux/store'

import Layout from '../components/Layout'

import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../context'

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Defi Test app</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={lightTheme}>
          <Provider store={store}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ThemeProvider>
      </Web3ReactProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default MyApp
