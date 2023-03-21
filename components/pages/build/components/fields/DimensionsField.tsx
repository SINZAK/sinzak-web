import { useFormContext, useWatch } from "react-hook-form";

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
          })}
          type="number"
          className="flex-1 rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
        />
        <span className="shrink-0 text-lg font-bold">cm</span>
      </p>
    </div>
  );
};
