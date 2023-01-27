import React from "react";
import { cx } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { formatNumber, formatRelativeTime } from "@lib/services/intl/format";
import { ItemSimple } from "@types";

export const ProductElement = React.forwardRef<
  any,
  { className?: string; data?: ItemSimple }
>(({ className, data }, ref) => {
  if (!data) return <ProductElementSkeleton ref={ref} className={className} />;
  return (
    <Link
      href={`/market/${data.id}`}
      ref={ref}
      draggable="false"
      className={cx(className, "flex flex-col")}
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
        {data.thumbnail && (
          <Image
            src={data.thumbnail}
            fill
            className="object-cover"
            alt=""
            draggable="false"
          />
        )}
      </div>
      <div className="mt-4">
        <p className="font-medium leading-tight md:text-lg md:leading-tight">
          {data.title}
        </p>
        <p className="font-bold leading-tight md:text-lg md:leading-tight">
          {formatNumber(data.price)}원
        </p>
        <p className="mt-1 flex space-x-1 text-xs md:text-sm">
          <span>{data.author} 작가</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-600">{formatRelativeTime(data.date)}</span>
        </p>
      </div>
    </Link>
  );
});
ProductElement.displayName = "ProductElement";

const ProductElementSkeleton = React.forwardRef<
  HTMLDivElement,
  { className?: string }
>(({ className }, ref) => {
  return (
    <div ref={ref} className={cx(className, "flex flex-col")}>
      <Skeleton inline className="!block aspect-4/3 !rounded-xl" />
      <div className="mt-4">
        <p className="font-medium leading-tight md:text-lg md:leading-tight">
          <Skeleton width="6em" />
        </p>
        <p className="font-bold leading-tight md:text-lg md:leading-tight">
          <Skeleton width="9em" />
        </p>
        <p className="mt-1 flex space-x-1 text-xs md:text-sm">
          <Skeleton width="10em" />
        </p>
      </div>
    </div>
  );
});
ProductElementSkeleton.displayName = "ProductElementSkeleton";
