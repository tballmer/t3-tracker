import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>t3-tracker</title>
        <meta name="description" content="Makes tracking issues simple" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          <span className="text-purple-300">T3</span> Tracker
        </h1>
        <h3 className="text-2xl text-gray-600 pb-6">
          Issue Tracking Done Simple
        </h3>
        <button className="px-4 py-1 text-lg bg-violet-500 text-white font-semibold rounded-full hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700">
          Get Started
        </button>
      </main>
    </>
  );
};

export default Home;
