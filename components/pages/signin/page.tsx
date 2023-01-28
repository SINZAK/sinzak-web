import { tempLogin } from "@lib/services/auth";
import Splash from "@public/assets/login-splash-bg.jpg?inline";

export default function Page() {
  return (
    <>
      <div
        className={`fixed h-full w-full bg-cover`}
        style={{
          backgroundImage: `url("${Splash}")`,
        }}
      ></div>
      <div className="relative flex h-screen w-full items-center justify-center bg-white bg-opacity-25">
        <div className="flex min-h-[80vh] w-full max-w-md flex-col justify-between rounded-xl bg-white px-7 py-14 sm:min-h-[480px] sm:px-14 sm:shadow-xl">
          <div className="w-full">
            <img alt="logo" src="/assets/logo-type.svg" className="h-12" />
            <p className="mt-1 text-right text-xl font-bold">
              신세대의 작품을 만나다
            </p>
          </div>
          <div>
            {/* <p className="mb-3 text-center text-sm">
              SNS 계정으로 간편하게 시작하기
            </p> */}
            <div className="flex flex-col space-y-3 font-medium">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const email = (e.target as any)[0].value;
                  const res = await tempLogin(email);
                  if (res) location.href = "/";
                }}
                className="flex flex-col space-y-3"
              >
                <input
                  defaultValue="sinzakofficial@gmail.com"
                  className="rounded-xl px-6 py-3 text-gray-800 ring-1 ring-inset ring-gray-200"
                />
                <button className="rounded-xl bg-gray-100 px-6 py-3">
                  임시 로그인
                </button>
              </form>
              {/* <a className="rounded-xl bg-gray-100 px-6 py-3">
                네이버로 시작하기
              </a>
              <a className="rounded-xl bg-gray-100 px-6 py-3">
                카카오로 시작하기
              </a>
              <a className="rounded-xl bg-gray-100 px-6 py-3">
                Google로 시작하기
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
