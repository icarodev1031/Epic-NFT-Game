declare let window: any;
import type { NextPage } from 'next';
import Head from "next/head";
import Link from "next/link";
// import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import {TOKEN_CONTRACT_ADDRESS} from "../utils/constants";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Epic NFT Game</title>
                <meta name="description" content="Epic NFT Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="w-full px-3 antialiased bg-indigo-600 lg:px-6">
                <div className="mx-auto max-w-7xl">
                    <Navbar />
                    <div className="container py-32 mx-auto text-center sm:px-4">
                        <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-6xl xl:text-7xl">
                            <span className="block">Epic NFT Based Game</span>{" "}
                            <span className="relative inline-block mt-3 text-white">
                                Build on Ethereum
                            </span>
                        </h1>
                        <div className="max-w-lg mx-auto mt-6 text-sm text-center text-indigo-200 md:mt-12 sm:text-base md:max-w-xl md:text-lg xl:text-xl">
                            If you are ready to enter Marvel Universe and Fight Thanos, then
                            you are in the right place. Buckle up and get ready to fight.
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-2 pt-32 bg-white md:px-0">
                <div className="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-left text-gray-900 sm:text-5xl md:text-6xl md:text-center">
                        <span className="block">
                            Use our{" "}
                            <span className="block mt-1 text-purple-500 lg:inline lg:mt-0">
                                Market Place
                            </span>{" "}
                            to buy <br />
                            Special Sttacks
                        </span>
                    </h1>
                    <p className="w-full mx-auto text-base text-left text-gray-500 sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
                        Team up with your friends and conquer the enemy. Each character in
                        Epic NFT Game has unique abilities and skills.
                    </p>
                    <div className="relative flex flex-col justify-center md:flex-row md:space-x-4">
                        <Link href="/play">
                            <a className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-purple-500 rounded-md md:mb-0 hover:bg-purple-700 md:w-auto">
                                Start Now
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </Link>
                        <Link href="/market-place">
                            <a className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                                Market Place
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="container items-center max-w-4xl px-5 mx-auto mt-16 text-center rounded-3xl">
                    {/* <img src="/images/game-play.png" className="rounded-3xl" /> */}
                    <div
                        style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
                    >
                        <iframe
                            src="https://www.loom.com/embed/622a6a7d42c14d0eb569256154cc1b35"
                            frameBorder="0"
                            // webkitAllowFullScreen={true}
                            // mozAllowFullScreen={true}
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        ></iframe>
                    </div>
                </div>
            </section>
            <section className="bg-white pt-10 pb-5">
                <div className="container px-8 mx-auto sm:px-12 lg:px-20 flex justify-center">
                <button
                    onClick={async () => {
                    const wasAdded = await window.ethereum.request({
                        method: "wallet_watchAsset",
                        params: {
                        type: "ERC20",
                        options: {
                            address: TOKEN_CONTRACT_ADDRESS,
                            symbol: "EPIC",
                            decimals: 18,
                        },
                        },
                    });
                    }}
                    className="font-bold inline-flex items-center justify-center px-4 py-2 mr-1 text-base leading-6 text-white whitespace-no-wrap transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-full hover:bg-white hover:text-indigo-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                >
                    Add EPIC token to Metamask
                </button>
                </div>
            </section>
        </>
    )
}

export default Home;