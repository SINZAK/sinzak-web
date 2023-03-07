import React, { useState } from "react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import { useEffectOnce } from "@lib/hooks/useEffectOnce";
import { ChevronLeftIcon } from "@lib/icons";
import inMemoryJwtManager from "@lib/services/auth/inMemoryJwtManager";
import Splash from "@public/assets/login-splash-bg.jpg?inline";

import { FifthStep } from "./forms/FifthStep";
import { FinalStep } from "./forms/FinalStep";
import { FirstStep } from "./forms/FirstStep";
import { FourthStep } from "./forms/FourthStep";
import { SecondStep } from "./forms/SecondStep";
import { ThirdStep } from "./forms/ThirdStep";
import { StepProvider, useStepContext } from "./states";

const Container = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-full max-w-md flex-col bg-white p-7 sm:h-[640px] sm:rounded-xl sm:shadow-xl">
        {children}
      </div>
    </div>
  </>
);

const StepForm = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const [step, setStep] = useStepContext();

  return (
    <>
      <div className="w-full">
        <button
          onClick={() => {
            if (step === 0) router.push("/auth/signin");
            else setStep((step) => step - 1);
          }}
        >
          <ChevronLeftIcon />
        </button>
      </div>
      {children}
    </>
  );
};

export default function Page() {
  const methods = useForm();
  const stepState = useState(0);
  const step = stepState[0];
  const [valid, setValid] = useState(false);
  const router = useRouter();

  useEffectOnce(() => {
    if (inMemoryJwtManager.getToken()) setValid(true);
    else router.push("/auth/signin");
  });

  const page: Record<number, React.ReactNode> = {
    0: <FirstStep />,
    1: <SecondStep />,
    2: <ThirdStep />,
    3: <FourthStep />,
    4: <FifthStep />,
  };

  return (
    <>
      <div
        className={`fixed h-full w-full bg-cover`}
        style={{
          backgroundImage: `url("${Splash}")`,
        }}
      ></div>
      <div className={`fixed h-full w-full bg-white bg-opacity-25`} />
      {valid && (
        <Container>
          <StepProvider value={stepState}>
            {step === 5 ? (
              <FinalStep />
            ) : (
              <FormProvider {...methods}>
                <StepForm>{page[step]}</StepForm>
              </FormProvider>
            )}
          </StepProvider>
        </Container>
      )}
    </>
  );
}
