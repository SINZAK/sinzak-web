import { useState } from "react";

import { useAuth } from "@lib/services/auth";

import { Menu } from "@components/atoms/Menu";
import { DeletePopup } from "@components/elements/product/DeletePopup";

import { useQueryContext } from "../../states/QueryProvider";

export const MenuButton = ({
  button: MenuButton,
}: {
  button: () => JSX.Element;
}) => {
  const { user } = useAuth();

  const { useItemQuery, useDeleteItemMutation } = useQueryContext();
  const { data } = useItemQuery();
  const { mutate } = useDeleteItemMutation();

  const [isOpen, setIsOpen] = useState(false);

  if (!data) return <MenuButton />;

  if (data?.userId !== user?.userId)
    return (
      <>
        <Menu button={<MenuButton />}>
          <Menu.Item>신고하기</Menu.Item>
          <Menu.Item className="text-purple">
            {data?.author}님 차단하기
          </Menu.Item>
        </Menu>
      </>
    );

  return (
    <>
      <DeletePopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={() => mutate()}
      />
      <Menu button={<MenuButton />}>
        <Menu.Item>수정</Menu.Item>
        <Menu.Item onClick={() => setIsOpen(true)} className="text-red">
          삭제
        </Menu.Item>
      </Menu>
    </>
  );
};
