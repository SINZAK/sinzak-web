import { useEffect, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/atoms/Button";
import { http } from "@lib/services/http";

export const FollowerPopup = NiceModal.create(
  ({
    userId,
    initialState,
  }: {
    userId: number;
    initialState: "follower" | "following";
  }) => {
    const modal = useModal();
    const [tab, setTab] = useState<"follower" | "following">(
      initialState ?? "follower"
    );

    const { data } = useQuery({
      queryKey: ["user", userId, tab],
      queryFn: () => {
        return http.get<
          {
            userId: number;
            name: string;
            picture: string;
          }[]
        >(`/users/${userId}/${tab}s`);
      },
      select: (result) => result.data,
    });

    const router = useRouter();

    useEffect(() => {
      const handleRouteChange = () => {
        modal.hide();
      };
      router.events.on("routeChangeStart", handleRouteChange);
      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }, [modal, router.events]);

    return (
      <Dialog
        as="div"
        className="fixed inset-0 z-30 grid place-items-center overflow-y-auto px-4"
        open={modal.visible}
        onClose={() => modal.remove()}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        <Dialog.Panel className="h-[640px] w-full max-w-sm transform space-y-4 overflow-hidden rounded-3xl bg-white p-6 pt-2 text-left align-middle shadow-xl">
          <div className="flex h-full flex-col">
            <div className="grid grid-flow-col text-lg font-bold">
              <button
                onClick={() => setTab("follower")}
                className={twMerge(
                  "border-b-2 border-transparent p-2 text-center",
                  tab === "follower" && "border-black"
                )}
              >
                팔로워
              </button>
              <button
                onClick={() => setTab("following")}
                className={twMerge(
                  "border-b-2 border-transparent p-2 text-center",
                  tab === "following" && "border-black"
                )}
              >
                팔로잉
              </button>
            </div>
            <div className="mb-4 flex-1 space-y-4 overflow-auto pt-4 pb-4">
              {data?.map((user) => (
                <>
                  <p className="flex items-center">
                    <Link
                      href={`/profile/${user.userId}`}
                      className="flex flex-1 items-center space-x-2"
                    >
                      <img
                        alt="프로필"
                        src={user.picture}
                        className="h-12 w-12 rounded-md"
                      />
                      <span className="flex-1 truncate text-lg font-medium">
                        {user.name}
                      </span>
                    </Link>
                  </p>
                </>
              ))}
            </div>
            <Button
              intent="secondary"
              size="large"
              onClick={() => modal.remove()}
            >
              닫기
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
    );
  }
);
