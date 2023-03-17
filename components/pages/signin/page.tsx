import Link from "next/link";

import { tempLogin } from "@lib/services/auth";
import { API } from "@lib/utils/consts";
import Splash from "@public/assets/login-splash-bg.jpg?inline";

export default function Page() {
  return (
    <>
      <div
        className={`fixed h-full w-full bg-cover`}
        style={{
          backgroundImage: `url("${Splash}")`,
        }}
      />
      <div className={`fixed h-full w-full bg-white bg-opacity-25`} />
      <div className="relative flex h-screen w-full items-center justify-center">
        <div className="flex min-h-[80vh] w-full max-w-md flex-col justify-between rounded-xl bg-white px-7 py-14 sm:min-h-[640px] sm:px-14 sm:shadow-xl">
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
                  console.log(res);
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
              <Link
                href="/auth/signup"
                className="rounded-xl bg-gray-100 px-6 py-3"
              >
                테스트 회원가입
              </Link>
              <a
                href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=782966145872-6shnmrvqi0q4sihr8etu9nrvh9jv43dh.apps.googleusercontent.com&redirect_uri=${`${API.BASE_URI}/oauth/google`}&response_type=code&scope=profile%20email&include_granted_scopes=true`}
                className="rounded-xl bg-gray-100 px-6 py-3"
              >
                Google로 시작하기
              </a>
              <a
                href={`https://kauth.kakao.com/oauth/authorize?client_id=3201538a34f65dfa0fb2e96b0d268ca7&redirect_uri=${`${API.BASE_URI}/oauth/kakao`}&response_type=code`}
                className="rounded-xl bg-gray-100 px-6 py-3"
              >
                카카오로 시작하기
              </a>
              <a
                href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=DwXMEfKZq0tmkrsn6kLk&state=STATE_STRING&redirect_uri=${`${API.BASE_URI}/oauth/naver`}`}
                className="rounded-xl bg-gray-100 px-6 py-3"
              >
                네이버로 시작하기
              </a>
              <a
                href={`https://appleid.apple.com/auth/authorize?client_id=net.sinzak.sinzak&redirect_uri=${`${API.BASE_URI}/oauth/apple`}&response_type=code&id_token&response_mode=form_post`}
                className="rounded-xl bg-gray-100 px-6 py-3"
              >
                Apple로 시작하기
              </a>
              {/* <a className="rounded-xl bg-gray-100 px-6 py-3">
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
