import { apiAuth } from "./api";
import { get, post, patch, put, del } from "./example";

// 유저 정보 조회 - 닉네임, 기록 수
export const getUserInfo = async (userId) => {
  try {
    const res = await get(`/users/${userId}`);
    console.log("유저 정보 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("유저 정보 조회 실패: ", error);
    throw error;
  }
};

// 유저 독서 리포트 조회 - 통계
export const getUserStatisticsInfo = async (userId) => {
  try {
    const res = await get(`/users/${userId}/statistics`);
    console.log("유저 통계 정보 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("유저 통계 정보 조회 실패: ", error);
    throw error;
  }
};

// 키워드 조회
export const getKeywords = async (userId) => {
  try {
    const res = await get(`/users/${userId}/keywords`);
    console.log("키워드 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("키워드 조회 실패: ", error);
    throw error;
  }
};

// 통계 요약 내보내기 정보 제공
export const getExportSummaryInfo = async () => {
  try {
    const res = await get(`/export/statistics`);
    console.log("통계 요약 정보 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("통계 요약 정보 조회 실패: ", error);
    throw error;
  }
};

// 캐릭터 내보내기 정보 제공
export const getExportCharacterInfo = async () => {
  try {
    const res = await get(`/export/character`);
    console.log("캐릭터 요약 정보 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("캐릭터 요약 정보 조회 실패: ", error);
    throw error;
  }
};
