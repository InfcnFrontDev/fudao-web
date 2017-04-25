// var ADDR = "http://103.254.113.11:8080/jkst2/";
/*var ADDR = "http://192.168.3.110:8061/jkst2/";*/
/*var ADDR = "http://192.168.3.111:8080/jkst2/";*/
/*var ADDR = "http://192.168.3.137:8080/jkst-svc/";*/
var ADDR = "http://192.168.10.61:8080/jkst2/";
//--------------------------------------------------------------//
//注册前验证手机
var REGBEFORE = "app/accountInfoAction!registerBefore.action";
//注册
var REG = "app/accountInfoAction!register.action";
//登录
var LOGIN = "app/accountInfoAction!login.action";
//登录
var GETHEALTHRINGDATA = "app/accountInfoAction!getHealthRingData.action";
//密码找回
var PWDRECOVERY = "app/accountInfoAction!retrievePassword.action";
//--------------------------------------------------------------//
//获取验证码
//var GETCODE = "app/phoneVerificationAction!getCode.action";
//验证手机号是否被注册
var CHECKPHONE = 'app/phoneVerificationAction!checkPhone.action';
//验证验证码
//var TESTCODE = "app/phoneVerificationAction!testCode.action";
//--------------------------------------------------------------//
//疾病列表	三类人群
var TREATMENTDATA = "app/threeDiseasesListAction!findDiseasesList.action";
//疾病	日常疗法
var FINDDAILYTHERAPY = "app/threeDiseasesListAction!findDailyTherapy.action";
//疾病	专业疗法
var FINDPROFESSIONTREATMENT = "app/threeDiseasesListAction!findProfessionTreatment.action";
//--------------------------------------------------------------//
//消息通知列表
var MESSAGELIST = "app/messageNoticeAction!messageNoticeList.action";
//--------------------------------------------------------------//
//单个字段保存
var UPDATEVALUE = "app/userInformationAction!updateValue.action";
//保存（结果信息）
var UPDATERESULT = "app/userInformationAction!updateResult.action";
//上传头像
var HEADPORTRAIT = "app/userInformationAction!saveHeadPortrait.action";
// 根据appID获取体检信息
var GETCHECKINFOBYAPPID = 'app/userInformationAction!getCheckInfoByAppId.action';
//基本信息
var USERINFORMATION = "app/userInformationAction!saveUserinformation.action";
//修改我的习惯
var UPDATEMYBIT = "app/userInformationAction!updateMyHabit.action";
//--------------------------------------------------------------//
//我的圈子列表
var MYTERRITORYLIST = 'app/myTerritoryAction!list.action';
//我的圈子详细
var MYTERRITORYDETAIL = 'app/myTerritoryAction!detail.action';
//修改我的圈子关注
var MYTERRITORY = "app/myTerritoryAction!updateMyTerritory.action";
//--------------------------------------------------------------//
//我的健康环	保存
var MYHEALTH = "app/myHealthRingAction!saveOrDelHealthRing.action";
//--------------------------------------------------------------//
//情绪解决办法
var EMOTIONMETHOD = "app/emotionAction!method.action";
//--------------------------------------------------------------//
// 获取问卷
var GETQUESTION = 'app/questionnaireAction!getQuestionByType.action';
// 计算得分
var CALCULATESCORE = 'app/questionnaireAction!calculateScore.action';
// 各向指数
var GEXIANGZHISHU = 'app/questionnaireAction!gexiangzhishu.action';
// 历史记录
var HISTORYRECORD = 'app/questionnaireAction!historyRecord.action';
//--------------------------------------------------------------//
//查一查确认是否患有疾病
var AHEALTHCHECK = "app/selfCheckAction!isDisease.action";
//--------------------------------------------------------------//
//自修数据
var SELFCULTIVATION = "app/selfCultivationAction!findData.action";
//--------------------------------------------------------------//
//自养数据
var SELFHEALTH = "app/selfHealthAction!findData.action";
//疾病养生数据
var SELFHEALTHYINSHI = "app/selfHealthAction!findDataYinShi.action";
//饮食换一批数据
var SELFHEALTHNEXT = "app/selfHealthAction!findDataYinShiNext.action";
var GETHEALTH = "app/selfHealthAction!getHealthRing.action";
// 获取疾病养一养的数据
var GETDISEASEHEALTH = 'app/selfHealthAction!getDiseaseHealth.action';
//--------------------------------------------------------------//
// 查看推送消息
var GETPUSHMES = 'app/messageNoticeAction!getPushMes.action';
//--------------------------------------------------------------//
//天气
var WEATHER = 'app/weatherAction!getWeather.action';
//--------------------------------------------------------------//
// 计算并保存我的周期
var CALCULATEANDSAVEMYCYCLE = 'app/myCycleAction!calculateCycleAndSave.action';
var SETMYCYCLE = 'app/myCycleAction!setCycle.action';
//--------------------------------------------------------------//
// 朋友及动态
var GETUSERBYPHONE = 'app/friendDynamicAction!getUserByPhone.action';
var ADDFRIEND = 'app/friendDynamicAction!addFriend.action';
var EDITFRIEND = 'app/friendDynamicAction!editFriend.action';
var GETFRIENDS = 'app/friendDynamicAction!getFriends.action';
var EDITDYNAMIC = 'app/friendDynamicAction!editDynamic.action';
var GETDYNAMICS = 'app/friendDynamicAction!getDynamics.action';
var GETFRIENDDYNAMICS = 'app/friendDynamicAction!getFriendDynamics.action';
var UPDATEIMG = 'app/friendDynamicAction!uploadImg.action';
var SETMYCYCLE = 'app/myCycleAction!setCycle.action';
var ISHAVEREQUEST = 'app/friendDynamicAction!isHaveRequest.action';
var UPDATEREAD = 'app/friendDynamicAction!updateRead.action';
//--------------------------------------------------------------//
//方案、预案
var PROGRAMMEPLANPROGRAMME = 'app/programmePlanprogrammeAction!query.action';
var PROGRAMMEPLANPROGRAMMESAVE = 'app/programmePlanprogrammeAction!saveOrUpdate.action';
var PROGRAMMEPLANPROGRAMMEGET = 'app/programmePlanprogrammeAction!get.action';
var PROGRAMMEPLANPROGRAMMEADD = 'app/programmePlanprogrammeAction!add.action';
//--------------------------------------------------------------//
//收藏
var GETMYCOLLECTION = 'app/collectionAction!getMyCollection.action';
var ADDMYCOLLECTION = 'app/collectionAction!addMyCollection.action';
var DELMYCOLLECTION = 'app/collectionAction!delMyCollection.action';
var GETMYCOLLECTIONBYCONDITION = 'app/collectionAction!getMyCollectionByCondition.action';
var DELMYCOLLECTIONBYCONDITION = 'app/collectionAction!delMyCollectionByCondition.action';
