import { Dialog } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/atoms/Button";

import styles from "./UploadPopup.module.css";

export const UploadPopup = ({
  text,
  isOpen,
  setIsOpen,
}: {
  text: string;
  isOpen: boolean;
  setIsOpen?: (value: boolean) => void;
}) => {
  return (
    <Dialog
      as="div"
      className="relative z-30"
      open={isOpen}
      onClose={() => setIsOpen?.(false)}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl">
            <Dialog.Title className="pt-4 pb-8 text-center text-lg font-bold">
              {text}
            </Dialog.Title>
            <div
              className={"h-10 w-full overflow-hidden rounded-full bg-gray-100"}
            >
              <div className={twMerge("h-full bg-purple", styles.animate)} />
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
