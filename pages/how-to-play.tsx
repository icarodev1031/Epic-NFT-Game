import Head from "next/head";
import React from "react";
import AddNetwork from "../components/AddNetwork";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { useDapp } from "../contexts/DappContext";

function HowToPlay() {
  const { currentAccount, currentBalance, isLoading, faucet, error } =
    useDapp();
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
          <div className="container py-10 mx-auto text-center sm:px-4">
            <section className="relative py-16 bg-white min-w-screen animation-fade animation-delay rounded-2xl">
              <div className="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
                <p className="text-xs font-bold text-left text-pink-500 uppercase sm:mx-6 sm:text-center sm:text-normal sm:font-bold">
                  F.A.Q
                </p>
                <h3 className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
                  Learn how to play this Game
                </h3>
                <div className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-8 sm:py-5 sm:shadow lg:w-5/6 xl:w-2/3">
                  <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                    1. Get a Metamask Wallet
                  </h3>
                  <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                    MetaMask is a software cryptocurrency wallet used to
                    interact with the Ethereum blockchain. You can download
                    Metamask from here for you browser.{" "}
                    <a
                      className="text-indigo-600 hover:text-indigo-500 font-bold"
                      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                      target={"_blank"}
                    >
                      Chrome
                    </a>{" "}
                    /{" "}
                    <a
                      className="text-indigo-600 hover:text-indigo-500 font-bold"
                      href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
                      target={"_blank"}
                    >
                      Firefox
                    </a>
                  </p>
                </div>
                <div className="w-full px-6 py-6 mx-auto mt-5 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-5 sm:shadow lg:w-5/6 xl:w-2/3">
                  <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                    2. Get some Testnet Ether
                  </h3>
                  <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                    You can get some Testnet Ether for FREE by using the{" "}
                    <a
                      target={"_blank"}
                      className="text-indigo-600 hover:text-indigo-500 font-bold"
                      href="https://faucets.chain.link/rinkeby"
                    >
                      faucet
                    </a>
                    . You need ETH for making transactions.
                  </p>
                </div>
                <div className="w-full px-6 py-6 mx-auto mt-5 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-5 sm:shadow lg:w-5/6 xl:w-2/3">
                  <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                    3. Connect to Ethereum Rinkby Network
                  </h3>
                  <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                    Open metamask, click on network name and select{" "}
                    <strong>Rinkby Test Network</strong>
                  </p>
                </div>
                <div className="w-full px-6 py-6 mx-auto mt-5 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-5 sm:shadow lg:w-5/6 xl:w-2/3">
                  <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                    4. Get some EPIC tokens
                  </h3>
                  <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                    Head over to{" "}
                    <a
                      target={"_blank"}
                      className="text-indigo-600 hover:text-indigo-500 font-bold"
                      href="https://epic-nft.xyz/faucet"
                    >
                      Faucet section
                    </a>{" "}
                    of the website and request for some EPIC tokens. You will
                    need EPIC token to mint new NFT and buy from marketplace.
                  </p>
                </div>
                <div className="w-full px-6 py-6 mx-auto mt-5 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-5 sm:shadow lg:w-5/6 xl:w-2/3">
                  <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                    5. Play the Game
                  </h3>
                  <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                    Go to{" "}
                    <a
                      target={"_blank"}
                      className="text-indigo-600 hover:text-indigo-500 font-bold"
                      href="https://epic-nft.xyz/play"
                    >
                      Play tab
                    </a>
                    , if you are new mint your character for the first time and
                    then start playing.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default HowToPlay;
