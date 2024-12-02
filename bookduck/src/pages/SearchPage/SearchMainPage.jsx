import React, { useState } from "react";
import { get } from "../../api/example";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../../components/common/SearchComponent";
import BookComponent from "../../components/SearchPage/BookComponent";
import ButtonComponent from "../../components/common/ButtonComponent";
import CarouselComponent from "../../components/SearchPage/CarouselComponent";
import SearchBookComponent from "../../components/SearchPage/SearchBookComponent";
import SearchArchiveComponent from "../../components/SearchPage/SearchArchiveComponent";
import SearchUserComponent from "../../components/SearchPage/SearchUserComponent";
import TabBarComponent from "../../components/common/TabBarComponent";

const SearchMainPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [tab, setTab] = useState("책");
  //API 연결
  //최근 책 받기
  const getRecentBooks = async () => {
    return await get(`/books/recent`);
  };

  //많이 읽는 책 받기
  const getPopularBooks = async () => {
    return await get(`/bookinfo/most`);
  };

  //이벤트 핸들러
  const handleSearch = () => {
    setSubmittedSearch(search);
  };

  const recentBooksQuery = useQuery({
    queryKey: ["recentBooks"],
    queryFn: getRecentBooks,
    onSuccess: () => {
      console.log("최근 책 받기 성공");
    },
    onError: (error) => console.error("최근 책 받기 실패", error),
  });
  const recentBooks = recentBooksQuery.data.bookList;

  const popularBooksQuery = useQuery({
    queryKey: ["popularBooks"],
    queryFn: getPopularBooks,
    onSuccess: () => {
      console.log("많이 읽는 책 받기 성공");
    },
    onError: (error) => console.error("많이 읽는 책 받기 실패", error),
  });
  const popularBooks = popularBooksQuery.data.bookList;

  return (
    <div>
      <SearchComponent
        search={search}
        setSearch={setSearch}
        onEnter={handleSearch}
      />
      {!search ? (
        <>
          <div className="flex flex-col px-4 gap-3 mt-4">
            <div>최근 기록한 책</div>
            <div className="flex flex-row gap-3">
              {recentBooks.length > 0 ? (
                recentBooks.map((book, index) => {
                  return (
                    <BookComponent
                      key={index}
                      img={book.imgPath}
                      title={book.title}
                    />
                  );
                })
              ) : (
                <div className="flex w-full h-[11.5rem] justify-center items-center">
                  <p className="text-gray-400 text-b2">
                    아직 기록한 책이 없어요.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between px-7 py-4 bg-gray-10 my-5">
            <div className="flex flex-col gap-1 justify-center">
              <span className="text-btn3 text-gray-400">
                원하는 책을 찾을 수 없나요?
              </span>
              <span className="text-btn3 text-gray-800">
                직접 책을 등록해보세요
              </span>
            </div>
            <ButtonComponent
              text="책 등록하기"
              type="secondary"
              color="orange"
              size="medium"
              onClick={() => navigate("/search/register")}
            />
          </div>
          <div className="flex flex-col px-4 gap-3">
            <div>요즘 많이 읽는 책 Top 10</div>
            <CarouselComponent popularBooks={popularBooks} />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <TabBarComponent
            tabs={["책", "기록", "사용자"]}
            activeTab={tab}
            onTabClick={setTab}
            size="small"
            borderWidth="3rem"
          />
          {tab === "책" && (
            <SearchBookComponent
              search={submittedSearch}
              setSearch={setSearch}
            />
          )}
          {tab === "기록" && (
            <SearchArchiveComponent
              search={submittedSearch}
              setSearch={setSearch}
            />
          )}
          {tab === "사용자" && (
            <SearchUserComponent
              search={submittedSearch}
              setSearch={setSearch}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMainPage;
