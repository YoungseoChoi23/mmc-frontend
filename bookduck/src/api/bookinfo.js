import { apiAuth } from "./api";
import { get, post, patch, put, del } from "./example";

// 기본 책정보 조회(bookinfoId)
export const getBookInfo = async ({ bookinfoId }) => {
  try {
    const res = await get(`/bookinfo/${bookinfoId}`);
    console.log("책정보 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("책정보 조회 실패: ", error);
    throw error;
  }
};

// 서재에 없는 책정보 조회(providerId)
export const getBookExternalInfo = async ({ providerId }) => {
  try {
    const res = await get(`/bookinfo/external/${providerId}`);
    console.log("책정보 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("책정보 조회 실패: ", error);
    throw error;
  }
};

// custom 책정보 조회(bookinfoId)
export const getCustomBookInfo = async ({ bookinfoId }) => {
  try {
    const res = await get(`/bookinfo/custom/${bookinfoId}`);
    console.log("책정보 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("책정보 조회 실패: ", error);
    throw error;
  }
};

// 한줄평,별점 목록 조회
export const getOneLineRatingsInfo = async ({
  bookinfoId,
  orderBy,
  page,
  size,
}) => {
  try {
    // Query Parameter 생성 (값이 존재하는 경우에만 추가)
    const queryParams = new URLSearchParams();
    if (orderBy) queryParams.append("orderBy", orderBy);
    if (page) queryParams.append("page", page);
    if (size) queryParams.append("size", size);

    // 최종 URL
    const url = `/bookinfo/${bookinfoId}/onelineratings${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;

    const res = await get(url);
    console.log("한줄평 목록 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("한줄평 목록 조회 실패: ", error);
    throw error;
  }
};
// 별점 등록 및 수정
export const enrollRating = async (userbookId, rating) => {
  const url = `books/${userbookId}/rating`;
  const data = { rating };
  try {
    const res = await patch(url, data);
    console.log("별점 등록 성공: ", res);
    return res?.data;
  } catch (error) {
    console.error("별점 등록 실패:", error);
    throw error;
  }
};

//별점 삭제
export const deleteRating = async (userbookId) => {
  const url = `books/${userbookId}/rating`;
  try {
    const res = await del(url);
    console.log("별점 삭제 성공: ", res);
  } catch (error) {
    console.error("별점 삭제 실패: ", error);
    throw error;
  }
};

//한줄평 생성
export const enrollOneLine = async (userBookId, oneLineContent) => {
  const url = `onelines`;
  const data = { oneLineContent, userBookId };
  try {
    const res = await post(url, data);
    console.log("한줄평 등록 성공: ", res);
    return res?.data;
  } catch (error) {
    console.error("한줄평 등록 실패:", error);
    throw error;
  }
};
// 한줄평 수정
export const editOneLine = async (onelineId, oneLineContent) => {
  const url = `onelines/${onelineId}`;
  const data = { oneLineContent };
  try {
    const res = await put(url, data);
    console.log("한줄평 수정 성공: ", res);
    return res?.data;
  } catch (error) {
    console.error("한줄평 수정 실패:", error);
    throw error;
  }
};
//한줄평 삭제
export const deleteOneLine = async (onelineId) => {
  const url = `onelines/${onelineId}`;
  try {
    const res = await del(url);
    console.log("한줄평 삭제 성공: ", res);
  } catch (error) {
    console.error("한줄평 삭제 실패: ", error);
    throw error;
  }
};

//한줄평 좋아요 등록
export const enrollLike = async (onelineId) => {
  const url = `onelines/${onelineId}/like`;
  try {
    const res = await post(url);
    console.log("한줄평 좋아요 성공: ", res);
    return res;
  } catch (error) {
    console.error("한줄평 좋아요 실패:", error);
    throw error;
  }
};

//한줄평 좋아요 삭제
export const deleteLike = async (onelineId) => {
  const url = `onelines/${onelineId}/like`;
  try {
    const res = await del(url);
    console.log("한줄평 좋아요 삭제 성공: ", res);
  } catch (error) {
    console.error("한줄평 좋아요 삭제 실패: ", error);
    throw error;
  }
};

//나의 기록 조회
export const getMyArchive = async ({ bookinfoId }) => {
  try {
    const res = await get(`/bookinfo/${bookinfoId}/archives/users/me`);
    console.log("나의 기록 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("나의 기록 조회 실패: ", error);
    throw error;
  }
};

//연관 추천도서 조회
export const getRelatedBookInfo = async ({ bookinfoId }) => {
  try {
    const res = await get(`/bookinfo/${bookinfoId}/explore`);
    console.log("추천도서 조회 성공: ", res);
    return res;
  } catch (error) {
    console.error("추천도서 조회 실패: ", error);
    throw error;
  }
};
