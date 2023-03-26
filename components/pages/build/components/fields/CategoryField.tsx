import { Controller, useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { SingleSelect } from "../SingleSelect";

export const CategoryField = () => {
  const { control } = useFormContext();
  const type = useWatch({ name: "type" });

  return (
    <div>
      <p className="mb-3">카테고리를 선택해주세요.</p>
      {type === "sell" ? (
        <Controller
          shouldUnregister
          control={control}
          name="category"
          rules={{
            required: true,
            validate: (value) => {
              console.log(value);
              const result = !!value;
              if (!result) toast.error("카테고리를 선택해주세요.");
              return result;
            },
          }}
          render={({ field: { onChange } }) => (
            <SingleSelect
              onChange={onChange}
              data={[
                "painting",
                "orient",
                "sculpture",
                "print",
                "craft",
                "other",
              ]}
            />
          )}
        />
      ) : (
        <Controller
          shouldUnregister
          control={control}
          name="category"
          rules={{
            required: true,
            validate: (value) => {
              console.log(value);
              const result = !!value;
              if (!result) toast.error("카테고리를 선택해주세요.");
              return result;
            },
          }}
          render={({ field: { onChange } }) => (
            <SingleSelect
              onChange={onChange}
              data={[
                "portrait",
                "illustration",
                "logo",
                "poster",
                "design",
                "editorial",
                "label",
                "other",
              ]}
            />
          )}
        />
      )}
    </div>
  );
};
