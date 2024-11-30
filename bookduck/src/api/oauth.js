import { api } from "./api";

const BACK_DOMAIN = import.meta.env.VITE_API_BASE_URL;
export const KakaoURI = `${
  import.meta.env.VITE_API_BASE_URL
}/oauth2/authorization/kakao`;
export const GoogleURI = `${
  import.meta.env.VITE_API_BASE_URL
}/oauth2/authorization/google`;

/*토큰 만료 여부*/
export const isTokenExpired = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const expiresAt = token?.expiresAt || null;
  const isExpired = expiresAt && Date.now() > expiresAt;
  return isExpired;
};

/*userId 가져오기*/
export const getUserId = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token?.userId || null;
};

/*엑세스 토큰 재발급*/
export const postAccessTokenIssue = async () => {
  // if (!isTokenExpired()) {
  //   console.log("액세스 토큰이 아직 만료되지 않았습니다.");
  //   return;
  // }
  try {
    /*기존 토큰에서 accessToken, userId 가져오기*/
    const tokenData = JSON.parse(localStorage.getItem("token"));
    const accessToken = tokenData?.accessToken;
    const userId = tokenData?.userId;
    console.log("post할 accessToken", accessToken);

    const response = await api.post(
      `/auth/refresh?accessToken=${accessToken}`,
      null,
      { withCredentials: true }
    );

    console.log(response);

    /*새 토큰*/
    const newToken = {
      accessToken: response.data.accessToken,
      expiresAt: new Date().getTime() + response.data.accessTokenMaxAge * 1000,
      isNewUser: false,
      userId: userId,
    };
    console.log(newToken);

    /*새 토큰 넣기*/
    localStorage.setItem("token", JSON.stringify(newToken));
    console.log("새로운 토큰 저장 완료");
    return response;
  } catch (error) {
    console.error("토큰 재발행 오류: ", error);
  }
};
