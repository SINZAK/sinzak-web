import Link from "next/link";

import { Button } from "@components/atoms/Button";
import { useFollowMutation } from "@lib/queries/useFollowMutation";
import { useAuth } from "@lib/services/auth";

export const FollowingButton = ({
  isFollowing,
  userId,
  size,
}: {
  isFollowing: boolean;
  userId: number;
  size?: React.ComponentProps<typeof Button>["size"];
}) => {
  const { isLoading, mutate } = useFollowMutation();
  const { user } = useAuth();

  if (!user)
    return (
      <Button
        size={size}
        intent="primary"
        outline
        as={Link}
        href="/auth/signin"
      >
        팔로우
      </Button>
    );
  if (user.userId === userId) return null;

  return (
    <>
      {isFollowing ? (
        <Button
          size={size}
          intent="primary"
          onClick={() =>
            mutate({
              mode: "unfollow",
              userId,
            })
          }
          disabled={isLoading}
        >
          팔로잉
        </Button>
      ) : (
        <Button
          size={size}
          intent="primary"
          outline
          onClick={() =>
            mutate({
              mode: "follow",
              userId,
            })
          }
          disabled={isLoading}
        >
          팔로우
        </Button>
      )}
    </>
  );
};
