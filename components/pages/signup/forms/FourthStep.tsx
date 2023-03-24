import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@components/atoms/Button";

import { useStepContext } from "../states";

const univList = [
  ["가천대학교", "gachon.ac.kr"],
  ["강원대학교", "kangwon.ac.kr"],
  ["건국대학교", "konkuk.ac.kr"],
  ["건국대학교(글로컬)", "kku.ac.kr"],
  ["경기과학기술대학교", "gtec.ac.kr"],
  ["경기대학교", "kyonggi.ac.kr"],
  ["경북대학교", "knu.ac.kr"],
  ["경인교육대학교", "ginue.ac.kr"],
  ["경희대학교", "khu.ac.kr"],
  ["계원예술대학교", "kaywon.ac.kr"],
  ["고려대학교", "korea.ac.kr"],
  ["광운대학교", "kw.ac.kr"],
  ["국민대학교", "kookmin.ac.kr"],
  ["단국대학교", "dankook.ac.kr"],
  ["덕성여자대학교", "duksung.ac.kr"],
  ["동국대학교", "dongguk.edu"],
  ["동국대학교(경주)", "dongguk.ac.kr"],
  ["동덕여자대학교", "dongduk.ac.kr"],
  ["명지대학교", "mju.ac.kr"],
  ["명지전문대학", "mjc.ac.kr"],
  ["부산대학교", "pusan.ac.kr"],
  ["상명대학교", "sangmyung.kr"],
  ["서강대학교", "sogang.ac.kr"],
  ["서경대학교", "skuniv.ac.kr"],
  ["서울과학기술대학교", "seoultech.ac.kr"],
  ["서울교육대학교", "snue.ac.kr"],
  ["서울대학교", "snu.ac.kr"],
  ["서울시립대학교", "uos.ac.kr"],
  ["서울여자대학교", "swu.ac.kr"],
  ["성균관대학교", "skku.edu"],
  ["성신여자대학교", "sungshin.ac.kr"],
  ["세종대학교", "sju.ac.kr"],
  ["숙명여자대학교", "sookmyung.ac.kr"],
  ["숭실대학교", "soongsil.ac.kr"],
  ["아주대학교", "ajou.ac.kr"],
  ["연세대학교", "yonsei.ac.kr"],
  ["영남대학교", "ynu.ac.kr"],
  ["이화여자대학교", "ewhain.net"],
  ["인천대학교", "inu.ac.kr"],
  ["인하공업전문대학", "itc.ac.kr"],
  ["인하대학교", "inha.edu"],
  ["전남대학교", "jnu.ac.kr"],
  ["전북대학교", "jbnu.ac.kr"],
  ["중앙대학교", "cau.ac.kr"],
  ["추계예술대학교", "chugye.ac.kr"],
  ["충남대학교", "cnu.ac.kr"],
  ["충북대학교", "chungbuk.ac.kr"],
  ["한국방송통신대학교", "knou.ac.kr"],
  ["한국산업기술대학교", "kpu.ac.kr"],
  ["한국예술종합학교", "karts.ac.kr"],
  ["한국외국어대학교", "hufs.ac.kr"],
  ["한국체육대학교", "knsu.ac.kr"],
  ["한국항공대학교", "kau.kr"],
  ["한양대학교", "hanyang.ac.kr"],
  ["한양대학교(ERICA)", "hanyang.ac.kr"],
  ["홍익대학교", "hongik.ac.kr"],
  ["DGIST", "dgist.ac.kr"],
  ["GIST", "gist.ac.kr"],
  ["KAIST", "kaist.ac.kr"],
  ["POSTECH", "postech.ac.kr"],
  ["UNIST", "unist.ac.kr"],
];

export const UnivSelectForm = ({
  onSubmit,
  onSkip,
}: {
  onSubmit: (univ: string) => void;
  onSkip: () => void;
}) => {
  const [univInput, setUnivInput] = useState("");

  const filteredUnivList = univInput
    ? univList.filter(([univ]) => univ.includes(univInput)).map((x) => x[0])
    : null;

  return (
    <form className="flex flex-1 flex-col" onSubmit={() => onSubmit(univInput)}>
      <div className="flex flex-1 flex-col font-medium">
        <div className="mt-4 mb-6">
          <p className="text-xl font-bold">소속 대학교를 알려주세요.</p>
        </div>
        <div className="flex flex-col space-y-5">
          <div>
            <p className="flex items-center space-x-4">
              <input
                value={univInput}
                onChange={(e) => setUnivInput(e.currentTarget.value)}
                placeholder="학교 이름을 검색하세요."
                className="flex-1 rounded-full bg-gray-100 px-4 py-3 placeholder:text-gray-600"
              />
            </p>
          </div>
          {filteredUnivList && (
            <div className="flex flex-col space-y-3 overflow-auto rounded-2xl bg-gray-100 px-4 py-3 font-medium">
              {filteredUnivList.length === 0 ? (
                <p className="text-center text-gray-800">
                  자동 완성 목록에 없는 대학의 경우,
                  <br />
                  확인 버튼을 눌러 다음으로 넘어가주세요.
                </p>
              ) : (
                filteredUnivList.map((univ) => (
                  <button
                    className="text-left"
                    type="button"
                    key={univ}
                    onClick={() => setUnivInput(univ)}
                  >
                    {univ}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <Button onClick={() => onSkip()} size="large" className="w-full">
          대학생이 아니에요
        </Button>
        <Button
          disabled={!univInput}
          type="submit"
          intent="primary"
          size="large"
          className="w-full"
        >
          확인
        </Button>
      </div>
    </form>
  );
};

export const FourthStep = () => {
  const globalForm = useFormContext();
  const [_, setStep] = useStepContext();

  return (
    <UnivSelectForm
      onSubmit={(univInput) => {
        globalForm.setValue("univName", univInput);
        setStep((step) => step + 1);
      }}
      onSkip={() => setStep(5)}
    />
  );
};
