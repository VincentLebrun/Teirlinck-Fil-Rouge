import Head from "next/head";
import styles from "../styles/Home.module.scss";

import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Teirlinck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Footer />
    </div>
  );
}
