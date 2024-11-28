import { post } from "./example";
import { postAccessTokenIssue } from "./oauth";
export const postFcmToken = async (userId, fcmToken) => {
  try {
    // POST 요청으로 FCM 토큰 전송
    const response = await post(`/fcm/${userId}/token`, {
      fcmToken: fcmToken,
    });
    console.log("FCM 토큰 전송 성공:", response);
    return response;
  } catch (error) {
    console.error("FCM 토큰 전송 실패:", error);
  }
};