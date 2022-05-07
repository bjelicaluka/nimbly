import React from "react";
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from "./HomepageHeader.module.css";
import Translate from '@docusaurus/Translate';

export default function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <ThemedImage
            className={styles.logo}
            alt="Nimbly logo"
            sources={{
              light: useBaseUrl("images/logo.svg"),
              dark: useBaseUrl("images/logo-dark.svg"),
            }}
          />
        </div>
        <div className={styles.right}>
          <h1 className="title">Nimbly</h1>
          <p >
            <Translate>A simple JavaScript framework that puts the focus on implementing the business logic.</Translate>
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/get-started/chat">
              <Translate>Get started</Translate>
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/v1/">
              <Translate>Documentation</Translate>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
