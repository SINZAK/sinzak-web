import { useState } from "react";

import { Button } from "@components/atoms/Button";
import { CheckIcon } from "@lib/icons";

import { MailVerify } from "./MailVerify";

export const FifthStep = () => {
  const [verifyType, setVerifyType] = useState<"mail" | "photo">("mail");

  return (
    <>
      <div className="flex flex-1 flex-col font-medium">
        <div className="mt-4 mb-6">
          <p className="text-xl font-bold">학교 인증</p>
        </div>
        <div className="flex flex-1 flex-col space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setVerifyType("mail")}
              className="flex-1"
              intent={verifyType === "mail" ? "primary" : "base"}
            >
              <CheckIcon />
              학교 웹메일 인증
            </Button>
            <Button
              onClick={() => setVerifyType("photo")}
              className="flex-1"
              intent={verifyType === "photo" ? "primary" : "base"}
            >
              <CheckIcon />
              학생증 인증
            </Button>
          </div>
          <hr />
          {verifyType === "mail" && <MailVerify />}
          {verifyType === "photo" && <PhotoVerify />}
        </div>
      </div>
    </>
  );
};
