import { useAuth } from "@lib/services/auth";
import Link from "next/link";
import { useFollowMutation } from "../queries/follow";

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
          "px-4 py-1 font-medium border rounded-full border-red text-red"
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
            "px-4 py-1 font-medium text-white border rounded-full border-red bg-red"
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
            "px-4 py-1 font-medium border rounded-full border-red text-red"
          }
        >
          팔로우
        </button>
      )}
    </>
  );
};
