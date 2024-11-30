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

// 유저 레벨 정보 조회
export const getUserLevelInfo = async (userId) => {
  try {
    const res = await get(`/users/${userId}/growth`);
    console.log("유저 레벨 정보 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("유저 레벨 정보 조회 실패: ", error);
    throw error;
  }
};

// 내 뱃지 목록 조회
export const getBadgeLists = async () => {
  try {
    const res = await get(`/badges`);
    console.log("배지 리스트 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("배지 리스트 조회 실패: ", error);
    throw error;
  }
};

// 유저가 착용한 아이템 조회
export const getUserItem = async (userId) => {
  try {
    const res = await get(`/users/${userId}/character`);
    console.log("유저 아이템 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("유저 아이템 조회 실패: ", error);
    throw error;
  }
};

// 캐릭터 꾸미기 아이템 조회
export const getItemLists = async () => {
  try {
    const res = await get(`/items`);
    console.log("아이템 리스트 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("아이템 리스트 조회 실패: ", error);
    throw error;
  }
};

// 캐릭터 아이템 장착상태 변경
export const patchUserItem = async (equippedUserItemIdList) => {
  try {
    const res = await patch("items", {
      equippedUserItemIdList,
    });
    console.log("캐릭터 아이템 장착상태 변경 성공: ", res);
    return res;
  } catch (error) {
    console.error("캐릭터 아이템 장착상태 변경 실패: ", error);
    throw error;
  }
};
