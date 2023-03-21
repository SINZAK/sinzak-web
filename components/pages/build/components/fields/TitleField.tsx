import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const TitleField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <p className="mb-3">제목</p>
      <input
        {...register("title", {
          required: true,
        })}
        placeholder="작품 제목"
        className={twMerge(
          "w-full rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600",
          errors.title && "ring-1 !ring-red-500"
        )}
      />
    </div>
  );
};
