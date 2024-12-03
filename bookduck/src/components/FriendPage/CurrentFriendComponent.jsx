import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FriendListComponent from "../common/FriendListComponent";
import { get, del } from "../../api/example";

const CurrentFriendComponent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 친구 목록 조회
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friendList"],
    queryFn: async () => {
      const response = await get("/friends");
      return response;
    },
  });
  useEffect(() => {
    console.log("친구 목록", data);
  }, [data]);

  // 친구 삭제
  const deleteFriendMutation = useMutation({
    mutationFn: (friendId) => del(`/friends/${friendId}`),
    onSuccess: () => {
      // 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["friendList"] });
    },
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생: {error.message}</p>;

  const friendList = data?.friendList || [];
  const friendCount = data?.friendCount || 0;

  return (
    <div>
      {friendList.map((friend, index) => (
        <FriendListComponent
          userId={friend.userId}
          key={index}
          userName={friend.nickname}
          isOfficial={friend.isOfficial}
          text="삭제"
          handleDelete={() => deleteFriendMutation.mutate(friend.friendId)}
          handleClick={() => navigate(`/user/${friend.userId}`)}
        />
      ))}
    </div>
  );
};

export default CurrentFriendComponent;
