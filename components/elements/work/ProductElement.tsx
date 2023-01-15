import React from "react";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { ProductSimple } from "@types";
import Skeleton from "react-loading-skeleton";
import { formatNumber, formatRelativeTime } from "@lib/services/intl/format";
import Image from "next/image";

export const WorkElement = React.forwardRef<
  any,
  { className?: string; data?: ProductSimple }
>(({ className, data }, ref) => {
  if (!data) return <WorkElementSkeleton ref={ref} className={className} />;
  return (
    <Link
      href={`/work/${data.id}`}
      ref={ref}
      draggable="false"
      className={cx(className, "flex flex-col")}
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-4/3 rounded-xl">
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
        <p className="flex mt-1 space-x-1 text-xs md:text-sm">
          <span>{data.author} 작가</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-600">{formatRelativeTime(data.date)}</span>
        </p>
      </div>
    </Link>
  );
});
WorkElement.displayName = "ProductElement";

const WorkElementSkeleton = React.forwardRef<
  HTMLDivElement,
  { className?: string }
>(({ className }, ref) => {
  return (
    <div ref={ref} className={cx(className, "flex flex-col")}>
      <Skeleton className="block rounded-xl aspect-4/3" />
      <div className="mt-4">
        <p className="font-medium leading-tight md:text-lg md:leading-tight">
          <Skeleton width="3em" />
        </p>
        <p className="font-bold leading-tight md:text-lg md:leading-tight">
          <Skeleton width="10em" />
        </p>
        <p className="flex mt-1 space-x-1 text-xs md:text-sm">
          <Skeleton width="10em" />
        </p>
      </div>
    </div>
  );
});
WorkElementSkeleton.displayName = "ProductElementSkeleton";
