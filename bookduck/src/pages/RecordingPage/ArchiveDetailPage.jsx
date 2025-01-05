import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../api/example";
import AuthorComponent from "../../components/RecordingPage/AuthorComponent";
import CloseButton from "../../components/RecordingPage/CloseButton";
import Header2 from "../../components/RecordingPage/Header2";
import ReviewDetailComponent from "../../components/RecordingPage/ReviewDetailComponent";
import { useEffect, useRef, useState } from "react";
import ExtractDetailComponent from "../../components/RecordingPage/ExtractDetailComponent";
import DeleteModal from "../../components/common/modal/DeleteModal";
import BottomSheetModal2 from "../../components/BookInfoPage/BottomSheetModal2";
import { delExtractReview } from "../../api/archive";

const ArchiveDetail = () => {
  const {
    data: font,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fontSettings"],
    queryFn: async () => {
      const response = await get(`/settings`);
      return response.recordFont;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const pathname = window.location.pathname;
  const [isHeightExceeded, setIsHeightExceeded] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [excerptId, setExcerptId] = useState();
  const [reviewId, setReviewId] = useState();
  const [deleteMode, setDeleteMode] = useState(false);
  const [excerptClick, setExcerptClick] = useState(false);
  const [reviewClick, setReviewClick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setExcerptId(archiveDetailData.excerpt?.excerptId);
    setReviewId(archiveDetailData.review?.reviewId);
  }, []);
  const archiveDetailData = location.state?.detailData || {};
  console.log(archiveDetailData);
  const ref = useRef(null); // 두 컴포넌트의 높이를 측정할 ref

  const handleMenu = () => {
    setVisibleMenu(true);
  };

  const handleCancel = () => {
    setVisible(false); // 닫는 애니메이션 시작
    setTimeout(() => {
      setVisibleMenu(false); // 애니메이션이 끝난 후 모달 완전히 닫기
    }, 300);
  };

  //메뉴 바텀시트에서 삭제 버튼 누르면 실행
  const handleDelete = () => {
    handleCancel();
    if (pathname.split("/")[1] === "total-archive-detail") {
      setDeleteMode(true);
    } else {
      setShowDeleteModal(true);
    }
  };

  const handleSelectedDelete = () => {
    setShowDeleteModal(true);
  };

  //삭제 모달창에서 취소 버튼 누르면 실행
  const handleDeleteModal = () => {
    setShowDeleteModal(false);
  };
  useEffect(() => {
    const totalHeight = ref.current ? ref.current.clientHeight : 0; // 현재 높이 측정
    setIsHeightExceeded(totalHeight > 621);
  }, [pathname]); // pathname이 변경될 때마다 높이를 재계산

  const handleDeleteArchive = async () => {
    const archiveId = id;
    if (excerptClick && reviewClick) {
      const res = await delExtractReview({ archiveId, excerptId, reviewId });
      console.log("전체 삭제", res);
      navigate("/archive");
    } else if (excerptClick) {
      const res = await delExtractReview({ archiveId, excerptId });
      console.log("빨췌 삭제", res);
      navigate("/archive");
    } else if (reviewClick) {
      const res = await delExtractReview({ archiveId, reviewId });
      console.log("리뷰 삭제", res);
      navigate("/archive");
    } else {
      const res = await delExtractReview({ archiveId, excerptId, reviewId });
      console.log("삭제", res);
      navigate("/archive");
    }
  };

  const handleEdit = () => {
    navigate(`/recording/edit/${id}`, { state: {} });
  };

  const handleExcerptClick = () => {
    setExcerptClick(!excerptClick);
  };

  const handleReviewClick = () => {
    setReviewClick(!reviewClick);
  };

  return (
    <div className="">
      {deleteMode && (
        <>
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 pointer-events-none"></div>
        </>
      )}
      <div className=" mx-4">
        <div className="flex flex-col gap-[0.31rem]">
          <Header2 handleMenu={handleMenu} />
          <div ref={ref} className="flex flex-col gap-4">
            {pathname.split("/")[1] === "excerpt-archive-detail" && (
              <ExtractDetailComponent archiveDetailData={archiveDetailData} />
            )}
            {pathname.split("/")[1] === "review-archive-detail" && (
              <ReviewDetailComponent
                archiveDetailData={archiveDetailData}
                font={font}
              />
            )}
            {pathname.split("/")[1] === "total-archive-detail" && (
              <>
                <div
                  onClick={handleExcerptClick}
                  className={`${excerptClick ? "z-10" : ""}`}
                >
                  <ExtractDetailComponent
                    archiveDetailData={archiveDetailData}
                    font={font}
                  />
                </div>
                <div
                  onClick={handleReviewClick}
                  className={`${reviewClick ? "z-10" : ""}`}
                >
                  <ReviewDetailComponent
                    archiveDetailData={archiveDetailData}
                    font={font}
                  />
                </div>
              </>
            )}

            <AuthorComponent
              archiveDetailData={archiveDetailData}
              font={font}
            />
          </div>
          <div
            className={`mt-8 ${
              isHeightExceeded
                ? "mb-[1.38rem]"
                : "absolute bottom-[1.38rem] left-1/2 -translate-x-1/2"
            }`}
          >
            <CloseButton />
          </div>
        </div>
      </div>
      {visibleMenu && (
        <BottomSheetModal2
          bottomSheetShow={visibleMenu}
          setBottomSheetShow={setVisibleMenu}
          visible={visible}
          setVisible={setVisible}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          title={
            excerptClick && !reviewClick
              ? "발췌카드를 삭제하시겠어요?"
              : !excerptClick && reviewClick
              ? "감상카드를 삭제하시겠어요?"
              : excerptClick && reviewClick
              ? "모두 삭제하시겠어요?"
              : "정말 삭제하시겠어요?"
          }
          content="삭제된 카드는 다시 복구할 수 없어요."
          leftBtnText="삭제"
          rightBtnText="취소"
          onLeftClick={handleDeleteArchive}
          onRightClick={handleDeleteModal}
        />
      )}
      {deleteMode && (
        <div className="fixed z-20 bottom-[10px] left-[16.5px] ">
          <div className="flex gap-3 ">
            <button
              onClick={() => {
                setDeleteMode(false);
                setExcerptClick(false);
                setReviewClick(false);
              }}
              className="w-[8.4375rem] h-[3rem] rounded-[0.5rem] bg-gray-400 text-white font-semibold text-btn2 pointer-events-auto"
            >
              취소
            </button>
            <button
              onClick={handleSelectedDelete}
              className="w-[13.375rem] h-[3rem] rounded-[0.5rem] bg-orange-300 text-white font-semibold text-btn2 pointer-events-auto "
            >
              삭제하기(
              {excerptClick && reviewClick
                ? "2"
                : excerptClick || reviewClick
                ? "1"
                : "0"}
              )
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ArchiveDetail;
