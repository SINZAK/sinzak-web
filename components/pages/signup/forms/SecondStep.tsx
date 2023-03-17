import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@components/atoms/Button";

import { useCheckNicknameMutation } from "../queries/useCheckNicknameMutation";
import { useStepContext } from "../states";

export const SecondStep = () => {
  const globalForm = useFormContext();
  const [_, setStep] = useStepContext();
  const [isValid, setIsValid] = useState<null | boolean>(null);
  const [name, setName] = useState("");
  const { mutate, isLoading } = useCheckNicknameMutation();

  const onCheck = () => {
    mutate(name, {
      onSuccess: () => setIsValid(true),
      onError: (e: any) => alert(e.message),
    });
  };

  const disabled = !name.length || isLoading;

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        globalForm.setValue("nickName", name);
        setStep((step) => step + 1);
      }}
    >
      <div className="flex flex-1 flex-col font-medium">
        <div className="mt-4 mb-6">
          <p className="text-xl font-bold">
            신작에서 사용할
            <br />
            이름을 입력해주세요.
          </p>
          <p className="mt-2 text-xs text-gray-800">
            이름은 공백없이 12자 이하,
            <br />
            기호는 - _ . 만 사용 가능합니다.
          </p>
        </div>
        <div className="flex flex-col space-y-5">
          <div>
            <p className="flex items-center space-x-4">
              <input
                value={name}
                onChange={(e) => {
                  setIsValid(null);
                  setName(e.currentTarget.value);
                }}
                className="flex-1 rounded-full bg-gray-100 px-4 py-3 placeholder:text-gray-600"
              />
              <Button
                disabled={disabled}
                onClick={onCheck}
                outline
                size="small"
                intent="primary"
              >
                중복확인
              </Button>
            </p>
            <p className="mt-2 text-sm text-purple">
              {isValid !== null &&
                (isValid
                  ? "사용 가능한 이름입니다."
                  : "사용 불가능한 이름입니다.")}
            </p>
          </div>
        </div>
      </div>
      <Button
        disabled={!isValid}
        type="submit"
        intent="primary"
        size="large"
        className="w-full"
      >
        확인
      </Button>
    </form>
  );
};
