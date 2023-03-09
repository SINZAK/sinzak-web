import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog } from "@headlessui/react";

import { Button } from "@components/atoms/Button";

export const ResignPopup = NiceModal.create(({ onOk }: { onOk: () => any }) => {
  const modal = useModal();
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
            <Dialog.Title className="pt-4 pb-8 text-center">
              <p className="mb-3 text-xl font-bold text-red">
                정말 탈퇴할까요?
              </p>
              <p className="text-gray-800">
                탈퇴 시 더 이상 해당 계정에 접근할 수 없어요.
              </p>
            </Dialog.Title>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="font-normal"
                size="large"
                onClick={() => {
                  onOk();
                  modal.remove();
                }}
              >
                탈퇴하기
              </Button>
              <Button
                className="font-normal"
                intent="primary"
                size="large"
                onClick={() => modal.remove()}
              >
                취소
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
});
