import React from "react";
import Lottie from "react-lottie";
import loaderAnimation from "../utils/loader.json";

export const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidMid slice"
        }
    }

    return (
        <>
            <div className="h-screen bg-gray-800 text-center">
                <div className="w-full h-full flex justify-center items-center">
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            </div>
        </>
    )
}