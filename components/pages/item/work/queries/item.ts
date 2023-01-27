import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { http } from "@lib/services/http";
import { WorkItemDetail } from "@types";

export const useWorkItemQuery = () => {
  const router = useRouter();

  return useQuery<WorkItemDetail>(
    ["work-item", Number(router.query.slug)],
    async () => {
      return (await http.post.default(`/works/${router.query.slug}`)).data;
    },
    {
      enabled: !!router.query.slug,
    }
  );
};
