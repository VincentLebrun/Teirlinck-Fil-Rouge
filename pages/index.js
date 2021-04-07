import Head from "next/head";

import Header from "../components/Header"
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Teirlinck</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/icons/uicons/css/uicons-regular-rounded.css" rel="stylesheet"></link>
      </Head>
      <Header />

      <h2>lol</h2>
      <Footer />
    </div>
  );
}
