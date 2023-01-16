import { Button } from "@components/atoms/Button";
import { Dialog } from "@headlessui/react";

export const DeletePopup = ({
  isOpen,
  setIsOpen,
  onDelete,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onDelete: () => any;
}) => {
  return (
    <Dialog
      as="div"
      className="relative z-50"
      open={isOpen}
      onClose={() => setIsOpen(false)}
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
                className="text-base font-normal text-purple"
                size="large"
                onClick={() => setIsOpen(false)}
              >
                아니오
              </Button>
              <Button
                className="text-base font-normal"
                intent="secondary"
                size="large"
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
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
};
