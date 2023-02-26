import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog } from "@headlessui/react";

import { Button } from "@components/atoms/Button";

export const DeletePopup = NiceModal.create(({ onOk }: { onOk: () => any }) => {
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
            <Dialog.Title className="pt-4 pb-8 text-center text-lg font-bold">
              정말 게시글을 삭제할까요?
            </Dialog.Title>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="font-normal text-purple"
                size="large"
                onClick={() => modal.remove()}
              >
                아니오
              </Button>
              <Button
                className="font-normal"
                intent="secondary"
                size="large"
                onClick={() => {
                  onOk();
                  modal.remove();
                }}
              >
                네, 삭제할게요
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
});
