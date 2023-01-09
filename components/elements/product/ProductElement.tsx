import React from "react";
import { cx } from "class-variance-authority";
import Link from "next/link";

export const ProductElement = React.forwardRef<
  HTMLAnchorElement,
  { className?: string }
>(({ className }, ref) => {
  return (
    <Link
      href="/market/item"
      ref={ref}
      className={cx(className, "flex flex-col")}
    >
      <div className="aspect-4/3 bg-gray-200 rounded-lg"></div>
      <div className="mt-4">
        <p className="font-medium text-lg leading-tight">상품명</p>
        <p className="font-bold text-lg leading-tight">00,000원</p>
        <p className="text-sm flex space-x-1 mt-1">
          <span>홍길동 작가</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-600">10시간 전</span>
        </p>
      </div>
    </Link>
  );
});
ProductElement.displayName = "ProductElement";
