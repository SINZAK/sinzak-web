import React from "react";
import { cx } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { Button } from "@components/atoms/Button";
import { formatRelativeTime } from "@lib/services/intl/format";
import { ProductType } from "@types";

import { useChangeProductCompleteMutation } from "../queries/useChangeProductCompleteMutation";

export const MyProductElement = React.forwardRef<
  any,
  {
    type: ProductType;
    showPrice?: boolean;
    className?: string;
    data?: {
      complete: boolean;
      date: string;
      id: number;
      thumbnail: string | null;
      title: string;
    };
  }
>(({ className, data, type, showPrice }, ref) => {
  showPrice = showPrice ?? type === "market";
  const { mutate } = useChangeProductCompleteMutation();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!data) return;
    mutate({
      type,
      id: data.id,
    });
  };

  if (!data)
    return (
      <MyProductElementSkeleton
        showPrice={showPrice}
        ref={ref}
        className={className}
      />
    );
  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
        <Link
          href={`/${type}/${data.id}`}
          ref={ref}
          draggable="false"
          className={cx(className, "flex flex-col")}
        >
          {data.thumbnail && (
            <Image
              src={data.thumbnail}
              fill
              sizes="480px"
              className="object-cover"
              alt=""
              draggable="false"
            />
          )}
        </Link>
      </div>
      <div className="mt-4 flex">
        <div className="flex-1">
          <Link
            href={`/${type}/${data.id}`}
            ref={ref}
            draggable="false"
            className={cx(className, "flex flex-col")}
          >
            <p className="font-medium leading-tight md:text-lg md:leading-tight">
              {data.title}
            </p>
            {/* {showPrice && (
              <p className="font-bold leading-tight md:text-lg md:leading-tight">
                {formatNumber(data.price)}원
              </p>
            )} */}
            <p className="mt-1 flex space-x-1 text-xs md:text-sm">
              <span className="text-gray-600">
                {formatRelativeTime(data.date)}
              </span>
            </p>
          </Link>
        </div>
        <div>
          <Button
            onClick={data.complete ? undefined : onClick}
            size="small"
            intent={data.complete ? "base" : "secondary"}
            outline
          >
            {type === "market"
              ? data.complete
                ? "거래 완료"
                : "거래 완료하기"
              : data.complete
              ? "모집 완료"
              : "모집 완료하기"}
          </Button>
        </div>
      </div>
    </div>
  );
});
MyProductElement.displayName = "ProductElement";

const MyProductElementSkeleton = React.forwardRef<
  HTMLDivElement,
  { className?: string; showPrice: boolean }
>(({ className, showPrice }, ref) => {
  return (
    <div ref={ref} className={cx(className, "flex flex-col")}>
      <Skeleton inline className="!block aspect-4/3 !rounded-xl" />
      <div className="mt-4">
        <p className="font-medium leading-tight md:text-lg md:leading-tight">
          <Skeleton width="6em" />
        </p>
        {showPrice && (
          <p className="font-bold leading-tight md:text-lg md:leading-tight">
            <Skeleton width="9em" />
          </p>
        )}
        <p className="mt-1 flex space-x-1 text-xs md:text-sm">
          <Skeleton width="10em" />
        </p>
      </div>
    </div>
  );
});
MyProductElementSkeleton.displayName = "ProductElementSkeleton";
