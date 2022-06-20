import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDapp } from "../../contexts/DappContext";

export const ClaimHealthModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const { currentCharacter, claimHealth } = useDapp();
  var healthToClaim = (
    (Date.now() - currentCharacter.lastRegenTime.toNumber() * 1000) /
    1000 /
    60
  ).toFixed(0);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border-red-500 border-[3px]">
                <div className="flex flex-col items-center">
                  <img src="/images/regen.png" height={100} width={100} />
                  <span className="text-4xl font-medium leading-6 text-red-500 font-avengers mt-8">
                    you can claim {healthToClaim} hp points
                  </span>
                </div>

                <div className="mt-10 flex flex-row justify-center space-x-5">
                  <button
                    type="button"
                    className="bg-white border-red-500 border-[3px] rounded-xl w-40 pt-3 font-avengers text-2xl text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={async () => {
                      closeModal();
                      claimHealth();
                    }}
                  >
                    Sure
                  </button>
                  <button
                    type="button"
                    className="bg-white border-red-500 border-[3px] rounded-xl w-40 pt-3 font-avengers text-2xl text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={closeModal}
                  >
                    Naah
                  </button>
                </div>
                <div className="flex justify-center ">
                  <span className="text-2xl font-gasalt leading-6 text-black mt-3 font-bold">
                    ( It costs 0.1 EPIC token to claim health )
                  </span>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
