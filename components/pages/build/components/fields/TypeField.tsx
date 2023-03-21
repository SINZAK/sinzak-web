import { useFormContext } from "react-hook-form";

export const TypeField = () => {
  const { register } = useFormContext();

  return (
    <div>
      <p className="mb-3">분야를 선택해주세요.</p>
      <ul className="grid max-w-sm grid-cols-3 gap-3">
        <li>
          <input
            {...register("type")}
            type="radio"
            id="type-sell"
            name="type"
            value="sell"
            required
            className="peer hidden"
          />
          <label
            htmlFor="type-sell"
            className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-100 peer-checked:border-2 peer-checked:border-red"
          >
            <span className="inline-block h-12">
              <img src="/assets/images/heart-dynamic-color.png" />
            </span>
            <span className="text-lg font-bold">작품 판매</span>
          </label>
        </li>
        <li>
          <input
            {...register("type")}
            type="radio"
            id="type-workSell"
            name="type"
            value="workSell"
            className="peer hidden"
          />
          <label
            htmlFor="type-workSell"
            className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-100 peer-checked:border-2 peer-checked:border-red"
          >
            <span className="inline-block h-12">
              <img src="/assets/images/link-dynamic-color.png" />
            </span>
            <span className="text-lg font-bold">의뢰해요</span>
          </label>
        </li>
        <li>
          <input
            {...register("type")}
            type="radio"
            id="type-workBuy"
            name="type"
            value="workBuy"
            className="peer hidden"
          />
          <label
            htmlFor="type-workBuy"
            className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-100 peer-checked:border-2 peer-checked:border-red"
          >
            <span className="inline-block h-12">
              <img src="/assets/images/bucket-dynamic-color.png" />
            </span>
            <span className="text-lg font-bold">작업해요</span>
          </label>
        </li>
      </ul>
    </div>
  );
};
