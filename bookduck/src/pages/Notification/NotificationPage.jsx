import React, { useState } from "react";
import Header1 from "../../components/common/Header1";
import StatusBar from "../../components/common/StatusBar";
import TabBarComponent from "../../components/TabBarComponent";
import NotificationItemComponent from "../../components/notification/NotificationItemComponent";
const NotificationPage = () => {
  const [tab, setTab] = useState("일반");
  const [notifications, setNotifications] = useState([
    { id: 1, type: "친구요청", text: "찬희", read: false },
    { id: 2, type: "친구수락", text: "찬희", read: false },
    { id: 3, type: "레벨업", text: "2", read: true },
    { id: 4, type: "기록", text: "찬희", read: true },
    { id: 5, type: "업적", text: "ㅇㅇ", read: true },
  ]);

  return (
    <div>
      <StatusBar />
      <Header1 title="알림" edit={false} />
      <TabBarComponent
        tabs={["일반", "공지"]}
        activeTab={tab}
        onTabClick={setTab}
        size="small"
        isNoti={true}
      />

      {notifications.map((notification) => {
        return (
          <div key={notification.id}>
            <NotificationItemComponent
              type={notification.type}
              text={notification.text}
              read={notification.read}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NotificationPage;