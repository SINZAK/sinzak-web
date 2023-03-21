import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";
import { UserProfile } from "@types";

export const useUserProfileQuery = createQuery<
  UserProfile,
  {
    userId: number;
  }
>({
  primaryKey: "/users/{userId}/profile",
  queryFn: async ({ queryKey: [_primaryKey, { userId }] }) => {
    return (await http.get(`/users/${userId}/profile`)).data;
  },
  enabled: (_, { userId }) => !!userId,
});
