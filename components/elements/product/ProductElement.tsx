import React from "react";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { Product } from "@types";
import Skeleton from "react-loading-skeleton";

export const ProductElement = React.forwardRef<
  HTMLAnchorElement,
  { className?: string; data?: Product }
>(({ className, data }, ref) => {
  if (!data) return <ProductElementSkeleton ref={ref} className={className} />;
  return (
    <Link
      href="/market/item"
      ref={ref}
      className={cx(className, "flex flex-col")}
    >
      <div className="bg-gray-200 rounded-lg aspect-4/3"></div>
      <div className="mt-4">
        <p className="font-medium leading-tight md:text-lg md:leading-tight">
          상품명
        </p>
        <p className="font-bold leading-tight md:text-lg md:leading-tight">
          00,000원
        </p>
        <p className="flex mt-1 space-x-1 text-xs md:text-sm">
          <span>홍길동 작가</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-600">10시간 전</span>
        </p>
      </div>
    </Link>
  );
});
ProductElement.displayName = "ProductElement";

const ProductElementSkeleton = React.forwardRef<any, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={cx(className, "flex flex-col")}>
        <Skeleton className="block rounded-lg aspect-4/3" />
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
  }
);
ProductElementSkeleton.displayName = "ProductElementSkeleton";
