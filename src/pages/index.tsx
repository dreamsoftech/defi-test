import { Web3ReactProvider } from '@web3-react/core'

import { getLibrary } from '../context'

const Home = () => {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <h1>Defi Test app</h1>
    </Web3ReactProvider>
  )
}

export default Home
