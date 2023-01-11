import { tempLogin } from "@lib/services/auth";

export default function Page() {
  const onClick = async () => {
    const res = await tempLogin();
    if (res) location.href = "/";
  };

  return (
    <>
      <div className="fixed w-full h-full sm:bg-[url(/assets/login-splash-bg.jpg)] bg-cover"></div>
      <div className="relative flex items-center justify-center w-full h-screen bg-white bg-opacity-25">
        <div className="bg-white w-full max-w-md min-h-[80vh] sm:min-h-[480px] px-7 sm:px-14 py-14 rounded-xl sm:shadow-xl justify-between flex flex-col">
          <div className="w-full">
            <img alt="logo" src="/assets/logo-type.svg" className="h-12" />
            <p className="mt-1 text-xl font-bold text-right">
              신세대의 작품을 만나다
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm text-center">
              SNS 계정으로 간편하게 시작하기
            </p>
            <div className="flex flex-col space-y-3 font-medium">
              <button
                onClick={onClick}
                className="px-6 py-3 bg-red-500 rounded-xl"
              >
                임시 로그인
              </button>
              <a className="px-6 py-3 bg-gray-100 rounded-xl">
                네이버로 시작하기
              </a>
              <a className="px-6 py-3 bg-gray-100 rounded-xl">
                카카오로 시작하기
              </a>
              <a className="px-6 py-3 bg-gray-100 rounded-xl">
                Google로 시작하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
