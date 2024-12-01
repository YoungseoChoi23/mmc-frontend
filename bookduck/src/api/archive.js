import { apiAuth } from "./api";
import { del, get, post } from "./example";

export const postExtractReview = async (data) => {
  try {
    const res = await post("/archives", data);
    console.log("발췌 및 감상평 업로드 성공", res);
    return res;
  } catch (error) {
    console.error("발췌 및 감상평 업로드 실패", error);
  }
};

export const getExtractReview = async (userId, archiveType, page, size) => {
  try {
    const res = await get(
      `/users/${userId}/archives?type=${archiveType}&page=${page}&size=${size}`
    );
    console.log("발췌 및 감상평 조회 성공", res);
    return res;
  } catch (error) {
    console.error("발췌 및 감상평 조회 실패", error);
  }
};

export const getDetailExtractReview = async (id, archiveType) => {
  try {
    const res = await get(`/archives/${id}?type=${archiveType}`);
    console.log("발췌 및 감상평 상세 조회 성공", res);
    return res;
  } catch (error) {
    console.error("발췌 및 감상평 상세 조회 실패", error);
  }
};

export const delExtractReview = async (archiveId, excerptId, reviewId) => {
  try {
    // URL 조합: 필요한 파라미터만 포함
    let url = `/archives/${archiveId}`;
    const params = [];

    if (excerptId) params.push(`excerptId=${excerptId}`);
    if (reviewId) params.push(`reviewId=${reviewId}`);

    // 파라미터가 있으면 URL에 추가
    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const res = await del(url);
    console.log("발췌 및 감상평 삭제 성공", res);
    return res;
  } catch (error) {
    console.error("발췌 및 감상평 삭제 실패", error);
  }
};
export const postExtractImage = async (formData) => {
  try {
    const res = await apiAuth.post(`/archives/excerpts/ocr`, formData, {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });
    console.log("발췌 이미지 추출 성공", res);
    return res;
  } catch (error) {
    console.error("발췌 이미지 추출 실패", error);
  }
};

export const deleteExtractReview = async (archivdId, excerptId, reviewId) => {
  try {
    const res = await del(
      `/archives/${archivdId}?&excerptId=${excerptId}?reviewId=${reviewId}`
    );
    console.log("발췌 및 감상평 삭제 성공", res);
    return res;
  } catch (error) {
    console.error("발췌 및 감상평 삭제 실패", error);
  }
};
