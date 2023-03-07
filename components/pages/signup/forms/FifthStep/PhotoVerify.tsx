import { Button } from "@components/atoms/Button";
import { useSubmitImage } from "@lib/hooks/useUploadImage";
import { CameraIcon } from "@lib/icons";
import { http } from "@lib/services/http";

import { useStepContext } from "../../states";

export const PhotoVerify = () => {
  const [_, setStep] = useStepContext();
  const { imageFile, imageString, selectFile } = useSubmitImage();

  const onSubmit = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("multipartFile", imageFile);
    await http.post.multipart(`/certify/${123}/image`, formData);
    setStep(5);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col space-y-5">
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
            onChange={selectFile}
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
          <Button onClick={() => setStep(5)} size="large" className="w-full">
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
