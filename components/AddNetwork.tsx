declare let window: any;
import React from "react";
import { RINKBY_MAINNET_PARAMS } from "../utils/constants";

function AddNetwork() {
  return (
    <>
      <section className="w-full px-3 antialiased bg-indigo-600 h-screen overflow-auto lg:px-6">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-white text-3xl font-bold">
            Please connect to the Rinkeby network
          </h1>
          <p className="text-white text-xl font-bold py-4">
            You can do this by clicking here
          </p>
          <button
            onClick={async () => {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [RINKBY_MAINNET_PARAMS],
              });
            }}
            className="font-bold inline-flex items-center justify-center px-4 py-2 mr-1 text-base leading-6 text-indigo-600 whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-transparent rounded-full hover:bg-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          >
            Add Rinkby to Metamask
          </button>
        </div>
      </section>
    </>
  );
}

export default AddNetwork;
