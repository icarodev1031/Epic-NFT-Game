import { ethers } from "ethers";
import Head from "next/head";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { useDapp } from "../contexts/DappContext"
import { SpecialAttackProps } from "../utils/contracts";

function SpecialAttack() {
    const {
        gameContract,
        isLoading,
        currentCharacter,
        fetchSpecialAttacks,
        buySpecialAttack
    } = useDapp();
    const [specialAttacks, setSpecialAttacks] = React.useState<SpecialAttackProps[]>([])
    const fetch = async () => {
        var data = await fetchSpecialAttacks();
        setSpecialAttacks(data)
    }
    useEffect(() => {
        if (gameContract && !isLoading) {
            fetch();
        }
    }, [gameContract, isLoading])
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <Head>
                <title>Epic NFT Game</title>
                <meta name="description" content="Epic NFT Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="w-full h-screen px-3 bg-indigo-600 lg:px-6 overflow-auto">
                <div className="mx-auto max-w-7xl">
                    <Navbar />
                    <section className="my-10 py-12 sm:py-16 bg-white rouned-3xl">
                        <div className="max-w-7xl px-10 mx-auto sm:text-center">
                            <p className="text-blue-500 font-medium uppercase">
                                Buy Special Attacks for you Character
                            </p>
                            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mt-3">
                                Use Special Power for more Damage
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-12 sm:my-16">
                                {specialAttacks &&
                                    specialAttacks.map((attack, index) => {
                                        var hasSpecialAttack = false;
                                        currentCharacter?.specialAttacks.forEach(
                                            (specialAttack) => {
                                                if (specialAttack.eq(attack.specialAttackIndex)) {
                                                    hasSpecialAttack = true;
                                                }
                                            }
                                        )
                                        return (
                                            <div key={index} className="rounded-lg py-10 flex flex-col items-center justify-center shadow-lg border border-gray-100">
                                                <img
                                                    src={attack.specialAttackImage}
                                                    className="h-20 w-20"
                                                />

                                                <div className="flex flex-col items-start w-full px-6">
                                                    <p className="mt-8 text-sm text-gray-600 text-bold font-semibold">
                                                        Name - {attack.specialAttackName}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-600 text-bold font-semibold">
                                                        Damage - {attack.specialAttackDamage.toNumber()} HP
                                                        Points
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-600 text-bold font-semibold">
                                                        Price - {ethers.utils.formatEther(attack.price)}{" "}
                                                        EPIC Tokens
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-600 text-bold font-semibold">
                                                        Used By - All Characters
                                                    </p>
                                                </div>
                                                <div className="block w-full px-6 mt-5">
                                                    <button
                                                        className="w-full px-10 py-3 font-bold text-white bg-blue-600 rounded-lg"
                                                        onClick={async () => {
                                                            if (!currentCharacter) {
                                                                toast(
                                                                    `Please mint a character first to buy special attacks`,
                                                                    {
                                                                        draggable: true,
                                                                        closeOnClick: true,
                                                                        autoClose: 4000,
                                                                        progress: undefined,
                                                                        type: "error",
                                                                    }
                                                                );
                                                            } else if (hasSpecialAttack) {
                                                                toast(`You already have this special attack`, {
                                                                    draggable: true,
                                                                    closeOnClick: true,
                                                                    autoClose: 4000,
                                                                    progress: undefined,
                                                                    type: "error",
                                                                });
                                                            } else {
                                                                await buySpecialAttack(
                                                                    attack.price,
                                                                    attack.specialAttackIndex
                                                                );
                                                                fetch();
                                                            }
                                                        }}
                                                    >
                                                        {hasSpecialAttack ? "Owned" : "Buy"}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}

export default SpecialAttack;