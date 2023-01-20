import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { WishFilledIcon, WishIcon } from "@lib/icons";
import { useAuth } from "@lib/services/auth";

import { useQueryContext } from "../states/QueryProvider";

export interface WishButtonProps {
  isWish: boolean;
  userId: number;
  id: number;
}

export const WishButton = ({ isWish, userId, id }: WishButtonProps) => {
  const { useWishMutation } = useQueryContext();
  const { mutate, isLoading } = useWishMutation();

  const { user } = useAuth();

  if (!user)
    return (
      <Link
        href="/auth/signin"
        className="-mr-4 flex w-16 flex-col items-center"
      >
        <WishIcon className="h-8 w-8 text-gray-600" />
        <p className="mt-1 text-center text-sm text-gray-600">찜하기</p>
      </Link>
    );

  if (user.userId === userId)
    return (
      <span className="-mr-4 flex w-16 flex-col items-center">
        <WishIcon className="h-8 w-8 text-gray-600" />
        <p className="-mx-4 mt-1 text-sm text-gray-600">찜하기</p>
      </span>
    );

  return (
    <>
      <button
        onClick={() =>
          mutate({
            mode: !isWish,
            id,
          })
        }
        disabled={isLoading}
        className={twMerge(
          "-mr-4 flex w-16 flex-col items-center",
          isWish ? "text-red" : "text-gray-600"
        )}
      >
        {isWish ? (
          <WishFilledIcon className="h-8 w-8" />
        ) : (
          <WishIcon className="h-8 w-8" />
        )}
        <p className="-mx-4 mt-1 text-sm text-gray-600">찜하기</p>
      </button>
    </>
  );
};

export const WishButtonPlaceholder = () => {
  return (
    <div className="-mr-4 flex w-16 flex-col items-center">
      <WishIcon className="h-8 w-8 text-gray-600" />
      <p className="-mx-4 mt-1 text-sm text-gray-600">찜하기</p>
    </div>
  );
};
