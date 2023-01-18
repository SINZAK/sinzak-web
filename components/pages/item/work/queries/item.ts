import { useQuery } from "@tanstack/react-query";
import { WorkItemDetail } from "@types";
import { useRouter } from "next/router";

import { http } from "@lib/services/http";

export const useWorkItemQuery = () => {
  const router = useRouter();

  return useQuery<WorkItemDetail>(
    ["workItemTest", Number(router.query.slug)],
    async () => {
      return (await http.post.default(`/works/${router.query.slug}`)).data;
    },
    {
      enabled: !!router.query.slug,
    }
  );
};
