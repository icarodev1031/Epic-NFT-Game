import Head from "next/head";
import Img from "next/image";
import React from "react";
import { useDapp } from "../contexts/DappContext";

function Index() {
  const { currentAccount, connectWalletAction } = useDapp();
  return (
    <>
      <Head>
        <title>Simple Dapp</title>
      </Head>
      <div className="h-screen w-screen flex flex-col space-y-5 justify-center items-center">
        <button
          className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center"
          onClick={() => {
            if (!currentAccount) {
              connectWalletAction();
            } else {
              alert("Already Connected");
            }
          }}
        >
          <Img src={"/metamask.png"} width={40} height={40} />
          <span className="text-xl font-extrabold pl-3">
            {currentAccount ? "Connected 😀" : "Connect Metamask"}
          </span>
        </button>
        {currentAccount && (
          <p className="font-bold text-lg">
            Address :{" "}
            <span className="bg-gray-200 px-2 py-1 rounded-lg">
              {currentAccount}
            </span>
          </p>
        )}
      </div>
    </>
  );
}

export default Index;
