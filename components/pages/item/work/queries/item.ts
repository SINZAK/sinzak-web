import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";
import { WorkItemDetail } from "@types";

export const useWorkItemQuery = createQuery<
  WorkItemDetail,
  { id: number | undefined }
>({
  primaryKey: "/works",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    return (await http.post.default(`${primaryKey}/${variables.id}`)).data;
  },
  enabled: (_, { id }) => !!id,
});
