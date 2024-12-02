import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuspenseLoading from "../../components/common/SuspenseLoading";
const OAuthRedirectPage = () => {
  const navigate = useNavigate();

  const readAccessTokenKakao = () => {
    try {
      // URL에서 토큰 정보 가져오기
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");
      const expiresIn = urlParams.get("expiresIn");
      const isNewUser = urlParams.get("isNewUser") === "true";
      const userId = urlParams.get("userId");

      if (!accessToken || !expiresIn || !userId) {
        throw new Error("필수 정보 누락: accessToken, expiresIn 또는 userId");
      }

      // 토큰 정보 저장
      console.log("Access Token 존재");
      const token = {
        accessToken,
        expiresAt: Date.now() + parseInt(expiresIn, 10) * 1000,
        isNewUser,
        userId: Number(userId),
      };
      localStorage.setItem("token", JSON.stringify(token));
      console.log("저장된 토큰:", localStorage.getItem("token"));

      // 새 사용자 여부에 따라 리다이렉트
      navigate(isNewUser ? "/signin" : "/home", { replace: true });
    } catch (error) {
      console.error("OAuth 처리 중 오류:", error.message);
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    readAccessTokenKakao(); // 바로 실행
    location.reload();
  }, []);

  return <SuspenseLoading />;
};

export default OAuthRedirectPage;
