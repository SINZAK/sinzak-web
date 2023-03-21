import { useFormContext, useWatch } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { twMerge } from "tailwind-merge";

export const ContentField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const type = useWatch({ name: "type" });

  return (
    <div>
      <p className="mb-3">내용</p>
      <ReactTextareaAutosize
        {...register("content", {
          required: true,
        })}
        placeholder={
          type === "sell"
            ? "작품 의도, 작업 기간, 재료, 거래 방법 등을 자유롭게 표현해보세요."
            : "원하는 의뢰의 형태, 분위기, 재료 등을 자유롭게 설명해주세요!"
        }
        className={twMerge(
          "w-full resize-none rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600",
          (errors as any).price && "ring-1 !ring-red-500"
        )}
        minRows={3}
      />
    </div>
  );
};
