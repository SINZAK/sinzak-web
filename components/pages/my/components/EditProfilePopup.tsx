import { useCallback, useRef, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createMutation } from "react-query-kit";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/atoms/Button";
import { VerifyForm } from "@components/pages/signup/forms/FifthStep";
import { UnivSelectForm } from "@components/pages/signup/forms/FourthStep";
import { CategorySelectForm } from "@components/pages/signup/forms/ThirdStep";
import { useSelectImage } from "@lib/hooks/useSelectImage";
import { CheckIcon, VerifiedIcon } from "@lib/icons";
import { getCategoryText } from "@lib/resources/category";
import { http } from "@lib/services/http";

import { useEditCategoryMutation } from "../queries/useEditCategoryMutation";
import { useEditUserMutation } from "../queries/useEditUserMutation";
import { useMyProfileQuery } from "../queries/useMyProfileQuery";

const VerifyStepForm = ({ close }: { close: () => void }) => {
  const queryClient = useQueryClient();

  const [step, setStep] = useState(0);
  const [univName, setUnivName] = useState("");

  if (step === 0)
    return (
      <UnivSelectForm
        onSkip={() => close()}
        onSubmit={(univName) => (setUnivName(univName), setStep(1))}
      />
    );
  return (
    <VerifyForm
      onSubmit={() => {
        queryClient.invalidateQueries(useMyProfileQuery.getKey());
        close();
      }}
      univName={univName}
    />
  );
};

export const useChangeProductCompleteMutation = createMutation({
  mutationFn: async ({ link }: { link: string }) => {
    const res = await http.post.json(`/certify/author`, {
      portFolio: link,
    });
    return res.data;
  },
});

export const PartnerForm = ({
  close,
  isValid,
}: {
  close: () => void;
  isValid: boolean;
}) => {
  const [link, setLink] = useState("");
  const { mutate } = useChangeProductCompleteMutation();

  const onSubmit = (link: string) => {
    mutate(
      { link },
      {
        onSuccess: () => close(),
        onError: (e: any) =>
          toast.error(e.message || "알 수 없는 오류가 발생했습니다."),
      }
    );
    close();
  };

  return (
    <form className="flex flex-1 flex-col" onSubmit={() => onSubmit(link)}>
      <div className="flex flex-1 flex-col font-medium">
        <div className="mt-4 mb-6">
          <p className="text-xl font-bold">인증작가 신청</p>
        </div>
        <div className="flex flex-col space-y-5">
          <div>
            <p className="mb-2 text-lg font-bold">신작 인증 작가</p>
            <p>
              인증 작가가 되면 이름 옆에 인증작가 배지
              <VerifiedIcon />가 붙고, 신작 추천 작품에 선정될 가능성이
              높아집니다.
            </p>
          </div>
          <div>
            <p className="mb-2 text-lg font-bold">1단계. 학교 인증</p>
            {isValid ? (
              <>
                <p className="text-lg font-medium text-purple">
                  <CheckIcon />
                  인증 완료
                </p>
              </>
            ) : (
              <>
                <p className="mb-2 text-lg font-medium text-red">인증 미완료</p>
                <p>
                  학교 인증을 완료한 후, 인증 작가 신청이 가능합니다. 이전
                  화면에서 학교 인증을 완료하신 후, 다시 시도해 주세요.
                </p>
              </>
            )}
          </div>
          <div>
            <p
              className={twMerge(
                "mb-2 text-lg font-bold",
                !isValid && "text-gray-400"
              )}
            >
              2단계. 포트폴리오 링크
            </p>
            {isValid && (
              <p>
                개인 웹사이트, Behance, ArtStation, Google Drive 등 링크
                형식으로 포트폴리오를 첨부해주세요. 신청시 1~2일 정도 소요되며
                링크는 최대 200자까지 입력 가능합니다.
              </p>
            )}
          </div>
          {isValid && (
            <div>
              <p className="flex items-center space-x-4">
                <input
                  value={link}
                  onChange={(e) => setLink(e.currentTarget.value)}
                  placeholder="링크를 입력하세요"
                  className="flex-1 rounded-full bg-gray-100 px-4 py-3 placeholder:text-gray-600"
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <Button onClick={() => close()} size="large" className="w-full">
          취소
        </Button>
        <Button
          disabled={!link}
          type="submit"
          intent="primary"
          size="large"
          className="w-full"
        >
          신청하기
        </Button>
      </div>
    </form>
  );
};

export const EditProfilePopup = NiceModal.create(() => {
  const { data } = useMyProfileQuery();
  const { profile } = data || {};
  const ref = useRef(null);

  const [state, setState] = useState<null | "verify" | "category" | "partner">(
    null
  );
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      introduction: profile?.introduction,
      name: profile?.name,
    },
  });
  const introduction = watch("introduction");
  const modal = useModal();

  const { mutate } = useEditUserMutation();
  const { mutate: mutateCategory } = useEditCategoryMutation();
  const { imageString, imageFile, selectFile } = useSelectImage();

  const onSubmit = useCallback(
    () =>
      handleSubmit(async ({ introduction, name }) => {
        name = name?.trim();
        if (!name) return;
        if (!/^[0-9A-Za-zㄱ-ㅎ가-힣_\-\.]{2,12}$/.test(name)) {
          toast.error(
            "닉네임은 공백없이 2자 이상 12자 이하, 기호는 - _ . 만 사용 가능합니다."
          );
          return;
        }
        mutate(
          { introduction, name, imageFile },
          {
            onSuccess: () => modal.remove(),
            onError: (e: any) =>
              toast.error(e.message || "알 수 없는 오류가 발생했습니다."),
          }
        );
      })(),
    [handleSubmit, imageFile, modal, mutate]
  );

  if (!profile) return null;

  if (state === "verify")
    return (
      <Dialog
        as="div"
        className="fixed inset-0 z-30 grid place-items-center overflow-y-auto px-4"
        open={modal.visible}
        onClose={() => setState(null)}
        initialFocus={ref}
        ref={ref}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        <Dialog.Panel className="flex h-[640px] w-full max-w-sm transform space-y-4 overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl">
          <VerifyStepForm close={() => setState(null)} />
        </Dialog.Panel>
      </Dialog>
    );

  if (state === "category")
    return (
      <Dialog
        as="div"
        className="fixed inset-0 z-30 grid place-items-center overflow-y-auto px-4"
        open={modal.visible}
        onClose={() => setState(null)}
        initialFocus={ref}
        ref={ref}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
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
      </Dialog>
    );

  if (state === "partner")
    return (
      <Dialog
        as="div"
        className="fixed inset-0 z-30 grid place-items-center overflow-y-auto px-4"
        open={modal.visible}
        onClose={() => setState(null)}
        initialFocus={ref}
        ref={ref}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        <Dialog.Panel className="flex h-[640px] w-full max-w-sm transform space-y-4 overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl">
          <PartnerForm
            isValid={profile.cert_uni}
            close={() => setState(null)}
          />
        </Dialog.Panel>
      </Dialog>
    );

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-30 grid place-items-center overflow-y-auto px-4"
      open={modal.visible}
      onClose={() => modal.remove()}
      initialFocus={ref}
      ref={ref}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
      <Dialog.Panel className="w-full max-w-sm transform space-y-4 overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <img
              className="h-16 w-16 rounded-xl object-cover"
              alt="프로필 사진"
              src={imageString || profile.imageUrl}
            />
            <input
              id="input-file"
              type="file"
              multiple
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={selectFile}
            />
            <Button as="label" htmlFor="input-file" className="cursor-pointer">
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
                    introduction !== undefined && introduction?.length <= 100
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
              {profile.cert_uni ? (
                <span>{profile.univ}</span>
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
                {profile.categoryLike
                  .split(",")
                  .map((_) => getCategoryText(_))
                  .join(", ")}
              </div>
            </div>
            <div className="pt-2 pb-4">
              <button
                onClick={() => setState("partner")}
                className="text-sm font-medium text-purple"
              >
                인증작가 신청하기
              </button>
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
    </Dialog>
  );
});
