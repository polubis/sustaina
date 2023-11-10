import React from 'react';
import { Header } from './header';
import { Calculator } from './calculator';

const HomeView = () => {
  return (
    <>
      <Header />
      <main>
        <Calculator />
      </main>
      <footer></footer>
    </>
  );
};

export default HomeView;
