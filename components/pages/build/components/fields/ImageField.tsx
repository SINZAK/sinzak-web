import produce from "immer";
import { Controller, useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { CloseIcon, PlusBorderIcon } from "@lib/icons";

import { BuildForm } from "../../types";

export const ImageField = () => {
  const { control } = useFormContext<BuildForm>();

  const selectFiles = (
    value: BuildForm["images"],
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    let images: BuildForm["images"] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      images.push({
        type: "preview",
        src: URL.createObjectURL(file),
        file,
      });
    }

    return [...value, ...images];
  };
  const deleteImage = (value: BuildForm["images"], i: number) => {
    return produce(value, (draft) => {
      if (draft[i].type === "preview") {
        draft.splice(i, 1);
        return;
      }
      draft[i].type = "delete";
    });
  };

  return (
    <div>
      <p className="mb-3">사진 등록</p>
      <Controller
        control={control}
        name="images"
        rules={{
          required: false,
          validate: (value) => value?.length > 0,
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
                onChange={(e) => onChange(selectFiles(value || [], e))}
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
            {value?.map((image, i) =>
              image.type === "delete" ? null : (
                <span className="relative" key={i}>
                  <img
                    alt=""
                    src={image.src}
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
              )
            )}
          </div>
        )}
      />
    </div>
  );
};
