import { useFormContext, Controller, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { CheckBox } from "@components/atoms/CheckBox";

export const PriceField = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const type = useWatch({ name: "type" });

  return (
    <div>
      <p className="mb-3">{type === "sell" ? "가격" : "의뢰비"}</p>
      <span className="flex items-center space-x-8">
        <span className="flex flex-1 items-center">
          <input
            {...register("price", {
              required: true,
              shouldUnregister: true,
              valueAsNumber: true,
            })}
            placeholder={type === "sell" ? "작품 가격" : "제시 의뢰비"}
            type="number"
            className={twMerge(
              "w-full rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600",
              (errors as any).price && "ring-1 !ring-red-500"
            )}
          />
          <span className="ml-4 text-lg font-bold">원</span>
        </span>
        {/* {type === "sell" && ( */}
        <span className="flex items-center">
          <Controller
            shouldUnregister
            defaultValue={false}
            control={control}
            name="suggest"
            render={({ field: { ref, value, onChange } }) => (
              <CheckBox ref={ref} checked={value} onChange={onChange}>
                가격제안 받기
              </CheckBox>
            )}
          />
        </span>
        {/* )} */}
      </span>
    </div>
  );
};
