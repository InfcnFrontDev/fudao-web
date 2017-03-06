var commonDate = new Date();
//老年人/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//个人史
var common_personal_history = [
	'肠道神经或肌肉病变', '先天性巨结肠', '肠道肿瘤', '炎症性肠病', '甲状腺功能减退症', '糖尿病', '周围血管病', '结缔组织病', '淀粉样变性', '脊髓损伤', '帕金森病', '精神病',
	'抑郁症', '神经性厌食', '文化程度低', '脑卒中', '脑内血管病变', '头部外伤', '血糖长期控制不达标', '胰岛素抵抗', '长期接触铅等有毒物质', '血脂异常', '高胆固醇血症',
	'脑动脉粥样硬化', '心肌梗死', '心房纤颤', '充血性心力衰竭', '落枕', '冠心病', '高血压', '哮喘', '呼吸道感染', '肺结核', '慢阻肺急性加重', '呼吸系统疾病',
	'突发或者急性发作的局灶性神经系统疾病', '外伤', '出血', '手术', '卒中', '肾脏病', '血液病', '慢性疼痛', '自杀', '记忆力减退', '精神疾病', '跌倒或骨折', '甲状腺功能亢进'
];
//家族史
var common_family_history = [
	'痴呆', '肥胖', '骨质疏松', '慢阻肺', '呼吸系统疾病', '痛风', '自杀', '高血压', '早发心血管病'
];
//婚育史
var common_obstetrical_history = ['多育'];
//用药史
var common_medication_history = [
	'阿片制剂', '精神类药', '抗惊厥药', '钙通道拮抗剂', '抗胆碱能药', '滥用泻药', '抗凝血药物', '抗血小板药物', '抗抑郁药', '中枢兴奋性药物',
	'镇痛药', '镇静药', '茶碱类药', '类固醇', '酒精', '肿瘤放化疗', '影响骨代谢疾病药物', '长期服用避孕药等药物'
];
//吸烟
var common_smoke = ['吸烟'];
//饮食
var common_diet = [
	'高脂肪饮食', '饮食不规律', '含纤维食物摄入过少', '喜欢辛辣食物', '多食煎炸类食物', '暴饮暴食', '夜间加餐', '常吃零食',
	'饮食缺钙', '饱餐', '饮过量咖啡', '饮食过咸'
];
//运动
var common_motion = [
	'缺乏运动', '长时间保持同一姿势'
];
//睡眠
var common_sleep = [
	'睡眠姿势不当', '睡眠不足', '入睡困难', '睡眠维持障碍', '早醒', '睡眠质量下降'
];
//饮酒
var common_drink = ['长期酗酒', '过量饮酒'];
//精神状况
var common_mental_state = [
	'紧张', '疲劳', '精神状态异常', '忧郁', '注意力不易集中', '记忆力减退', '情绪波动大', '兴趣、 精力减退', '长期注意力高度集中'
];
//老年人/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//女人/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//个人史
var common_woman_personal_history = ['卵巢切除', '自然流产刮宫', '人工流产术', '盆腔手术感染', '宫颈狭窄', '进行性痛经'];
//家族史
var common_woman_family_history = ['痛经'];
//婚育史
var common_woman_obstetrical_history = ['不科学接生', '产褥期不卫生', '不洁放置宫内节育器', '不孕不育'];
//用药史
var common_woman_medication_history = [];
//吸烟
var common_woman_smoke = ['吸烟'];
//饮食
var common_woman_diet = [];
//运动
var common_woman_motion = [];
//睡眠
var common_woman_sleep = [];
//饮酒
var common_woman_drink = ['过量饮酒'];
//精神状况
var common_woman_mental_state = ['抑郁', '焦虑', '易激动', '内向'];
//女人/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//高精人群/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//个人史
var common_high_quality_population_personal_history = ['肠道神经或肌肉病变', '先天性巨结肠', '肠道肿瘤', '炎症性肠病', '甲状腺功能减退症', '糖尿病', '周围血管病', '结缔组织病', '淀粉样变性', '脊髓损伤', '帕金森病', '精神病', '抑郁症', '神经性厌食', '文化程度低', '脑卒中', '脑内血管病变', '头部外伤', '血糖长期控制不达标', '胰岛素抵抗', '长期接触铅等有毒物质', '血脂异常高胆固醇血症', '脑动脉粥样硬化', '心肌梗死', '心房纤颤', '充血性心力衰竭', '落枕', '冠心病', '高血压', '哮喘', '呼吸道感染', '肺结核', '慢阻肺急性加重', '呼吸系统疾病', '突发或者急性发作的局灶性神经系统疾病', '外伤', '出血', '手术', '卒中', '肾脏病', '血液病', '慢性疼痛', '自杀', '记忆力减退', '精神疾病', '跌倒或骨折', '甲状腺功能亢进'];
//家族史
var common_high_quality_population_family_history = ['痴呆', '肥胖', '骨质疏松', '慢阻肺', '呼吸系统疾病', '痛风', '自杀', '高血压', '早发心血管病'];
//婚育史
var common_high_quality_population_obstetrical_history = ['多育'];
//用药史
var common_high_quality_population_medication_history = ['阿片制剂', '精神类药', '抗惊厥药', '钙通道拮抗剂抗胆碱能药', '滥用泻药', '抗凝血药物', '抗血小板药物', '抗抑郁药', '中枢兴奋性药物', '镇痛药', '镇静药', '茶碱类药', '类固醇', '酒精', '肿瘤放化疗', '影响骨代谢疾病药物', '长期服用避孕药等药物'];
//吸烟
var common_high_quality_population_smoke = ['吸烟'];
//饮食
var common_high_quality_population_diet = ['高脂肪饮食', '饮食不规律', '含纤维食物摄入过少', '喜欢辛辣食物', '多食煎炸类食物', '暴饮暴食', '夜间加餐', '常吃零食', '饮食缺钙', '饱餐', '饮过量咖啡', '饮食过咸'];
//运动
var common_high_quality_population_motion = ['缺乏运动', '长时间保持同一姿势'];
//睡眠
var common_high_quality_population_sleep = ['睡眠姿势不当', '睡眠不足', '入睡困难', '睡眠维持障碍', '早醒', '睡眠质量下降'];
//饮酒
var common_high_quality_population_drink = ['长期酗酒', '过量饮酒'];
//精神状况
var common_high_quality_population_mental_state = ['紧张', '疲劳', '精神状态异常', '忧郁', '注意力不易集中', '记忆力减退', '情绪波动大', '兴趣、精力减退', '长期注意力高度集中'];
//高精人群/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//自修数据
var zixiurenqun = {};
var yan_aged = ['眼睛浮肿', '眼球晦暗', '迎风流泪', '眼袋', '黑眼圈', '睫毛短且稀疏'];
var kouqiang_aged = ['口臭'];
var yachi_aged = ['牙齿黑黄', '牙齿松动'];
var bi_aged = ['酒渣鼻'];
var toufa_aged = ['发质干枯', '白发', '脱发'];
var mianbu_aged = ['皱纹', '皮肤干裂', '皮肤暗黄', '雀斑', '痣'];
var jingbu_aged = ['皱纹', '皮肤干裂'];
var roufang_aged = ['胸小'];
var fubu_aged = [];
var dunbu_aged = [];
var shoubi_aged = [];
var datui_aged = [];
var xiaotui_aged = [];
var shou_aged = ['皮肤干裂'];
var zixiudata_aged = {};
zixiudata_aged['yan'] = yan_aged;
zixiudata_aged['kouqiang'] = kouqiang_aged;
zixiudata_aged['yachi'] = yachi_aged;
zixiudata_aged['bi'] = bi_aged;
zixiudata_aged['toufa'] = toufa_aged;
zixiudata_aged['mianbu'] = mianbu_aged;
zixiudata_aged['jingbu'] = jingbu_aged;
zixiudata_aged['roufang'] = roufang_aged;
zixiudata_aged['fubu'] = fubu_aged;
zixiudata_aged['dunbu'] = dunbu_aged;
zixiudata_aged['shou'] = shou_aged;
zixiudata_aged['shoubi'] = shoubi_aged;
zixiudata_aged['datui'] = datui_aged;
zixiudata_aged['xiaotui'] = xiaotui_aged;
zixiurenqun['aged'] = zixiudata_aged;

var yan_high_quality_population = ['眼睛浮肿', '眼球晦暗', '迎风流泪', '眼袋', '黑眼圈', '睫毛短且稀疏'];
var kouqiang_high_quality_population = ['口臭'];
var yachi_high_quality_population = ['牙齿黑黄', '牙齿松动'];
var bi_high_quality_population = ['酒渣鼻'];
var toufa_high_quality_population = ['发质干枯', '白发', '脱发'];
var mianbu_high_quality_population = ['皱纹', '皮肤干裂', '皮肤暗黄', '雀斑', '痣'];
var jingbu_high_quality_population = ['皱纹', '皮肤干裂'];
var roufang_high_quality_population = ['胸小'];
var fubu_high_quality_population = ['减肥塑形'];
var dunbu_high_quality_population = ['减肥塑形'];
var shoubi_high_quality_population = ['减肥塑形'];
var datui_high_quality_population = ['减肥塑形'];
var xiaotui_high_quality_population = ['减肥塑形'];
var shou_high_quality_population = ['皮肤干裂'];
var zixiudata_high_quality_population = {};
zixiudata_high_quality_population['yan'] = yan_high_quality_population;
zixiudata_high_quality_population['kouqiang'] = kouqiang_high_quality_population;
zixiudata_high_quality_population['yachi'] = yachi_high_quality_population;
zixiudata_high_quality_population['bi'] = bi_high_quality_population;
zixiudata_high_quality_population['toufa'] = toufa_high_quality_population;
zixiudata_high_quality_population['mianbu'] = mianbu_high_quality_population;
zixiudata_high_quality_population['jingbu'] = jingbu_high_quality_population;
zixiudata_high_quality_population['roufang'] = roufang_high_quality_population;
zixiudata_high_quality_population['fubu'] = fubu_high_quality_population;
zixiudata_high_quality_population['dunbu'] = dunbu_high_quality_population;
zixiudata_high_quality_population['shou'] = shou_high_quality_population;
zixiudata_high_quality_population['shoubi'] = shoubi_high_quality_population;
zixiudata_high_quality_population['datui'] = datui_high_quality_population;
zixiudata_high_quality_population['xiaotui'] = xiaotui_high_quality_population;
zixiurenqun['high_quality_population'] = zixiudata_high_quality_population;
//查一查	部位-症状------老年人///////////////////////////////////////////////////////////////////////////////////////////////////////////
//头部
var buwei_tou = ['头晕', '头痛', '偏头痛', '头沉', '咳嗽性晕厥', '头部前倾', '日间困倦', '发热', '睡眠紊乱', '头胀'];
//精神
var buwei_jingshen = ['记忆力减退', '注意力不易集中', '失眠多梦', '精神郁抑', '精神萎靡', '焦虑', '意识障碍', '认知障碍', '痴呆', '幻觉妄想', '学习、工作和社交能力下降', '兴趣缺乏、乐趣丧失', '自罪自责', '自杀观念', '工作效率下降', '急躁易怒', '易惊恐', '情感脆弱', '焦躁不安', '自怨自叹'];
//耳
var buwei_er = ['耳鸣', '耳堵', '听力下降'];
//鼻
var buwei_bi = ['鼻塞、过敏性鼻炎'];
//眼
var buwei_yan = ['眼胀', '干涩或多泪', '视力变化、视物不清', '双眼向一侧凝视', '一侧或双眼视力丧失或模糊'];
//口
var buwei_kou = ['口干', '味觉改变', '恶心', '呕吐', '口唇青紫', '说话不清', '理解语言困难', '多饮', '口苦', '口唇黯淡', '牙龈容易出血'];
//面部
var buwei_mianbu = ['面色暗红', '面色青灰', '面部浮肿', '一侧面部麻木或口角歪斜', '面部烘热', '肤色晦黯'];
//咽喉
var buwei_yanhou = ['咽部异物感', '声带疲劳', '咽部阵发性疼痛', '咽干'];
//颈部
var buwei_jingbu = ['颈项强直、疼痛', '不能点头、仰头及转头', '斜颈姿势', '颈部青筋暴露', '头部前倾', '颈部阵发性疼痛'];
//食道
var buwei_shidao = [];
//肺及相关
var buwei_fei = ['咳喘', '泡沫痰', '咳嗽', '咯白痰', '痰黄黏稠', '呼吸急促', '呼吸困难', '咳痰', '胸闷', '气喘'];
//乳房
var buwei_rufang = [];
//心脏
var buwei_xinzang = ['心悸', '胸闷', '心率变化', '心律失常', '气短', '心慌'];
//胸腔
var buwei_xiongqiang = ['胸部有捆绑感', '胸骨后或左前胸阵发性疼痛'];
//上腹
var buwei_shangfu = ['排便费力', '干球状便或硬便', '排便不尽感', '排便次数 < 3 次 / 周', '腹部有捆绑感', '腹胀', '腹泻', '消化不良', '食欲减退', '顽固性便秘', '上腹部阵发性疼痛', '大便失禁', '食欲紊乱'];
//下腹
var buwei_xiafu = ['腹部有捆绑感', '膀胱和直肠功能障碍', '尿频', '尿急', '尿痛', '尿不尽感,尿道灼热', '晨起、尿末或排便时尿道有少量白色分泌物', '下腹部疼痛', '排尿等待', '排尿无力', '尿线变细或中断', '排尿时间延长', '尿少浮肿', '多尿', '小便黄'];
//生殖
var buwei_shengzhi = ['性功能减退', '阳痿、早泄', '遗精', '阴茎勃起障碍', '会阴部疼痛', '外生殖器区疼痛'];
//脊柱
var buwei_jizhu = ['驼背', '肩背疼痛发僵', '躯干俯屈', '肩背部阵发性疼痛', '腰椎侧凸', '椎间隙、椎旁压痛'];
//腰骶部
var buwei_yaobu = ['腰背部疼痛', '腰膝酸软', '腰痛', '坐骨神经痛', '腰部活动受限', '腰骶及肛周坠疼痛'];
//上肢
var buwei_shangzhi = ['反射性肩臂手疼痛、胀麻', '一侧上肢麻木、沉重、疼痛', '双侧上肢麻木、沉重、疼痛', '静止时自发颤抖', '运动迟缓', '上肢肘关节屈曲', '前臂内收', '左臂阵发性疼痛'];
//下肢
var buwei_xiazhi = ['腰膝酸软', '一侧下肢麻木、沉重、疼痛', '双侧下肢麻木、沉重、疼痛', '行走困难', '双下肢有捆绑感', '下肢有烧灼感、冰凉感', '双下肢呈痉挛性瘫痪', '静止时自发颤抖', '运动迟缓', '下肢髋关节和膝关节略弯曲', '下肢麻木、发冷', '小腿、大腿后侧疼痛', '下肢瘫痪', '肌无力', '肌萎缩'];
//手
var buwei_shou = ['双手无力、不灵活', '指甲青紫', '四肢浮肿', '静止时自发颤抖', '拇指对掌', '腕关节伸直', '左手指内侧阵发性疼痛'];
//足
var buwei_zu = ['指甲青紫', '四肢浮肿', '静止时自发颤抖', '腕关节伸直', '多个趾指关节红肿疼痛， 且夜间加剧', '足下垂', '跛行'];
//全身
var buwei_quangshen = ['身长缩短', '骨折', '骨骼疼痛', '关节疼痛', '肢体麻木', '乏力', '多汗', '无汗', '畏寒或发热', '挛缩', '疲劳', '自汗或盗汗', '体重下降', '抽搐', '平衡障碍', '脂溢性皮炎 ', '关节腔有渗液 ', '运动迟缓 ', '肥胖 '];
var buweidata = {};
buweidata['tou'] = [{
	'头部': buwei_tou
}, {
	'精神': buwei_jingshen
}, {
	'耳': buwei_er
}, {
	'鼻': buwei_bi
}, {
	'眼': buwei_yan
}, {
	'口': buwei_kou
}, {
	'面部': buwei_mianbu
}];
buweidata['jing'] = [{
	'咽喉': buwei_yanhou
}, {
	'颈部': buwei_jingbu
}, {
	'食道': buwei_shidao
}];
buweidata['xiong'] = [{
	'肺及相关': buwei_fei
}, {
	'乳房': buwei_rufang
}, {
	'心脏': buwei_xinzang
}, {
	'胸腔': buwei_xiongqiang
}];
buweidata['fu'] = [{
	'下腹': buwei_xiafu
}, {
	'上腹': buwei_shangfu
}, {
	'生殖': buwei_shengzhi
}];
buweidata['bei'] = [{
	'脊柱': buwei_jizhu
}, {
	'腰骶部': buwei_yaobu
}];
buweidata['sizhi'] = [{
	'上肢': buwei_shangzhi
}, {
	'下肢': buwei_xiazhi
}, {
	'手': buwei_shou
}, {
	'足': buwei_zu
}];
buweidata['all'] = [{
	'全身': buwei_quangshen
}];
//查一查	部位-症状------老年人///////////////////////////////////////////////////////////////////////////////////////////////////////////

//查一查	部位-症状------女人/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//头部
var woman_buwei_tou = [];
//精神
var woman_buwei_jingshen = [];
//耳
var woman_buwei_er = [];
//鼻
var woman_buwei_bi = [];
//眼
var woman_buwei_yan = [];
//口
var woman_buwei_kou = [];
//面部
var woman_buwei_mianbu = [];
//咽喉
var woman_buwei_yanhou = [];
//颈部
var woman_buwei_jingbu = [];
//食道
var woman_buwei_shidao = [];
//肺及相关
var woman_buwei_fei = [];
//乳房
var woman_buwei_rufang = [];
//心脏
var woman_buwei_xinzang = ['心悸', '胸闷'];
//胸腔
var woman_buwei_xiongqiang = [];
//上腹
var woman_buwei_shangfu = [];
//下腹
var woman_buwei_xiafu = ['下腹中部疼痛', '腹胀', '下腹坠、牵拉痛明显'];
//生殖
var woman_buwei_shengzhi = ['阴道干烧灼感', '性交痛', '尿频尿急', '反复泌尿道感染', '月经周期紊乱', '绝经', '月经失调', '不孕'];
//脊柱
var woman_buwei_jizhu = [];
//腰骶部
var woman_buwei_yaobu = ['腰酸'];
//上肢
var woman_buwei_shangzhi = [];
//下肢
var woman_buwei_xiazhi = ['大腿内侧酸痛'];
//手
var woman_buwei_shou = [];
//足
var woman_buwei_zu = [];
//全身
var woman_buwei_quangshen = ['潮热', '出汗'];
//女姓部位
var womanbuweidata = {}
womanbuweidata['tou'] = [{
	'头部': woman_buwei_tou
}, {
	'精神': woman_buwei_jingshen
}, {
	'耳': woman_buwei_er
}, {
	'鼻': woman_buwei_bi
}, {
	'眼': woman_buwei_yan
}, {
	'口': woman_buwei_kou
}, {
	'面部': woman_buwei_mianbu
}];
womanbuweidata['jing'] = [{
	'咽喉': woman_buwei_yanhou
}, {
	'颈部': woman_buwei_jingbu
}, {
	'食道': woman_buwei_shidao
}];
womanbuweidata['xiong'] = [{
	'肺及相关': woman_buwei_fei
}, {
	'乳房': woman_buwei_rufang
}, {
	'心脏': woman_buwei_xinzang
}, {
	'胸腔': woman_buwei_xiongqiang
}];
womanbuweidata['fu'] = [{
	'下腹': woman_buwei_xiafu
}, {
	'上腹': woman_buwei_shangfu
}, {
	'生殖': woman_buwei_shengzhi
}];
womanbuweidata['bei'] = [{
	'脊柱': woman_buwei_jizhu
}, {
	'腰骶部': woman_buwei_yaobu
}];
womanbuweidata['sizhi'] = [{
	'上肢': woman_buwei_shangzhi
}, {
	'下肢': woman_buwei_xiazhi
}, {
	'手': woman_buwei_shou
}, {
	'足': woman_buwei_zu
}];
womanbuweidata['all'] = [{
	'全身': woman_buwei_quangshen
}];
//查一查	部位-症状------女人/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//查一查	部位-症状------高精质人群/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//头部
var high_quality_population_buwei_tou = ['发热', '头痛', '头晕', '偏头痛', '头沉'];
//精神
var high_quality_population_buwei_jingshen = ['兴趣缺乏、乐趣丧失', '焦虑', '自罪自责', '幻觉妄想', '记忆力减退', '自杀观念', '工作效率下降', '睡眠紊乱', '注意力不易集中', '失眠多梦', '学习、工作和社交能力下降', '日间困倦'];
//耳
var high_quality_population_buwei_er = ['耳鸣', '耳堵', '听力下降'];
//鼻
var high_quality_population_buwei_bi = ['鼻塞、 过敏性鼻炎'];
//眼
var high_quality_population_buwei_yan = ['眼胀', '干涩或多泪', '视力变化、 视物不清'];
//口
var high_quality_population_buwei_kou = ['口干', '味觉改变', '恶心', '呕吐'];
//面部
var high_quality_population_buwei_mianbu = [];
//咽喉
var high_quality_population_buwei_yanhou = ['咽部异物感', '声带疲劳'];
//颈部
var high_quality_population_buwei_jingbu = ['颈项强直、 疼痛', '不能点头、 仰头及转头', '斜颈姿势'];
//食道
var high_quality_population_buwei_shidao = [];
//肺及相关
var high_quality_population_buwei_fei = [];
//乳房
var high_quality_population_buwei_rufang = [];
//心脏
var high_quality_population_buwei_xinzang = ['心慌气短', '心悸', '胸闷', '心率变化', '心律失常'];
//胸腔
var high_quality_population_buwei_xiongqiang = ['胸部有捆绑感'];
//上腹
var high_quality_population_buwei_shangfu = ['大便失禁', '食欲紊乱', '排便费力', '干球状便或硬便', '排便不尽感', '排便次数 < 3 次 / 周', '排便量少', '腹胀', '腹泻', '消化不良', '腹部有捆绑感'];
//下腹
var high_quality_population_buwei_xiafu = ['尿频', '膀胱和直肠功能障碍', '腹部有捆绑感'];
//生殖
var high_quality_population_buwei_shengzhi = ['阴茎勃起障碍', '性功能减退'];
//脊柱
var high_quality_population_buwei_jizhu = ['腰椎侧凸', '肩背疼痛发僵'];
//腰骶部
var high_quality_population_buwei_yaobu = ['腰痛', '坐骨神经痛', '腰部活动受限', '椎间隙、 椎旁压痛'];
//上肢
var high_quality_population_buwei_shangzhi = ['一侧上肢麻木、 沉重、 疼痛', '反射性肩臂手疼痛、 胀麻', '双侧上肢麻木、 沉重、 疼痛', '双手无力、 不灵活'];
//下肢
var high_quality_population_buwei_xiazhi = ['下肢麻木、 发冷', '小腿、 大腿后侧疼痛', '下肢瘫痪', '肌无力', '肌萎缩', '一侧下肢麻木、 沉重、 疼痛', '行走困难', '下肢有烧灼感、 冰凉感', '双下肢呈痉挛性瘫痪', '双侧下肢麻木、 沉重、 疼痛', '双下肢有捆绑感'];
//手
var high_quality_population_buwei_shou = [];
//足
var high_quality_population_buwei_zu = ['足下垂', '跛行', '多个趾指关节红肿疼痛， 且夜间加剧'];
//全身
var high_quality_population_buwei_quangshen = ['运动迟缓', '关节腔有渗液', '精神萎靡', '运动迟缓', '疲劳', '全身疼痛', '多汗', '无汗', '畏寒或发热'];
//高精质人群部位
var high_quality_populationbuweidata = {}
high_quality_populationbuweidata['tou'] = [{
	'头部': high_quality_population_buwei_tou
}, {
	'精神': high_quality_population_buwei_jingshen
}, {
	'耳': high_quality_population_buwei_er
}, {
	'鼻': high_quality_population_buwei_bi
}, {
	'眼': high_quality_population_buwei_yan
}, {
	'口': high_quality_population_buwei_kou
}, {
	'面部': high_quality_population_buwei_mianbu
}];
high_quality_populationbuweidata['jing'] = [{
	'咽喉': high_quality_population_buwei_yanhou
}, {
	'颈部': high_quality_population_buwei_jingbu
}, {
	'食道': high_quality_population_buwei_shidao
}];
high_quality_populationbuweidata['xiong'] = [{
	'肺及相关': high_quality_population_buwei_fei
}, {
	'乳房': high_quality_population_buwei_rufang
}, {
	'心脏': high_quality_population_buwei_xinzang
}, {
	'胸腔': high_quality_population_buwei_xiongqiang
}];
high_quality_populationbuweidata['fu'] = [{
	'下腹': high_quality_population_buwei_xiafu
}, {
	'上腹': high_quality_population_buwei_shangfu
}, {
	'生殖': high_quality_population_buwei_shengzhi
}];
high_quality_populationbuweidata['bei'] = [{
	'脊柱': high_quality_population_buwei_jizhu
}, {
	'腰骶部': high_quality_population_buwei_yaobu
}];
high_quality_populationbuweidata['sizhi'] = [{
	'上肢': high_quality_population_buwei_shangzhi
}, {
	'下肢': high_quality_population_buwei_xiazhi
}, {
	'手': high_quality_population_buwei_shou
}, {
	'足': high_quality_population_buwei_zu
}];
high_quality_populationbuweidata['all'] = [{
	'全身': high_quality_population_buwei_quangshen
}];

var buwei = {};
buwei['aged'] = buweidata;
buwei['woman'] = womanbuweidata;
buwei['high_quality_population'] = high_quality_populationbuweidata;
//查一查	部位-症状------高精质人群/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//我的圈子
var my_ring = {};
my_ring['aged'] = ['中风', '心脑血管疾病', '失眠', '骨质疏松', '肥胖', '焦虑', '高血压', '糖尿病', '冠心病'];
my_ring['woman'] = ['妇科炎症', '减肥塑形', '月经不调', '卵巢囊肿', '不孕不育', '子宫肌瘤', '卵巢早衰', '子宫内膜异位症', '乳腺增生', '更年期综合征'];
my_ring['high_quality_population'] = ['中风', '心脑血管疾病', '失眠', '骨质疏松', '肥胖', '焦虑', '高血压', '糖尿病', '冠心病'];
//养心
var yangxin = {};
yangxin['aged'] = ['10:30', '16:00', '19:00', '20:00'];
yangxin['high_quality_population'] = ['19:30', '21:00'];
//饮食
var public_yinshi = ['早餐阶段', '午休阶段', '晚餐阶段', '休息阶段1', '休息阶段2'];
//运动
var yundong = {};
yundong['aged'] = ['7:30', '19:30'];
yundong['high_quality_population'] = ['7:30', '20:00'];
//我的习惯//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var common_my_habit = {};
common_my_habit['aged'] = ['午休阶段', '主任务阶段2', '休息阶段2', '休闲阶段2', '晚餐阶段', '休闲阶段3', '睡前阶段', '睡眠阶段', '起床阶段', '晨练阶段', '早餐阶段', '主任务阶段1',
	'休息阶段1', '休闲阶段1'
];
common_my_habit['high_quality_population'] = ['午休阶段', '主任务阶段2', '休息阶段2', '休闲阶段2', '晚餐阶段', '休闲阶段3', '睡前阶段', '睡眠阶段', '起床阶段', '晨练阶段', '早餐阶段', '主任务阶段1',
	'休息阶段1', '休闲阶段1'
];
//24小时颜色表
var common_color = {
	"00:00": "#0000FF",
	"00:30": "#0033FF",
	"01:00": "#0066FF",
	"01:30": "#0099FF",
	"02:00": "#00CCFF",
	"02:30": "#00FFFF",
	"03:00": "#3300FF",
	"03:30": "#3333FF",
	"04:00": "#3366FF",
	"04:30": "#3399FF",
	"05:00": "#33CCFF",
	"05:30": "#33FFFF",
	"06:00": "#6600FF",
	"06:30": "#6633FF",
	"07:00": "#6666FF",
	"07:30": "#6699FF",
	"08:00": "#66CCFF",
	"08:30": "#66FFFF",
	"09:00": "#9900FF",
	"09:30": "#9933FF",
	"10:00": "#9966FF",
	"10:30": "#9999FF",
	"11:00": "#99CCFF",
	"11:30": "#99FFFF",
	"12:00": "#CC00FF",
	"12:30": "#CC33FF",
	"13:00": "#CC66FF",
	"13:30": "#CC99FF",
	"14:00": "#CCCCFF",
	"14:30": "#CCFFFF",
	"15:00": "#FF00FF",
	"15:30": "#FF33FF",
	"16:00": "#FF66FF",
	"16:30": "#FF99FF",
	"17:00": "#FFCCFF",
	"17:30": "#330000",
	"18:00": "#333300",
	"18:30": "#336600",
	"19:00": "#339900",
	"19:30": "#33CC00",
	"20:00": "#33FF00",
	"20:30": "#660000",
	"21:00": "#666600",
	"21:30": "#669900",
	"22:00": "#66CC00",
	"22:30": "#66FF00",
	"23:00": "#990000",
	"23:30": "#993300"
}
var common_arr_color = [];
common_arr_color.push('#FFCC99');
common_arr_color.push('#99CC99');
common_arr_color.push('#FF9966');
common_arr_color.push('#FFCC33');
common_arr_color.push('#336699');
common_arr_color.push('#CCCCCC');
common_arr_color.push('#FF9900');
common_arr_color.push('#99CCFF');
common_arr_color.push('#CC9933');
common_arr_color.push('#CCCC33');
common_arr_color.push('#CC6600');
common_arr_color.push('#CCCC33');
common_arr_color.push('#336699');
var subsection_proportion = {
	"起床阶段": [1, 2, 3],
	"午休阶段": [3, 1, 2],
	"晚餐阶段": [2, 1],
	"休闲阶段": [1, 1]
};
var arrSolarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
