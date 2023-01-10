import NoSsr from "@components/atoms/NoSsr";
import { createLayout } from "@components/layout/layout";

export default function Page() {
  return (
    <NoSsr>
      <div className="flex flex-col container">
        {Array.from({ length: 20 }).map((_, i) => (
          <button
            className="py-4 bleed flex justify-between items-center"
            key={i}
          >
            <div className="flex space-x-4">
              <span className="inline-block w-12 h-12 rounded-xl bg-gray-200" />
              <div className="flex flex-col justify-around">
                <p className="font-medium flex items-center">
                  <span>홍길동</span>
                  <span className="space-x-1 text-sm ml-2 text-gray-600">
                    <span>홍익대</span>
                    <span>·</span>
                    <span>1시간 전</span>
                  </span>
                </p>
                <p className="flex space-x-1">
                  <span>동해물과 백두산이 마르고 닳도록</span>
                </p>
              </div>
            </div>
            <div className="mr-2">
              <span className="inline-flex min-w-[1.5rem] h-6 bg-purple items-center justify-center rounded-full text-sm text-white font-bold">
                1
              </span>
            </div>
          </button>
        ))}
      </div>
    </NoSsr>
  );
}
Page.getLayout = createLayout({
  mobileNav: true,
  rawHeader: (
    <>
      <div className="h-12 flex container items-center justify-between bg-white relative">
        <span className="font-bold absolute w-full flex top-0 left-0 h-full items-center justify-center">
          채팅
        </span>
        <span></span>
        <span></span>
      </div>
    </>
  ),
});
