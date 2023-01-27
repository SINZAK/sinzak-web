import { twMerge } from "tailwind-merge";

export const ChatText = ({ text, own }: { text: string; own?: boolean }) => {
  return (
    <div
      className={twMerge(
        "rounded-full px-4 py-2",
        own ? "self-end bg-red text-white" : "self-start bg-gray-100 text-black"
      )}
    >
      {text}
    </div>
  );
};
