import { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog } from "@headlessui/react";
import ReactTextareaAutosize from "react-textarea-autosize";

import { Button } from "@components/atoms/Button";
import { useReportUserMutation } from "@lib/queries/reportUser";

export const ReportPopup = NiceModal.create(
  ({ userId }: { userId: number }) => {
    const modal = useModal();
    const { mutate } = useReportUserMutation();
    const [reason, setReason] = useState("");
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
                신고 사유를 입력해 주세요.
              </Dialog.Title>
              <ReactTextareaAutosize
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                minRows={3}
                rows={3}
                maxRows={3}
                placeholder="신고 사유"
                className="mb-6 w-full resize-none rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
              />
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="font-normal text-purple"
                  size="large"
                  onClick={() => modal.remove()}
                >
                  취소
                </Button>
                <Button
                  className="font-normal"
                  intent="secondary"
                  size="large"
                  onClick={() => {
                    mutate({
                      userId,
                      reason,
                    });
                    modal.remove();
                  }}
                >
                  신고하기
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    );
  }
);
