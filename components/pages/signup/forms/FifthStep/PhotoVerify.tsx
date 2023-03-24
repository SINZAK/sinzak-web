import { toast } from "sonner";

import { Button } from "@components/atoms/Button";
import { useSelectImage } from "@lib/hooks/useSelectImage";
import { CameraIcon } from "@lib/icons";

import { useSubmitPhotoCertifyMutation } from "../../queries/useSubmitPhotoCertifyMutation";
import { useStepContext } from "../../states";

export const PhotoVerify = ({
  univName,
  onSubmit,
}: {
  univName: string;
  onSubmit: () => void;
}) => {
  const { imageFile, imageString, selectFile } = useSelectImage();
  const { mutate, isLoading } = useSubmitPhotoCertifyMutation();

  const onFormSubmit = async () => {
    if (!imageFile) return;
    mutate(
      {
        univName,
        imageFile,
      },
      {
        onSuccess: () => onSubmit(),
        onError: (e: any) =>
          toast.error(e.message || "알 수 없는 오류가 발생했습니다."),
      }
    );
    onSubmit();
  };

  return (
    <form onSubmit={onFormSubmit} className="flex flex-1 flex-col space-y-5">
      <div>
        <p className="text-sm text-gray-800">
          모바일 학생증 캡쳐 화면 또는 실물 학생증 사진을 업로드해주세요.
          <br />
          2~3일 내에 승인이 완료됩니다.
        </p>
      </div>
      <div className="space-y-4">
        <p className="flex items-center">
          <input
            id="input-file"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={isLoading ? undefined : selectFile}
          />
          <label
            htmlFor="input-file"
            className="flex flex-1 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-white px-4 py-3 text-purple ring-1 ring-inset ring-purple placeholder:text-gray-600 hover:opacity-80"
          >
            <CameraIcon />
            사진 업로드하기
          </label>
        </p>
        {imageString && (
          <img
            alt="학생증"
            src={imageString}
            className="flex aspect-video items-center justify-center whitespace-pre-line rounded-xl border bg-gray-100 object-cover"
            draggable="false"
          />
        )}
      </div>
      <div className="!mt-0 flex flex-1 flex-col-reverse">
        <div className="grid grid-cols-2 gap-x-4">
          <Button onClick={() => onSubmit()} size="large" className="w-full">
            다음에 하기
          </Button>
          <Button
            disabled={!imageString}
            type="submit"
            intent="primary"
            size="large"
            className="w-full"
          >
            확인
          </Button>
        </div>
      </div>
    </form>
  );
};
