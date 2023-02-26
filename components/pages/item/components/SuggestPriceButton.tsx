import React, { useCallback } from "react";
import NiceModal from "@ebay/nice-modal-react";

import { SuggestPricePopup } from "./SuggestPricePopup";
import { useQueryContext } from "../states/QueryProvider";

export const SuggestPriceButton = ({
  render: Element,
}: {
  render: React.ComponentType<
    React.PropsWithChildren<{
      onClick: React.MouseEventHandler<HTMLButtonElement>;
    }>
  >;
}) => {
  const { useItemQuery, useSuggestPriceMutation } = useQueryContext();
  const { data } = useItemQuery();
  const { mutate } = useSuggestPriceMutation();

  const showSuggestPricePopup = useCallback(() => {
    if (data?.id) NiceModal.show(SuggestPricePopup, { mutate, id: data.id });
  }, [data?.id, mutate]);

  return <Element onClick={showSuggestPricePopup}>가격 제안하기</Element>;
};
