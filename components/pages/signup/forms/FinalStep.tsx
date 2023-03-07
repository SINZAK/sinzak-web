import Link from "next/link";

import { Button } from "@components/atoms/Button";

export const FinalStep = () => {
  return (
    <div className="relative flex flex-1 flex-col">
      <div className="mt-8 flex flex-1 flex-col items-center space-y-2 text-center">
        <p className="text-4xl font-bold text-red">Welcome!</p>
        <p>
          신작에 가입이 완료되었습니다.
          <br />
          이제 자유롭게 작품을 탐색하고 거래해보세요.
        </p>
      </div>
      <div className="relative flex justify-center">
        <div className="w-4/5">
          <img alt="" src="/assets/images/mobile-iso-color.png" />
        </div>
        <div className="absolute left-1/2 w-1/2 -translate-x-1/2">
          <img
            alt=""
            className="animate-bounce"
            src="/assets/images/notify-heart-iso-color.png"
          />
        </div>
      </div>
      <Button size="large" intent="primary" as={Link} href="/">
        작품 보러 가기
      </Button>
    </div>
  );
};
