import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useAuth } from "@lib/services/auth";

export const Authenticated = ({ children }: { children?: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isLoading, user);
    if (router && !isLoading && !user) router.replace("/auth/signin");
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;
  return <>{children}</>;
};
