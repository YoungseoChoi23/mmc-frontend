import { apiAuth } from "./api";
import { get, patch, post, del } from "./example";

export const getTotalBook = async (sort) => {
  try {
    const res = await get(`/books/list?sort=${sort}`);
    console.log("내 서재 전체 조회 성공", res);
    return res;
  } catch (error) {
    console.error("내 서재 전체 조회 실패");
    return {};
  }
};

export const getSortedTotalBook = async (statusList, sort) => {
  console.log(statusList, sort);
  try {
    const statusParams = statusList
      .map((status) => `status=${status}`)
      .join("&");
    console.log(statusParams);
    const res = await get(`/books/filter?${statusParams}&sort=${sort}`);
    console.log("내 서재 분류 전체 조회 성공", res);
    return res;
  } catch (error) {
    console.error("내 서재 분류 전체 조회 실패");
    return {};
  }
};

export const patchBookStatus = async (userbookId, status) => {
  console.log(userbookId, status);
  try {
    const res = await patch(`/books/${userbookId}?status=${status}`);
    console.log("책 상태 변경 성공", res);
    return res;
  } catch (error) {
    console.error("책 상태 변경 실패");
    return {};
  }
};

export const deleteBook = async (userbookId) => {
  try {
    const res = await del(`/books/${userbookId}`);
    console.log("책 삭제 성공", res);
    return res;
  } catch (error) {
    console.error("책 삭제 실패");
    return {};
  }
};

/*책장 추가*/
export const postAddFolder = async (data) => {
  try {
    const res = await post(`/folders`, data);
    console.log("책장 추가 성공", res);
    return res;
  } catch (error) {
    console.error("책장 추가 실패");
    return {};
  }
};

/*책장 삭제*/
export const deleteFolder = async (folderId) => {
  try {
    const res = await del(`/folders/${folderId}`);
    console.log("책장 삭제 성공", res);
    return res;
  } catch (error) {
    console.error("책장 삭제 실패");
    return {};
  }
};

/*전체 책장 목록 조회*/
export const getTotalFolder = async () => {
  try {
    const res = await get(`/folders/list`);
    console.log("책장 조회 성공", res);
    return res;
  } catch (error) {
    console.error("책장 조회 실패");
    return {};
  }
};

/*책장 별 책 조회*/
export const getBookFromFolder = async (folderId) => {
  try {
    const res = await get(`/folders/${folderId}/books`);
    console.log("책장별 책 조회 성공", res);
    return res;
  } catch (error) {
    console.error("책장별 책 조회 실패");
    return {};
  }
};

/*책장에 책 추가*/
export const postAddFolderBook = async (folderId, userbookId) => {
  try {
    const res = await post(`/folders/${folderId}/books`, userbookId);
    console.log("책장에 책 추가 성공", res);
    return res;
  } catch (error) {
    console.error("책장에 책 추가 실패");
    return {};
  }
};

/*책장에 책 삭제*/
export const deleteAddFolderBook = async (folderId, userbookId) => {
  console.log(userbookId);
  try {
    const res = await del(`/folders/${folderId}/books`, { data: userbookId });
    console.log("책장에 책 삭제 성공", res);
    return res;
  } catch (error) {
    console.error("책장에 책 삭제 실패");
    return {};
  }
};

/*책장명 변경*/
export const patchFolderName = async (folderId, data) => {
  try {
    const res = await patch(`/folders/${folderId}`, data);
    console.log("책장명 변경 성공", res);
    return res;
  } catch (error) {
    console.error("책장명 변경 실패");
    return {};
  }
};
