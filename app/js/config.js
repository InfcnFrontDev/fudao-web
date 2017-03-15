var apiPath="http://192.168.3.126:18080/fudao-svc/";
var urls={
    //生命周期
    LIFE_CYCLE: apiPath + 'app/myCycleAction!calculateCycleAndSave.action',
    //获取用户信息
    USER_DETAIL: apiPath + 'app/accountInfoAction!getUserInformationByUserId.action',







    //资讯列表(ok)
    ARTICLE_LIST: apiPath + 'app/myTerritoryAction!list.action',
    //资讯详细(ok)
    ARTICLE_DETAIL: apiPath + 'app/myTerritoryAction!detail.action',
    //我的收藏列表(ok)
    MY_COLLECTION_LIST: apiPath + 'app/collectionAction!getMyCollection.action',



    //修改用户信息
    USER_UPDATE: apiPath + 'app/userInformationAction!updateValue.action',
    //搜索用户
    USER_SEARCH: apiPath + 'app/friendDynamicAction!getUserByPhone.action',

    // 好友 ----------------------------------------------------------------------

    //申请加为好友
    FRIEND_APPLY: apiPath + 'app/friendDynamicAction!addFriend.action',
    //同意加为好友
    FRIEND_AGREE: apiPath + 'app/friendDynamicAction!editFriend.action',
    //好友申请列表
    FRIEND_APPLY_LIST: apiPath + 'app/friendDynamicAction!getWaitBeFriends.action',
    //删除好友
    FRIEND_DELETE: apiPath + 'app/friendDynamicAction!deleteFriend.action',
    //我的好友列表
    MY_FRIENDS_LIST: apiPath + 'app/friendDynamicAction!getFriends.action',
}