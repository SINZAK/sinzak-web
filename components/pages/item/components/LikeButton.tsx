import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { LikeFilledIcon, LikeIcon } from "@lib/icons";
import { useAuth } from "@lib/services/auth";

import { useQueryContext } from "../states/QueryProvider";

export interface LikeButtonProps {
  likesCnt: number;
  isLike: boolean;
  userId: number;
  id: number;
}

export const LikeButton = ({
  likesCnt,
  isLike,
  userId,
  id,
}: LikeButtonProps) => {
  const { useLikeMutation } = useQueryContext();
  const { mutate, isLoading } = useLikeMutation();

  const { user } = useAuth();

  if (!user)
    return (
      <Link
        href="/auth/signin"
        className="-ml-4 flex flex-col items-center px-4"
      >
        <LikeIcon className="h-8 w-8 fill-gray-600" />
        <p className="mt-1 text-sm text-gray-600">{likesCnt}</p>
      </Link>
    );

  if (user.userId === userId)
    return (
      <span className="-ml-4 flex flex-col items-center px-4">
        <LikeIcon className="h-8 w-8 fill-gray-600" />
        <p className="mt-1 text-sm text-gray-600">{likesCnt}</p>
      </span>
    );

  return (
    <>
      <button
        onClick={() =>
          mutate({
            mode: !isLike,
            id,
          })
        }
        disabled={isLoading}
        className="-ml-4 flex flex-col items-center px-4"
      >
        {isLike ? (
          <LikeFilledIcon className="h-8 w-8 fill-gray-600" />
        ) : (
          <LikeIcon className="h-8 w-8 fill-gray-600" />
        )}
        <p className="mt-1 text-sm text-gray-600">{likesCnt}</p>
      </button>
    </>
  );
};

export const LikeButtonPlaceholder = () => {
  return (
    <div className="-ml-4 flex flex-col items-center px-4">
      <LikeIcon className="h-8 w-8 fill-gray-600" />
      <p className="mt-1 text-sm text-gray-600">
        <Skeleton className="w-8" />
      </p>
    </div>
  );
};
