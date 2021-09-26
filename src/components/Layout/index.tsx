import React, { ReactNode } from 'react';
import Header from './Header';

import { Container } from '@material-ui/core'

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <main>
          {children}
        </main>
      </Container>
    </>
  )
}

export default Layout
