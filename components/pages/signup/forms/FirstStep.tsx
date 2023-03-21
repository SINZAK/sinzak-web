import { useFormContext, useForm, Controller } from "react-hook-form";

import { Button } from "@components/atoms/Button";
import { CheckBox } from "@components/atoms/CheckBox";
import { ChevronRightIcon } from "@lib/icons";

import { useStepContext } from "../states";

export const FirstStep = () => {
  const globalForm = useFormContext();
  const { handleSubmit, watch, control, setValue, formState, trigger } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        age: false,
        term: false,
        privacy: false,
        marketing: false,
      },
    });
  const [_, setStep] = useStepContext();

  const values = watch();
  const checked = Object.values(values).every((_) => _);

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={handleSubmit(
        (data) => {
          globalForm.setValue("term", data.marketing);
          setStep((step) => step + 1);
        },
        (errors) => {
          console.error(errors);
        }
      )}
    >
      <div className="flex flex-1 flex-col font-medium">
        <p className="mt-4 mb-6 text-xl font-bold">서비스 이용 동의</p>
        <div className="flex flex-col space-y-5">
          <p>
            <CheckBox
              checked={checked}
              onClick={() => {
                setValue("age", !checked);
                setValue("term", !checked);
                setValue("privacy", !checked);
                setValue("marketing", !checked);
                trigger();
              }}
              onChange={(checked) => {}}
              intent="primary"
            >
              약관 전체동의
            </CheckBox>
          </p>
          <hr />
          <p>
            <Controller
              control={control}
              name="age"
              rules={{
                validate: (x) => x,
              }}
              render={({ field: { value, ...rest } }) => (
                <CheckBox checked={value} {...rest} intent="primary">
                  (필수) 만 14세 이상입니다.
                </CheckBox>
              )}
            />
          </p>
          <p className="flex items-center justify-between">
            <Controller
              control={control}
              name="term"
              rules={{
                validate: (x) => x,
              }}
              render={({ field: { value, ...rest } }) => (
                <CheckBox checked={value} {...rest} intent="primary">
                  (필수) 서비스 이용약관
                </CheckBox>
              )}
            />
            <a className="contents" target="_blank" href="/docs/terms.html">
              <span className="text-xs">
                <ChevronRightIcon />
              </span>
            </a>
          </p>
          <p className="flex items-center justify-between">
            <Controller
              control={control}
              name="privacy"
              rules={{
                validate: (x) => x,
              }}
              render={({ field: { value, ...rest } }) => (
                <CheckBox checked={value} {...rest} intent="primary">
                  (필수) 개인정보 처리방침
                </CheckBox>
              )}
            />
            <a className="contents" target="_blank" href="/docs/privacy.html">
              <span className="text-xs">
                <ChevronRightIcon />
              </span>
            </a>
          </p>
          <p className="flex items-center justify-between">
            <Controller
              control={control}
              name="marketing"
              render={({ field: { value, ...rest } }) => (
                <CheckBox checked={value} {...rest} intent="primary">
                  (선택) 마케팅 정보 수신 동의
                </CheckBox>
              )}
            />
            <a
              className="contents"
              target="_blank"
              href="https://sinzak.notion.site/cb0fde6cb51347719f9d100e8e5aba68"
              rel="noreferrer"
            >
              <span className="text-xs">
                <ChevronRightIcon />
              </span>
            </a>
          </p>
        </div>
      </div>
      <Button
        disabled={!formState.isValid}
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
