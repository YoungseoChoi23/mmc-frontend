import React, { useState, useEffect } from "react";
import FriendListComponent from "../common/FriendListComponent";
import { useNavigate } from "react-router-dom";
import { get, del } from "../../api/example";
const CurrentFriendComponent = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendCount, setFriendCount] = useState(0);
  const navigate = useNavigate();
  //API연결
  //API-친구 목록 조회
  const getFriendList = async () => {
    try {
      const response = await get(`/friends`);
      setFriendList(response.friendList);
      setFriendCount(response.friendCount);
      // console.log(response.friendList);
      // console.log(response.friendCount);
    } catch (error) {
      console.error("친구 정보 읽기 오류", error);
    }
  };
  //API-친구 삭제
  const delFriend = async (friendId) => {
    try {
      await del(`/friends/${friendId}`);
      await getFriendList();
    } catch (error) {
      console.error(error);
    }
  };

  //useEffect hook
  useEffect(() => {
    getFriendList();
  }, []);

  return (
    <div>
      {friendList.map((friend, index) => (
        <FriendListComponent
          userId={friend.userId}
          key={index}
          userName={friend.nickname}
          isOfficial={friend.isOfficial}
          text="삭제"
          handleDelete={() => delFriend(friend.friendId)}
          handleClick={() => navigate(`/user/${friend.userId}`)}
        />
      ))}
    </div>
  );
};

export default CurrentFriendComponent;
