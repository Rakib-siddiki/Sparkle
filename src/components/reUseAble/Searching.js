export const filteredUser = (userData, searchQuery) =>
  userData.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

export const filteredGroups = (grouplist, searchQuery) =>
  grouplist.filter((group) => {
    group.groupName &&
    group.groupName.toLowerCase().includes(searchQuery.toLowerCase());
  });

export const fillterdFriend = (friendList, searchQuery, userId) =>
  friendList.filter((item) =>
    userId == item.senderId
      ? item.recevierName &&
        item.recevierName.toLowerCase().includes(searchQuery.toLowerCase())
      : item.senderName &&
        item.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

export const filteredFriendRequest = (requestList, searchQuery) =>
  requestList.filter(
    (item) =>
      item.senderName &&
      item.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

export const fillterdMyGroups = (myGroupsList, searchQuery) =>
  myGroupsList.filter(
    (item) =>
      item.groupName &&
      item.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

export const filteredBlockUsers = (blocklist, searchQuery) =>
  blocklist.filter(
    (item) =>
      item.UserName &&
      item.UserName.toLowerCase().includes(searchQuery.toLowerCase())
  );
