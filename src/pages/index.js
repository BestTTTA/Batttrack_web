
import Head from "next/head";
import Login from "./login";

export default function Home() {
  return (
    <>
      <Head>
        <title>Battery Tracking</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Login />
      </main>
    </>
  );
}
