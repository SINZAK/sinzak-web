import { useMutation, useQueryClient } from "@tanstack/react-query";

import { http } from "@lib/services/http";
import { MarketItemDetail, UserProfile, WorkItemDetail } from "@types";

export const useFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    {
      mode: "follow" | "unfollow";
      userId: number;
    }
  >({
    mutationFn: async ({ mode, userId }) => {
      if (mode !== "follow" && mode !== "unfollow") throw Error();
      const res = await http.post.json(
        `/users/${mode === "follow" ? "follow" : "unfollow"}`,
        { userId }
      );
      return res;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["market-item"],
        type: "active",
        predicate: ({ state }) =>
          (state.data as MarketItemDetail)?.userId === userId,
      });
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
        type: "active",
        predicate: ({ state }) =>
          (state.data as UserProfile)?.profile.userId === userId,
      });
      queryClient.invalidateQueries({
        queryKey: ["work-item"],
        type: "active",
        predicate: ({ state }) =>
          (state.data as WorkItemDetail)?.userId === userId,
      });
    },
  });
};
