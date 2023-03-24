import { useCallback, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useRouter } from "next/router";

import { Menu } from "@components/atoms/Menu";
import { DeletePopup } from "@components/pages/item/components/DeletePopup";
import { useAuth } from "@lib/services/auth";

import { useQueryContext } from "../../states/QueryProvider";
import { ReportPopup } from "../ReportPopup";

export const MenuButton = ({
  button: MenuButton,
}: {
  button: () => JSX.Element;
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const { useItemQuery, useDeleteItemMutation, type, id } = useQueryContext();
  const { data } = useItemQuery();
  const { mutate: mutateDelete } = useDeleteItemMutation();

  const showReportPopup = useCallback(() => {
    if (data?.userId)
      NiceModal.show(ReportPopup, {
        userId: data?.userId,
      });
  }, [data?.userId]);
  const showDeletePopup = useCallback(() => {
    NiceModal.show(DeletePopup, { onOk: () => mutateDelete() });
  }, [mutateDelete]);

  if (!data) return <MenuButton />;

  if (data?.userId !== user?.userId)
    return (
      <>
        <Menu button={<MenuButton />}>
          <Menu.Item onClick={showReportPopup}>신고하기</Menu.Item>
          {/* <Menu.Item className="text-purple">
            {data?.author}님 차단하기
          </Menu.Item> */}
        </Menu>
      </>
    );

  return (
    <>
      <Menu button={<MenuButton />}>
        <Menu.Item onClick={() => router.push(`/build/edit/${type}/${id}`)}>
          수정
        </Menu.Item>
        <Menu.Item onClick={showDeletePopup} className="text-red">
          삭제
        </Menu.Item>
      </Menu>
    </>
  );
};
