/* eslint-disable react/prop-types */
import alarmduck from "../../assets/common/duck-alarm.svg";
import alarmheart from "../../assets/common/heart-alarm.svg";
import alarmhand from "../../assets/common/waving-hand-alarm.svg";
import alarmbadge from "../../assets/common/badge-alarm.svg";
import alarmCircle from "../../assets/common/circle-alarm.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { patchAlarm } from "./GeneralNotiComponent";

const formatNotiTime = (rawTime) => {
  const now = new Date();
  const past = new Date(rawTime);

  const diff = Math.floor((now - past) / 1000); // 총 시간 차이를 초 단위로 계산
  const weeks = Math.floor(diff / (3600 * 24 * 7)); // 주 단위로 계산
  const days = Math.floor(diff / (3600 * 24)); // 일 단위로 계산
  const hours = Math.floor((diff % (3600 * 24)) / 3600); // 시간 단위로 계산
  const minutes = Math.floor((diff % 3600) / 60); // 분 단위로 계산

  if (weeks > 0) {
    return `${weeks}주`;
  } else if (days > 0) {
    return `${days}일`;
  } else if (hours > 0) {
    return `${hours}시간`;
  } else if (minutes > 0) {
    return `${minutes}분`;
  } else {
    return `방금 전`;
  }
};

const NotificationItemComponent = ({
  onMarkAsRead,
  alarmType,
  boldText,
  isRead,
  createdTime,
  resourceId,
  alarmId,
}) => {
  const notificationTemplates = {
    FRIEND_REQUEST: {
      icon: alarmhand,
      message: (text) => (
        <span>
          <strong style={{ fontWeight: "bold" }}>{text}님</strong>으로부터 친구
          요청이 도착했어요.
        </span>
      ),
      navigateTo: () => ({ pathname: `/friend`, state: { activeTab: "요청" } }),
    },
    FRIEND_APPROVED: {
      icon: alarmhand,
      message: (text) => (
        <span>
          <strong style={{ fontWeight: "bold" }}>{text}님</strong>이 친구요청을
          수락했어요.
        </span>
      ),
      navigateTo: (resourceId) => `/user/${resourceId}`,
    },
    LEVEL_UP: {
      icon: alarmduck,
      message: (text) => (
        <span>
          야호! 오리가 <strong style={{ fontWeight: "bold" }}>Lv.{text}</strong>
          로 성장했어요.
        </span>
      ),
      navigateTo: () => `/character`,
    },
    ONELINELIKE_ADDED: {
      icon: alarmheart,
      message: (text) => (
        <span>
          <strong style={{ fontWeight: "bold" }}>{text}</strong>의 한줄평에
          좋아요가 눌렸어요.
        </span>
      ),
      navigateTo: () => `/info/book/${resourceId}`,
    },
    BADGE_UNLOCKED: {
      icon: alarmbadge,
      message: (text) => (
        <span>
          축하합니다!🎉 새로운{" "}
          <strong style={{ fontWeight: "bold" }}>{text}</strong>배지를
          획득했어요.
        </span>
      ),
      navigateTo: () => `/myBadge`,
    },
    ITEM_UNLOCKED: {
      icon: alarmduck,
      message: () => <span>새로운 아이템을 획득했어요. 얼른 착용해봐요!</span>,
      navigateTo: () => `/character`,
    },
  };

  const navigate = useNavigate();
  const notificationData = notificationTemplates[alarmType];
  useEffect(() => {
    console.log("resourceId", resourceId);
  }, [resourceId]);

  const handleNavigation = () => {
    if (notificationData?.navigateTo) {
      const navigationData = notificationData.navigateTo(resourceId);
      if (typeof navigationData === "string") {
        navigate(navigationData);
      } else {
        navigate(navigationData.pathname, { state: navigationData.state });
      }
    }
  };

  const handleClick = (alarmId) => {
    onMarkAsRead(alarmId);
    handleNavigation();
  };
  return (
    <div
      className="flex gap-4 items-center w-[24.5625rem] px-4 py-3"
      onClick={() => handleClick(alarmId)}
    >
      <div className="min-w-12 min-h-12 w-12 h-12  rounded-full bg-gray-50 flex items-center justify-center relative ">
        <img src={notificationData?.icon} alt={alarmType} />
        {!isRead && (
          <img
            src={alarmCircle}
            className="absolute right-[0.03rem] top-[0.38rem]"
          />
        )}
      </div>
      <div>
        <span className="text-black text-b2">
          {notificationData?.message(boldText)}
        </span>
        <span className="ml-1 text-gray-500 text-c1">
          {formatNotiTime(createdTime)}
        </span>
      </div>
    </div>
  );
};

export default NotificationItemComponent;
