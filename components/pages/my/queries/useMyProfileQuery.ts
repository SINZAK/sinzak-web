import { useQuery } from "@tanstack/react-query";

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

export const useMyProfileQuery = () => {
  return useQuery<MyProfile>(["/users/my-profile"], async () => {
    return (await http.get(`/users/my-profile`)).data;
  });
};
