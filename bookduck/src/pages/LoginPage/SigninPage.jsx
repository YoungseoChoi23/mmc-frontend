import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/common/ButtonComponent";
import BottomBackgroundComponent from "../../components/common/BottomBackgroundComponent";
import TextField from "../../components/common/TextField";
import { post, get, patch } from "../../api/example";

const SigninPage = () => {
  //상태 관리
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(null);

  //API 연결
  //API-닉네임받기
  const getNickname = async () => {
    try {
      const response = await get(`/settings/nickname`);
      setNickname(response.nickname);
    } catch (error) {
      console.error(error);
    }
  };

  //API-닉네임체크
  const postNicknameCheck = async (nickname) => {
    try {
      const response = await post(`/settings/nickname/check`, {
        nickname: nickname,
      });
      // console.log("응답", response.isAvailable);
      setError(!response.isAvailable);
    } catch (error) {
      console.error("닉네임 오류", error);
    }
  };

  //API-닉네임변경
  const patchNickname = async (nickname) => {
    try {
      const updatedNickname = { nickname: nickname };
      await patch(`/settings/nickname`, updatedNickname);
      // console.log("닉네임 업데이트 성공:", response);
    } catch (error) {
      console.error("닉네임 변경 오류", error);
    }
  };

  //useEffect hook
  useEffect(() => {
    getNickname();
  }, []);

  // error 상태 변경 시 로그 출력
  useEffect(() => {
    if (error !== null) {
      console.log("현재 error 상태:", error);
    }
  }, [error]);

  //이벤트 핸들러
  //입력값 변경
  const handleValue = (e) => {
    const newValue = e.target.value;
    setNickname(newValue);
    setInputError(
      newValue.length > 8 || /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/.test(newValue)
    );
    setIsSubmitted(false);
  };

  //확인버튼 클릭 시
  const handleEdit = () => {
    setIsSubmitted(true);
    setError(null);
    postNicknameCheck(nickname);
  };

  //완료 버튼 클릭 시
  const handleComplete = (nickname) => {
    try {
      patchNickname(nickname);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const Btn = (
    <ButtonComponent
      text="완료"
      type="primary"
      disabled={!isSubmitted || error}
      onClick={() => handleComplete(nickname)}
    />
  );
  return (
    <div className="w-[24.5625rem]">
      <div className="px-4">
        <div className="text-t2 font-semibold mt-6">
          BookDuck과 독서를 시작하기 전에,
          <br /> 이름을 설정해주세요.
        </div>
        <div className="text-b2  mt-7 mb-[2.75rem] text-gray-500">
          이름 짓기가 어렵다면 바로 확인을 눌러 랜덤이름으로 시작하세요.
          <br />
          이름은 언제든 변경할 수 있어요.
        </div>
        <TextField
          type="제목"
          title="닉네임"
          placeholder="닉네임을 입력해주세요"
          check={true}
          error={error}
          inputError={inputError}
          handleEdit={handleEdit}
          isSubmitted={isSubmitted}
          defaultType={false}
          handleValue={handleValue}
          inputValue={nickname}
        />
      </div>
      <BottomBackgroundComponent Button={Btn} />
    </div>
  );
};

export default SigninPage;
