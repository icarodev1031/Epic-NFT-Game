import { BigNumber, ethers } from "ethers";
import Head from "next/head";
import React from "react";
import AddNetwork from "../components/AddNetwork";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { useDapp } from "../contexts/DappContext";

function Play() {
  const { currentAccount, currentBalance, isLoading, faucet, error } = useDapp();
  if (error) {
    if (error === "Please connect to the Rinkeby network") {
      return <AddNetwork />;
    }
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Epic NFT Game</title>
        <meta name="description" content="Epic NFT Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full px-3 antialiased bg-indigo-600 h-screen overflow-auto lg:px-6">
        <div className="mx-auto max-w-7xl">
          <Navbar />
          <div className="container py-32 mx-auto text-center sm:px-4">
            <section className="w-full px-8 py-16 bg-gray-100 xl:px-8 rounded-3xl">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col items-center justify-start md:flex-row">
                  <div className="w-full space-y-5 md:w-3/5 md:pr-16">
                    <p className="font-medium text-blue-500 uppercase">
                      Faucet
                    </p>
                    <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                      Get Free EPIC token for your account
                    </h2>
                    <p className="text-xl text-gray-600">
                      EPIC tokens are used to mint characters and buy special attacks from the marketplace.
                    </p>
                  </div>

                  <div className="w-full mt-16 md:mt-0 md:w-2/5">
                    <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7 flex flex-col items-start">
                      <h3 className="mb-6 text-2xl font-medium text-center">
                        Mint <span className="font-bold">EPIC</span> Token
                      </h3>
                      <span className="mb-1 font-bold">
                        Address:{" "}
                        {currentAccount &&
                          currentAccount.substring(0, 7) +
                            "....." +
                            currentAccount.substring(
                              currentAccount.length - 7,
                              currentAccount.length
                            )}
                      </span>
                      <span className="mb-1 font-bold">
                        Balance:{" "}
                        {currentBalance &&
                          ethers.utils.formatEther(
                            BigNumber.from(currentBalance)
                          )}{" "}
                        EPIC Token
                      </span>
                      <span className="mb-4 font-bold">
                        Receive Amount : 20 EPIC Token
                      </span>
                      <div className="block w-full">
                        <button
                          className="w-full px-10 py-3 font-bold text-white bg-blue-600 rounded-lg"
                          onClick={async () => {
                            faucet();
                          }}
                        >
                          Mint
                        </button>
                      </div>
                      <p className="w-full mt-4 text-sm text-center text-gray-500">
                        Don't have an metamask account?{" "}
                        <a
                          href="https://metamask.io/download"
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          Download from here
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default Play;
