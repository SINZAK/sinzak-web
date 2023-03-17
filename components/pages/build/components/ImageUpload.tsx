import { useFormContext, Controller } from "react-hook-form";

import { CloseIcon, PlusBorderFilledIcon, PlusBorderIcon } from "@lib/icons";

import { BuildForm } from "../types";

export const ImageUpload = () => {
  const { control } = useFormContext<BuildForm>();

  const selectFiles = (
    value: [string, File][],
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    let images: [string, File][] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      images.push([URL.createObjectURL(file), file]);
    }

    return [...value, ...images];
  };
  const deleteImage = (value: [string, File][], i: number) => {
    return value.filter((_, j) => i !== j);
  };

  return (
    <Controller
      control={control}
      name="images"
      rules={{
        required: false,
      }}
      render={({ field: { onChange, value } }) => (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-3">
          <span>
            <input
              id="input-file"
              type="file"
              multiple
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) => onChange(selectFiles(value, e))}
            />
            <label
              htmlFor="input-file"
              className="flex aspect-square h-full w-full cursor-pointer flex-col items-center justify-center whitespace-pre-line rounded-xl bg-gray-100"
            >
              <span className="inline-block h-12 py-1">
                <PlusBorderIcon className="h-10 w-10 text-red" />
              </span>
              <span className="text-lg font-bold">업로드</span>
            </label>
          </span>
          {value
            .map((x) => x[0])
            .map((_, i) => (
              <span className="relative" key={i}>
                <img
                  alt=""
                  src={_}
                  className="flex aspect-square items-center justify-center whitespace-pre-line rounded-xl border bg-gray-100 object-cover"
                  draggable="false"
                />
                <button
                  onClick={() => onChange(deleteImage(value, i))}
                  type="button"
                  className="absolute top-0 right-0 grid h-5 w-5 translate-x-1/3 -translate-y-1/3 place-content-center rounded-full bg-red text-white"
                >
                  <CloseIcon />
                </button>
              </span>
            ))}
        </div>
      )}
    />
  );
};
