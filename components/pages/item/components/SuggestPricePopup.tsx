import { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog } from "@headlessui/react";
import { UseMutateFunction } from "@tanstack/react-query";

import { Button } from "@components/atoms/Button";
import { SuggestPriceMutationVariables } from "@types";

export const SuggestPricePopup = NiceModal.create(
  ({
    mutate,
    id,
  }: {
    mutate: UseMutateFunction<
      unknown,
      unknown,
      SuggestPriceMutationVariables,
      unknown
    >;
    id: number;
  }) => {
    const modal = useModal();
    const [price, setPrice] = useState<number | null>(null);

    return (
      <Dialog
        as="div"
        className="relative z-30"
        open={modal.visible}
        onClose={() => modal.remove()}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl">
              <Dialog.Title className="pt-4 pb-8 text-center text-lg font-bold">
                시세에 맞는 가격을 제안해 보세요.
              </Dialog.Title>
              <p className="mb-6 flex w-full items-center space-x-4">
                <input
                  value={String(price || "")}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  placeholder="가격"
                  className="flex-1 resize-none rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
                />
                <span className="font-bold">원</span>
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="font-normal text-purple"
                  size="large"
                  onClick={() => modal.remove()}
                >
                  취소
                </Button>
                <Button
                  disabled={!price}
                  className="font-normal"
                  intent="secondary"
                  size="large"
                  onClick={() => {
                    mutate({
                      id,
                      price: price!,
                    });
                    modal.remove();
                  }}
                >
                  제안하기{" "}
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    );
  }
);
