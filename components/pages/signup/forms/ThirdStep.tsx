import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@components/atoms/Button";
import { Category } from "@lib/resources/category";
import { login } from "@lib/services/auth";

import { MultiSelect } from "../components/MultiSelect";
import { useJoinMutation } from "../queries/useJoinMutation";
import { useStepContext } from "../states";

export const ThirdStep = () => {
  const globalForm = useFormContext();
  const [_, setStep] = useStepContext();
  const [firstCate, setFirstCate] = useState<Category[]>([]);
  const [secondCate, setSecondCate] = useState<Category[]>([]);
  const { mutateAsync } = useJoinMutation();

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          globalForm.setValue("cate", [...firstCate, ...secondCate]);
          const result = await mutateAsync({
            cate: globalForm.getValues("cate"),
            nickName: globalForm.getValues("nickName"),
            term: globalForm.getValues("term"),
          });
          console.log(result);
          const { accessToken, refreshToken, accessTokenExpireDate } =
            result.token;
          login({ accessToken, refreshToken, accessTokenExpireDate });
          setStep((step) => step + 1);
        } catch (e) {
          alert("알 수 없는 오류가 발생했습니다.");
          location.href = "/auth/signin";
        }
      }}
    >
      <div className="flex flex-1 flex-col font-medium">
        <div className="mt-4 mb-6">
          <p className="text-xl font-bold">관심있는 장르를 선택해주세요.</p>
          <p className="mt-2 text-xs text-gray-800">
            최대 3개까지 선택 가능합니다.
          </p>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="space-y-2">
            <p className="font-bold">순수예술</p>
            <MultiSelect
              data={[
                "painting",
                "orient",
                "sculpture",
                "print",
                "craft",
                "other",
              ]}
              value={firstCate}
              onChange={(value) => setFirstCate(value)}
            />
          </div>
          <div className="space-y-2">
            <p className="font-bold">디자인</p>
            <MultiSelect
              data={[
                "portrait",
                "illustration",
                "logo",
                "poster",
                "design",
                "editorial",
                "label",
              ]}
              value={secondCate}
              onChange={(value) => setSecondCate(value)}
            />
          </div>
        </div>
      </div>
      <Button type="submit" intent="primary" size="large" className="w-full">
        확인
      </Button>
    </form>
  );
};
