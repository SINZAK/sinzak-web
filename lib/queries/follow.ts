import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMarketItemQuery } from "@components/pages/item/market/queries/item";
import { useWorkItemQuery } from "@components/pages/item/work/queries/item";
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
        queryKey: [useMarketItemQuery.getPrimaryKey()],
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
        queryKey: [useWorkItemQuery.getPrimaryKey()],
        type: "active",
        predicate: ({ state }) =>
          (state.data as WorkItemDetail)?.userId === userId,
      });
    },
  });
};
