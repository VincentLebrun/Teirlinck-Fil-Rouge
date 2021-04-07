import Head from "next/head";

import Header from "../components/Header"
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Teirlinck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <h2>lol</h2>
      <Footer />
    </div>
  );
}
