import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export const DimensionsField = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <p className="mb-3">작품 사이즈 (선택)</p>
      <p className="flex items-center space-x-4">
        <span className="shrink-0 text-lg font-bold">가로</span>
        <input
          {...register("width", {
            valueAsNumber: true,
            validate: (value) => {
              if (isNaN(value)) return true;
              const result = value <= 1_000_000_000 && value >= 0;
              if (!result)
                toast.error("작품 사이즈를 범위 내로 입력해 주세요.");
              return result;
            },
          })}
          type="number"
          className="flex-1 rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
        />
        <span className="shrink-0 text-lg font-bold">cm</span>
      </p>
      <p className="flex items-center space-x-4">
        <span className="shrink-0 text-lg font-bold">세로</span>
        <input
          {...register("vertical", {
            valueAsNumber: true,
            validate: (value) => {
              if (isNaN(value)) return true;
              const result = value <= 1_000_000_000 && value >= 0;
              if (!result)
                toast.error("작품 사이즈를 범위 내로 입력해 주세요.");
              return result;
            },
          })}
          type="number"
          className="flex-1 rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
        />
        <span className="shrink-0 text-lg font-bold">cm</span>
      </p>
      <p className="flex items-center space-x-4">
        <span className="shrink-0 text-lg font-bold">높이</span>
        <input
          {...register("height", {
            valueAsNumber: true,
            validate: (value) => {
              if (isNaN(value)) return true;
              const result = value <= 1_000_000_000 && value >= 0;
              if (!result)
                toast.error("작품 사이즈를 범위 내로 입력해 주세요.");
              return result;
            },
          })}
          type="number"
          className="flex-1 rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
        />
        <span className="shrink-0 text-lg font-bold">cm</span>
      </p>
    </div>
  );
};
