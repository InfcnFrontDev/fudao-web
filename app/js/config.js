//var apiPath="http://192.168.3.126:18080/fudao-svc/";
var apiPath = 'http://192.168.10.69:8080/fudao-svc/';
var urls={
    //生命周期
    LIFE_CYCLE: apiPath + 'app/myCycleAction!calculateCycleAndSave.action',
    //天气
    WEATHER:apiPath +'/app/weatherAction!getWeather.action',
    //文章详情
    ARTICLA_DETAIL:apiPath + 'app/myTerritoryAction!detail.action',
    //添加收藏
    ADD_COLLECT:apiPath + 'app/collectionAction!addMyCollection.action',
    //问卷测评
    ASSESSMENT:apiPath + 'app/questionnaireAction!getQuestionByType.action',
    //计算得分
    CALCULATE_SCORE:apiPath +'app/questionnaireAction!calculateScore.action',
    //个人习惯（时间段）
    MYHABIT:apiPath +'app/accountInfoAction!getMyHabit.action'
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var abc=[
    {
        "daytype": "1",
        "endTime": "08:00",
        "endTimeRange": "7:45-8:15",
        "id": "ebb8b70f-0f0f-11e7-9b59-000c293e6828",
        "level": "辅助阶段",
        "location": "1",
        "name": "起床阶段",
        "orderNum": 1,
        "startTime": "07:00",
        "startTimeRange": "6:45-7:15",
        "timeLenRangeMin": 40,
        "timeLenReaneMax": 60,
        "timeSegments": [
            {
                "endTime": "07:10",
                "id": "acd5c852-0f17-11e7-9b59-000c293e6828",
                "isEndRemind": 1,
                "isStartRemind": 1,
                "name": "醒来-平静-起床",
                "orderNum": 11,
                "startTime": "07:00",
                "title": "醒来-平静-起床"
            },
            {
                "endTime": "07:30",
                "id": "acd5dc90-0f17-11e7-9b59-000c293e6828",
                "name": "如厕",
                "orderNum": 12,
                "startTime": "07:10",
                "title": "如厕"
            },
            {
                "endTime": "08:00",
                "id": "acd5ecf8-0f17-11e7-9b59-000c293e6828",
                "name": "洗漱更衣",
                "orderNum": 13,
                "startTime": "07:30",
                "title": "洗漱更衣"
            }
        ],
        "title": "起床阶段"
    },
    {
        "daytype": "1",
        "endTime": "08:30",
        "endTimeRange": "8:15-8:45",
        "id": "ebb8b789-0f0f-11e7-9b59-000c293e6828",
        "level": "次要阶段",
        "location": "1",
        "name": "晨练阶段",
        "orderNum": 2,
        "startTime": "08:00",
        "startTimeRange": "7:45-8:15",
        "timeLenRangeMin": 20,
        "timeLenReaneMax": 40,
        "timeSegments": [
            {
                "endTime": "08:30",
                "id": "acd5fca4-0f17-11e7-9b59-000c293e6828",
                "name": "晨练",
                "orderNum": 21,
                "startTime": "08:00",
                "title": "晨练"
            }
        ],
        "title": "晨练阶段"
    },
    {
        "daytype": "1",
        "endTime": "09:00",
        "endTimeRange": "8:45-9:15",
        "id": "ebb8b817-0f0f-11e7-9b59-000c293e6828",
        "level": "主要阶段",
        "location": "1",
        "name": "早餐阶段",
        "orderNum": 3,
        "startTime": "08:30",
        "startTimeRange": "8:15-8:45",
        "timeLenRangeMin": 20,
        "timeLenReaneMax": 40,
        "timeSegments": [
            {
                "endTime": "09:00",
                "id": "acd60c73-0f17-11e7-9b59-000c293e6828",
                "name": "早餐",
                "orderNum": 31,
                "startTime": "08:30",
                "title": "早餐"
            }
        ],
        "title": "早餐阶段"
    },
    {
        "daytype": "1",
        "endTime": "10:30",
        "endTimeRange": "——",
        "id": "ebb8b889-0f0f-11e7-9b59-000c293e6828",
        "level": "主要阶段",
        "location": "1",
        "name": "工作阶段",
        "orderNum": 4,
        "startTime": "09:00",
        "startTimeRange": "8:45-9:15",
        "timeLenRangeMin": 20,
        "timeLenReaneMax": 40,
        "timeSegments": [
            {
                "endTime": "10:30",
                "id": "acd61bae-0f17-11e7-9b59-000c293e6828",
                "name": "工作",
                "orderNum": 41,
                "startTime": "09:00",
                "title": "工作1"
            }
        ],
        "title": "工作阶段1"
    },
    {
        "daytype": "1",
        "endTime": "11:00",
        "endTimeRange": "——",
        "id": "ebb8b8f9-0f0f-11e7-9b59-000c293e6828",
        "level": "辅助阶段",
        "location": "1",
        "name": "休息阶段",
        "orderNum": 5,
        "startTime": "10:30",
        "startTimeRange": "——",
        "timeLenRangeMin": 20,
        "timeLenReaneMax": 40,
        "timeSegments": [
            {
                "endTime": "11:00",
                "id": "acd62bbc-0f17-11e7-9b59-000c293e6828",
                "isEndRemind": 1,
                "isStartRemind": 1,
                "name": "休息",
                "orderNum": 51,
                "startTime": "10:30",
                "title": "休息1"
            }
        ],
        "title": "休息阶段1"
    },
    {
        "daytype": "1",
        "endTime": "12:00",
        "endTimeRange": "11:45-12:15",
        "id": "ebb8b96d-0f0f-11e7-9b59-000c293e6828",
        "level": "主要阶段",
        "location": "1",
        "name": "工作阶段",
        "orderNum": 6,
        "startTime": "11:00",
        "startTimeRange": "——",
        "timeLenRangeMin": 20,
        "timeLenReaneMax": 40,
        "timeSegments": [
            {
                "endTime": "12:00",
                "id": "acd63b16-0f17-11e7-9b59-000c293e6828",
                "name": "工作",
                "orderNum": 61,
                "startTime": "11:00",
                "title": "工作2"
            }
        ],
        "title": "工作阶段2"
    },
    {
        "daytype": "1",
        "endTime": "13:30",
        "endTimeRange": "13:15-13:45",
        "id": "ebb8ba47-0f0f-11e7-9b59-000c293e6828",
        "level": "主要阶段",
        "location": "1",
        "name": "午休阶段",
        "orderNum": 7,
        "startTime": "12:00",
        "startTimeRange": "11:45-12:15",
        "timeLenRangeMin": 75,
        "timeLenReaneMax": 115,
        "timeSegments": [
            {
                "endTime": "12:50",
                "id": "acd64b2d-0f17-11e7-9b59-000c293e6828",
                "name": "午餐",
                "orderNum": 71,
                "startTime": "12:00",
                "title": "午餐"
            },
            {
                "endTime": "13:00",
                "id": "acd65ae6-0f17-11e7-9b59-000c293e6828",
                "name": "饭后休息",
                "orderNum": 72,
                "startTime": "12:50",
                "title": "饭后休息"
            },
            {
                "endTime": "13:30",
                "id": "acd66a21-0f17-11e7-9b59-000c293e6828",
                "isEndRemind": 1,
                "isStartRemind": 1,
                "name": "午睡",
                "orderNum": 73,
                "startTime": "13:00",
                "title": "午睡"
            }
        ],
        "title": "午休阶段"
    },
    {
        "daytype": "1",
        "endTime": "15:30",
        "endTimeRange": "——",
        "id": "ebb8bab0-0f0f-11e7-9b59-000c293e6828",
        "level": "主要阶段",
        "location": "1",
        "name": "工作阶段",
        "orderNum": 8,
        "startTime": "13:30",
        "startTimeRange": "13:15-13:45",
        "timeLenRangeMin": 75,
        "timeLenReaneMax": 115,
        "timeSegments": [
            {
                "endTime": "15:30",
                "id": "acd67a30-0f17-11e7-9b59-000c293e6828",
                "name": "工作",
                "orderNum": 81,
                "startTime": "13:30",
                "title": "工作3"
            }
        ],
        "title": "工作阶段3"
    },
    {
        "daytype": "1",
        "endTime": "16:00",
        "endTimeRange": "——",
        "id": "ebb8bb12-0f0f-11e7-9b59-000c293e6828",
        "level": "辅助阶段",
        "location": "1",
        "name": "休息阶段",
        "orderNum": 9,
        "startTime": "15:30",
        "startTimeRange": "——",
        "timeLenRangeMin": 75,
        "timeLenReaneMax": 115,
        "timeSegments": [
            {
                "endTime": "16:00",
                "id": "acd6898d-0f17-11e7-9b59-000c293e6828",
                "isEndRemind": 1,
                "isStartRemind": 1,
                "name": "休息",
                "orderNum": 91,
                "startTime": "15:30",
                "title": "休息2"
            }
        ],
        "title": "休息阶段2"
    },
    {
        "daytype": "1",
        "endTime": "18:30",
        "endTimeRange": "18:15-18:45",
        "id": "ebb8bb75-0f0f-11e7-9b59-000c293e6828",
        "level": "主要阶段",
        "location": "1",
        "name": "工作阶段",
        "orderNum": 10,
        "startTime": "16:00",
        "startTimeRange": "——",
        "timeLenRangeMin": 75,
        "timeLenReaneMax": 115,
        "timeSegments": [
            {
                "endTime": "18:30",
                "id": "acd69924-0f17-11e7-9b59-000c293e6828",
                "name": "工作",
                "orderNum": 101,
                "startTime": "16:00",
                "title": "工作4"
            }
        ],
        "title": "工作阶段4"
    },
    {
        "daytype": "1",
        "endTime": "20:00",
        "endTimeRange": "19:45-20:15",
        "id": "ebb8bbdb-0f0f-11e7-9b59-000c293e6828",
        "level": "主要阶段",
        "location": "1",
        "name": "晚餐阶段",
        "orderNum": 11,
        "startTime": "18:30",
        "startTimeRange": "18:15-18:45",
        "timeLenRangeMin": 75,
        "timeLenReaneMax": 105,
        "timeSegments": [
            {
                "endTime": "19:30",
                "id": "acd6a8d9-0f17-11e7-9b59-000c293e6828",
                "name": "晚餐",
                "orderNum": 111,
                "startTime": "18:30",
                "title": "晚餐"
            },
            {
                "endTime": "20:00",
                "id": "acd6b855-0f17-11e7-9b59-000c293e6828",
                "name": "休闲",
                "orderNum": 112,
                "startTime": "19:30",
                "title": "休闲1"
            }
        ],
        "title": "晚餐阶段"
    },
    {
        "daytype": "1",
        "endTime": "22:30",
        "endTimeRange": "——",
        "id": "ebb8bc3d-0f0f-11e7-9b59-000c293e6828",
        "level": "次要阶段",
        "location": "1",
        "name": "休闲阶段",
        "orderNum": 12,
        "startTime": "20:00",
        "startTimeRange": "19:45-20:15",
        "timeLenRangeMin": 75,
        "timeLenReaneMax": 105,
        "timeSegments": [
            {
                "endTime": "21:00",
                "id": "ace33859-0f17-11e7-9b59-000c293e6828",
                "isEndRemind": 1,
                "isStartRemind": 1,
                "name": "运动",
                "orderNum": 121,
                "startTime": "20:00",
                "title": "运动"
            },
            {
                "endTime": "22:30",
                "id": "ace348ef-0f17-11e7-9b59-000c293e6828",
                "name": "休闲",
                "orderNum": 122,
                "startTime": "21:00",
                "title": "休闲2"
            }
        ],
        "title": "休闲阶段"
    },
    {
        "daytype": "1",
        "endTime": "23:00",
        "endTimeRange": "——",
        "id": "ebb8bc9b-0f0f-11e7-9b59-000c293e6828",
        "level": "辅助阶段",
        "location": "1",
        "name": "睡前阶段",
        "orderNum": 13,
        "startTime": "22:30",
        "startTimeRange": "——",
        "timeLenRangeMin": 75,
        "timeLenReaneMax": 105,
        "timeSegments": [
            {
                "endTime": "23:00",
                "id": "ace35870-0f17-11e7-9b59-000c293e6828",
                "isEndRemind": 1,
                "isStartRemind": 1,
                "name": "睡前",
                "orderNum": 131,
                "startTime": "22:30",
                "title": "睡前"
            }
        ],
        "title": "睡前阶段"
    },
    {
        "daytype": "1",
        "endTime": "07:00",
        "endTimeRange": "6:45-7:15",
        "id": "ebb8bcfb-0f0f-11e7-9b59-000c293e6828",
        "level": "主要阶段",
        "location": "1",
        "name": "睡眠阶段",
        "orderNum": 14,
        "startTime": "23:00",
        "startTimeRange": "——",
        "timeLenRangeMin": 75,
        "timeLenReaneMax": 105,
        "timeSegments": [
            {
                "endTime": "07:00",
                "id": "ace36b59-0f17-11e7-9b59-000c293e6828",
                "name": "睡眠",
                "orderNum": 141,
                "startTime": "23:00",
                "title": "睡眠"
            }
        ],
        "title": "睡眠阶段"
    }
]
