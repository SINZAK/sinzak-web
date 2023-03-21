import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";

export interface SimpleProduct {
  complete: boolean;
  date: string;
  id: number;
  thumbnail: null | string;
  title: string;
}

export interface MyProfile {
  profile: {
    userId: number;
    myProfile: boolean;
    name: string;
    introduction: string;
    followingNumber: string;
    followerNumber: string;
    imageUrl: string;
    univ: string | null;
    cert_uni: boolean;
    isFollow: boolean;
    categoryLike: string;
  };
  products: SimpleProduct[];
  workEmploys: SimpleProduct[];
  works: SimpleProduct[];
}

export const useMyProfileQuery = createQuery<MyProfile>({
  primaryKey: "/users/my-profile",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    return (await http.get(primaryKey)).data;
  },
});
