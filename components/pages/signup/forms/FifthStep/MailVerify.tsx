import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@components/atoms/Button";

import { useCheckMailCertifyMutation } from "../../queries/useCheckMailCertifyMutation";
import { useSendMailCertifyMutation } from "../../queries/useSendMailCertifyMutation";
import { useStepContext } from "../../states";

export const MailVerify = ({
  univName,
  onSubmit,
}: {
  univName: string;
  onSubmit: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSent, setIsSent] = useState(false);

  const { mutate: mutateSend, isLoading: isSendLoading } =
    useSendMailCertifyMutation();
  const { mutate: mutateCheck, isLoading: isCheckLoading } =
    useCheckMailCertifyMutation();

  const valid = useMemo(
    () => new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(email),
    [email]
  );

  const sendMailCertify = () => {
    mutateSend(
      {
        univName,
        email,
      },
      {
        onSuccess: () => setIsSent(true),
        onError: (e: any) => toast.error(e.message),
      }
    );
  };

  const checkMailCertify: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutateCheck(
      {
        univName,
        email,
        code: parseInt(code),
      },
      {
        onSuccess: () => onSubmit(),
        onError: (e: any) => toast.error(e.message),
      }
    );
  };

  return (
    <form
      onSubmit={checkMailCertify}
      className="flex flex-1 flex-col space-y-5"
    >
      <div>
        <p className="text-sm text-gray-800">
          이메일을 입력하면 인증 메일을 보내드립니다.
          <br />
          이메일 수신 후 인증번호를 입력하면 인증이 완료됩니다.
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <p>이메일 주소</p>
          <input
            disabled={isSent}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            placeholder="학교 메일을 입력하세요."
            className="flex-1 rounded-full bg-gray-100 px-4 py-3 placeholder:text-gray-600"
          />
        </div>
        {!isSent ? (
          <Button
            onClick={sendMailCertify}
            disabled={!valid || isSendLoading}
            className="w-full"
            intent="primary"
            outline
          >
            인증 메일 보내기
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                setCode("");
                setEmail("");
                setIsSent(false);
              }}
              intent="primary"
              outline
            >
              이메일 변경
            </Button>
            <div className="flex flex-col space-y-2">
              <p>인증 번호</p>
              <input
                value={code}
                onChange={(e) => setCode(e.currentTarget.value)}
                type="number"
                placeholder="메일로 전송된 인증 번호를 입력하세요."
                className="flex-1 rounded-full bg-gray-100 px-4 py-3 placeholder:text-gray-600"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex-1" />
      <div className="grid grid-cols-2 gap-x-4">
        <Button onClick={() => onSubmit()} size="large" className="w-full">
          다음에 하기
        </Button>
        <Button
          disabled={!(code.length === 4) || isCheckLoading}
          type="submit"
          intent="primary"
          size="large"
          className="w-full"
        >
          확인
        </Button>
      </div>
    </form>
  );
};
