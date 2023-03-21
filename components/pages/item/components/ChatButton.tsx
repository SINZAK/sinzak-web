import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@components/atoms/Button";

export interface MyChatButtonProps {
  chatCnt: number;
}

export interface ChatButtonProps {
  id: number | null;
  disabled?: boolean;
}

export const ChatButtonPlaceholder = () => {
  return (
    <Button intent="primary" size="large" as={Link} href="/auth/signin">
      <img
        alt="ask"
        src="/assets/icons/ask.svg"
        className="mr-1 brightness-0 invert"
      />
      <span>거래 문의하기</span>
    </Button>
  );
};

export const MyChatButton = ({ chatCnt }: MyChatButtonProps) => {
  return (
    <Button as={Link} href="/chat" intent="primary">
      <img
        alt="ask"
        src="/assets/icons/ask.svg"
        className="mr-1 h-7 brightness-0 invert"
      />
      문의 중인 채팅방 {chatCnt || 0}
    </Button>
  );
};

export const ChatButton = ({ id, disabled }: ChatButtonProps) => {
  const router = useRouter();
  return (
    <>
      <Button
        disabled={disabled}
        intent="primary"
        size="large"
        onClick={() => router.push(`/chat#postId=${id}`)}
      >
        <img
          alt="ask"
          src="/assets/icons/ask.svg"
          className="mr-1 brightness-0 invert"
        />
        <span>거래 문의하기</span>
      </Button>
    </>
  );
};
