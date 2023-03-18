import { useCallback, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/atoms/Button";
import { FifthStep } from "@components/pages/signup/forms/FifthStep";
import { CategorySelectForm } from "@components/pages/signup/forms/ThirdStep";
import { useSubmitImage } from "@lib/hooks/useUploadImage";
import { getCategoryText } from "@lib/resources/category";

import { useEditCategoryMutation } from "../queries/useEditCategoryMutation";
import { useEditUserMutation } from "../queries/useEditUserMutation";
import { useMyProfileQuery } from "../queries/useMyProfileQuery";

export const EditProfilePopup = NiceModal.create(() => {
  const { data } = useMyProfileQuery();
  const { profile: initialProfile } = data || {};

  const [state, setState] = useState<null | "verify" | "category">(null);
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      introduction: initialProfile?.introduction,
      name: initialProfile?.name,
    },
  });
  const introduction = watch("introduction");
  const modal = useModal();

  const { mutate } = useEditUserMutation();
  const { mutate: mutateCategory } = useEditCategoryMutation();
  const { imageString, imageFile, selectFile } = useSubmitImage();

  const onSubmit = useCallback(
    () =>
      handleSubmit(async ({ introduction, name }) => {
        if (!introduction || !name) return;
        mutate(
          { introduction, name, imageFile },
          {
            onSuccess: () => modal.remove(),
            onError: () => alert("알 수 없는 오류가 발생했습니다."),
          }
        );
      })(),
    [handleSubmit, imageFile, modal, mutate]
  );

  if (!initialProfile) return null;

  if (state === "verify")
    return (
      <Dialog
        as="div"
        className="relative z-30"
        open={modal.visible}
        onClose={() => setState(null)}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-sm transform space-y-4 overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl">
              <FifthStep />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    );

  if (state === "category")
    return (
      <Dialog
        as="div"
        className="relative z-30"
        open={modal.visible}
        onClose={() => setState(null)}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-sm transform space-y-4 overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl">
              <CategorySelectForm
                onCancel={() => setState(null)}
                onSubmit={(category) => {
                  mutateCategory(
                    { category },
                    {
                      onSuccess: () => setState(null),
                    }
                  );
                }}
              />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    );

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
          <Dialog.Panel className="w-full max-w-sm transform space-y-4 overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <img
                  className="h-16 w-16 rounded-xl object-cover"
                  alt="프로필 사진"
                  src={imageString || initialProfile.imageUrl}
                />
                <input
                  id="input-file"
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={selectFile}
                />
                <Button
                  as="label"
                  htmlFor="input-file"
                  className="cursor-pointer"
                >
                  프로필 사진 변경
                </Button>
              </div>
              <div className="flex flex-col divide-y text-lg">
                <p className="flex items-center py-4">
                  <span className="shrink-0 basis-16 font-bold">닉네임</span>
                  <input
                    {...register("name")}
                    placeholder="닉네임"
                    className="flex-1 focus:ring-0"
                  />
                </p>
                <div className="flex flex-col py-4">
                  <p className="mb-3 flex items-center justify-between">
                    <span className="font-bold">소개</span>
                    <span
                      className={twMerge(
                        "text-sm",
                        introduction !== undefined &&
                          introduction?.length <= 100
                          ? "text-gray-800"
                          : "text-red"
                      )}
                    >
                      {introduction?.length || 0}/100
                    </span>
                  </p>
                  <ReactTextareaAutosize
                    {...register("introduction", {
                      maxLength: 100,
                    })}
                    rows={3}
                    placeholder="자기소개를 자유롭게 작성해 주세요."
                    className="flex-1 resize-none focus:ring-0"
                  />
                </div>
                <p className="flex items-center py-4">
                  <span className="w-16 font-bold">학교</span>
                  {initialProfile.cert_uni ? (
                    <span>{initialProfile.cert_uni}</span>
                  ) : (
                    <span className="flex flex-1 justify-between">
                      <span>미등록</span>
                      <button
                        type="button"
                        onClick={() => setState("verify")}
                        className="font-medium text-purple"
                      >
                        인증하기
                      </button>
                    </span>
                  )}
                </p>
                <div className="flex flex-col py-4">
                  <p className="mb-3 flex items-center justify-between">
                    <span className="w-16 font-bold">관심장르</span>
                    <button
                      type="button"
                      onClick={() => setState("category")}
                      className="font-medium text-purple"
                    >
                      변경하기
                    </button>
                  </p>
                  <div>
                    {initialProfile.categoryLike
                      .split(",")
                      .map((_) => getCategoryText(_))
                      .join(", ")}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="text-purple"
                size="large"
                onClick={() => modal.remove()}
              >
                취소
              </Button>
              <Button intent="secondary" size="large" onClick={onSubmit}>
                저장
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
});
