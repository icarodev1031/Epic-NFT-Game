import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {useDapp} from "../contexts/DappContext";

export const Navbar = ()=>{
  const {currentAccount , connectWalletAction} =useDapp();
  const router = useRouter();
  const [isOpen,setIsOpen]= useState(false);

  return(
    <>
      <nav className= "flex items-center w-full h-24 select-none">
        <div className="relative flex flex-wrap items-center justify-between w-full h-24 mx-auto font-medium md:justify-center">
          <Link href="/">
            <a className="w-1/4 py-4 pl-6 pr-4 md:pl-4 md:py-0">
              <span className="p-1 text-xl font-black leading-none text-white select-none">
                <span>Epic NFT Game</span>
                <span className="text-indigo-300">.</span>
              </span>
            </a>
          </Link>
          <div className="fixed top-0 left-0 z-40 items-center hidden w-full h-full p-3 text-xl bg-gray-900 bg-opacity-50 md:text-sm lg:text-base md:w-3/4 md:bg-transparent md:p-0 md:relative md:flex">
            <div className="flex-col w-full h-full overflow-hidden bg-white rounded-lg select-none md:bg-transparent md:rounded-none md:relative md:flex md:flex-row md:overflow-auto">
              <div className="flex flex-col items-center justify-center w-full h-full mt-12 text-center text-indigo-700 md:text-indigo-200 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                <Link href="/">
                  <a
                    className={`inline-block px-4 py-2 mx-2 font-bold text-left ${
                      router.pathname == "/" ? "text-white" : ""
                    }  md:px-0 lg:mx-5 md:text-center md:hover:text-white`}
                  >
                    Home
                  </a>
                </Link>
                <Link href="/play">
                  <a
                    className={`inline-block px-4 py-2 mx-2 font-bold text-left ${
                      router.pathname == "/play" ? "text-white" : ""
                    }  md:px-0 lg:mx-5 md:text-center md:hover:text-white`}
                  >
                    Fight Arena
                  </a>
                </Link>
                <Link href="/faucet">
                  <a
                    className={`inline-block px-4 py-2 mx-2 font-bold text-left ${
                      router.pathname == "/faucet" ? "text-white" : ""
                    }  md:px-0 lg:mx-5 md:text-center md:hover:text-white`}
                  >
                    Faucet
                  </a>
                </Link>
                <Link href="/market-place">
                  <a
                    className={`inline-block px-4 py-2 mx-2 font-bold text-left ${
                      router.pathname == "/market-place" ? "text-white" : ""
                    }  md:px-0 lg:mx-5 md:text-center md:hover:text-white`}
                  >
                    Market Place
                  </a>
                </Link>

                <Link href="/how-to-play">
                  <a
                    className={`inline-block px-4 py-2 mx-2 font-bold text-left ${
                      router.pathname == "/how-to-play" ? "text-white" : ""
                    }  md:px-0 lg:mx-5 md:text-center md:hover:text-white`}
                  >
                    How to Play
                  </a>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-end w-full h-full pt-4 md:w-1/3 md:flex-row md:py-0">
                {
                  currentAccount?(
                    <span className="font-bold inline-flex items-center justify-center px-4 py-2 mr-1 text-base leading-6 text-indigo-600 whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-transparent rounded-full hover:bg-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                      {
                        currentAccount.substring(0,7) + 
                        "....." +
                        currentAccount.substring(
                          currentAccount.length - 7,
                          currentAccount.length
                        )
                      }
                    </span>
                  ):(
                    <button 
                      onClick={()=>{
                        if (router.pathname == "/"){
                          router.push("/play");
                        }else{
                          // connectWalletAction();
                        }
                      }}
                      className="font-bold inline-flex items-center justify-center px-4 py-2 mr-1 text-base leading-6 text-indigo-600 whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-transparent rounded-full hover:bg-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                    >
                      {router.pathname == "/" ? "Play Game" : "Connect Wallet"}
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
