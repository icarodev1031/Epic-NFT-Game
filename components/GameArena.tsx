import { BigNumber } from "ethers";
import Link from "next/link";
import React from "react";
import Lottie from "react-lottie";
import { animated, useSpring } from "react-spring";
import ReactTooltip from "react-tooltip";
import { useDapp } from "../contexts/DappContext";
import { AttackProps, SpecialAttackProps } from "../utils/contracts";
import { getAttackAnimation } from "../utils/helper";
import HealthBar from "./HealthBar";
import { ClaimHealthModal } from "./modals/ClaimHealthModal";

function GameArena() {
    const { currentCharacter, bigBoss, attackBoss, attackBossWithSpecialAttack } =
        useDapp();
    const [isOpen, setIsOpen] = React.useState(false);
    const [attackOnBoss, setAttackOnBoss] = React.useState<boolean>(false);
    const [attackOnCharacter, setAttackOnCharacter] =
        React.useState<boolean>(false);
    const [attackIndex, setAttackIndex] = React.useState<BigNumber | null>(
        BigNumber.from(0)
    );

    const style = useSpring({
        from: { x: attackOnBoss ? 20 : 0 },
        to: { x: attackOnBoss ? -20 : 0 },
        loop: true,
        config: { duration: 200 },
    });

    const characterstyle = useSpring({
        from: { x: attackOnCharacter ? 20 : 0 },
        to: { x: attackOnCharacter ? -20 : 0 },
        loop: true,
        config: { duration: 200 },
    });

    const startAttack = async (attackType: AttackProps) => {
        await attackBoss(attackType.attackIndex);
        setAttackIndex(attackType.attackIndex);
        setAttackOnBoss(true);
        setTimeout(() => {
            setAttackOnBoss(false);
            setAttackIndex(BigNumber.from(8));
            setAttackOnCharacter(true);
            setTimeout(() => {
                setAttackOnCharacter(false);
            }, 3000);
        }, 3000);
    };

    const startSpecialAttack = async (attackType: SpecialAttackProps) => {
        await attackBossWithSpecialAttack(attackType.specialAttackIndex);
        setAttackIndex(BigNumber.from(8));
        setAttackOnBoss(true);
        setTimeout(() => {
            setAttackOnBoss(false);
            setAttackIndex(BigNumber.from(8));
            setAttackOnCharacter(true);
            setTimeout(() => {
                setAttackOnCharacter(false);
            }, 3000);
        }, 3000);
    };

    return (
        <>
            <ClaimHealthModal
                isOpen={isOpen}
                closeModal={() => {
                    setIsOpen(false);
                }}
            />
            <div
                className="h-screen w-full bg-gray-800 px-36"
                style={{
                    backgroundImage: "url('/images/game-arena-bg-1.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <div className="flex flex-col h-screen justify-between">
                    {/* Title */}
                    <div className="flex flex-col">
                        <div className="w-full">
                            <div
                                className="p-2 bg-white mt-5 mb-4 px-10 rounded-3xl border-red-500 border-4"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr auto 1fr",
                                    gridTemplateRows: "auto",
                                    gap: "0px 0px",
                                }}
                            >
                                <div className="flex flex-row items-center">
                                    <Link href="/">
                                        <a className="hover:text-red-500 font-semibold text-lg mr-6">
                                            Home
                                        </a>
                                    </Link>
                                    <Link href="/market-place">
                                        <a className="hover:text-red-500 font-semibold text-lg mr-6">
                                            Market Place
                                        </a>
                                    </Link>
                                    <button
                                        className="hover:text-red-500 font-semibold text-lg mr-3"
                                        onClick={() => {
                                            setIsOpen(true);
                                        }}
                                    >
                                        Claim Health
                                    </button>
                                </div>
                                <span className="font-avengers text-red-500 text-5xl text-center pt-8">
                                    Fight Arena
                                </span>
                                {/* <a
                  className="hover:text-red-500 font-semibold text-lg justify-self-end self-center"
                  href={`https://testnets.opensea.io/assets/${GAME_CONTRACT_ADDRESS}/${currentCharacter.tokenId.toNumber()}`}
                  target="_blank"
                >
                  View on OpenSea
                </a> */}
                            </div>
                        </div>
                        {currentCharacter && (
                            <div className="grid grid-cols-2 gap-x-36">
                                <HealthBar
                                    name={currentCharacter.name}
                                    maxHp={currentCharacter.maxHp.toNumber()}
                                    hp={currentCharacter.hp.toNumber()}
                                />
                                <HealthBar
                                    name={bigBoss.name}
                                    maxHp={bigBoss.maxHp.toNumber()}
                                    hp={bigBoss.hp.toNumber()}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-10 flex flex-row justify-between h-2/3">
                        {/* Character sectiom */}
                        <div className="h-full flex flex-col justify-end items-center relative">
                            <animated.div className="h-full pt-6" style={characterstyle}>
                                <img
                                    className="h-full w-auto"
                                    src={currentCharacter.imageURI}
                                />
                            </animated.div>
                            {attackOnCharacter && (
                                <AttackAnimation attackIndex={BigNumber.from(0)} />
                            )}
                            <div className="flex flex-row space-x-3">
                                {currentCharacter.attacks.map((item, i) => {
                                    return (
                                        <AttackItem
                                            key={i}
                                            index={item}
                                            startAttack={startAttack}
                                        />
                                    );
                                })}
                                {currentCharacter.specialAttacks.map((item, i) => {
                                    return (
                                        <SpecialAttackItem
                                            key={i}
                                            index={item}
                                            startSpecialAttack={startSpecialAttack}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Boss Section */}
                        <div className="h-full relative">
                            <animated.div
                                className="flex items-end justify-end h-full pt-6"
                                style={style}
                            >
                                <img className="h-full w-auto" src={bigBoss.imageURI} />
                            </animated.div>

                            {attackOnBoss && <AttackAnimation attackIndex={attackIndex} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const AttackAnimation = ({ attackIndex }: { attackIndex: BigNumber }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: getAttackAnimation(attackIndex),
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="absolute z-30 top-0 left-0">
            <Lottie options={defaultOptions} height={800} width={350} />;
        </div>
    );
};

const AttackItem = ({
    index,
    startAttack,
}: {
    index: BigNumber;
    startAttack: (attackType: AttackProps) => void;
}) => {
    const { allAttacks } = useDapp();
    var attack = allAttacks.find((item) => item.attackIndex.eq(index));

    return (
        <>
            <ReactTooltip id={attack.attackName} place="bottom" type="dark">
                <span className="text-white font-bold text-xl">
                    {attack.attackName}
                </span>
            </ReactTooltip>
            <div
                className="rounded-full bg-white flex justify-center items-center border-[3px] border-red-500 scale-100 hover:scale-105 transition-all duration-100	ease-in cursor-pointer"
                style={{ height: "75px", width: "75px" }}
                data-tip
                data-for={attack.attackName}
                onClick={() => {
                    startAttack(attack);
                }}
            >
                <img height={50} width={50} src={attack.attackImage} />
            </div>
        </>
    );
};

const SpecialAttackItem = ({
    index,
    startSpecialAttack,
}: {
    index: BigNumber;
    startSpecialAttack: (attackType: SpecialAttackProps) => Promise<void>;
}) => {
    const { allSpecialAttacks } = useDapp();
    var attack = allSpecialAttacks.find((item) =>
        item.specialAttackIndex.eq(index)
    );

    return (
        <>
            <ReactTooltip id={attack.specialAttackName} place="bottom" type="dark">
                <span className="text-white font-bold text-xl">
                    {attack.specialAttackName}
                </span>
            </ReactTooltip>
            <div
                className="rounded-full bg-white flex justify-center items-center border-[3px] border-red-500 scale-100 hover:scale-105 transition-all duration-100	ease-in cursor-pointer"
                style={{ height: "75px", width: "75px" }}
                data-tip
                data-for={attack.specialAttackName}
                onClick={() => {
                    startSpecialAttack(attack);
                }}
            >
                <img height={50} width={50} src={attack.specialAttackImage} />
            </div>
        </>
    );
};

export default GameArena;
