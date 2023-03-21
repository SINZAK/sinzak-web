import type from "@egjs/flicking-plugins/declaration/type";
import { Controller, useFormContext, useWatch } from "react-hook-form";

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
              ]}
            />
          )}
        />
      )}
    </div>
  );
};
