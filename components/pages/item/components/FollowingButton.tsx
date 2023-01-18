import Link from "next/link";

import { useFollowMutation } from "@lib/queries/follow";
import { useAuth } from "@lib/services/auth";

export const FollowingButton = ({
  isFollowing,
  userId,
}: {
  isFollowing: boolean;
  userId: number;
}) => {
  const { isLoading, mutate } = useFollowMutation();
  const { user } = useAuth();

  if (!user)
    return (
      <Link
        href="/auth/signin"
        className={
          "rounded-full border border-red px-4 py-1 font-medium text-red"
        }
      >
        팔로우
      </Link>
    );
  if (user.userId === userId) return null;

  return (
    <>
      {isFollowing ? (
        <button
          onClick={() =>
            mutate({
              mode: "unfollow",
              userId,
            })
          }
          disabled={isLoading}
          className={
            "rounded-full border border-red bg-red px-4 py-1 font-medium text-white"
          }
        >
          팔로잉
        </button>
      ) : (
        <button
          onClick={() =>
            mutate({
              mode: "follow",
              userId,
            })
          }
          disabled={isLoading}
          className={
            "rounded-full border border-red px-4 py-1 font-medium text-red"
          }
        >
          팔로우
        </button>
      )}
    </>
  );
};
