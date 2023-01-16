import { http } from "@lib/services/http";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProductDetail } from "@types";

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
        queryKey: ["productTest"],
        type: "active",
        predicate: ({ state }) =>
          (state.data as ProductDetail)?.userId === userId,
      });
    },
  });
};
