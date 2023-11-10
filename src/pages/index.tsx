import React from 'react';
import { useStaticQuery, type HeadFC, graphql } from 'gatsby';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { useStoreSync } from 'development-kit/use-store-sync';
import { useHomeStore } from 'store/home/store';
import HomeView from 'views/home/home.view';

export interface HomePageProps {
  site: {
    siteMetadata: {
      title: string;
      siteUrl: string;
    };
  };
}

const HomePage: React.FC = () => {
  const { site } = useStaticQuery<HomePageProps>(graphql`
    query HomePageQuery {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);

  useStoreSync(useHomeStore, { is: `ready`, ...site.siteMetadata })();

  return <ThemeToggler>{() => <HomeView />}</ThemeToggler>;
};

export default HomePage;

export const Head: HeadFC = () => <title>Home Page</title>;
