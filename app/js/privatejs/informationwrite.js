/**
 * 绑定事件	-	体检信息
 */
function binding_event() {
	mui('body').on('tap', '#li_neike', function() {
		jumpPage('../checkinfo/neike.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_waike', function() {
		jumpPage('../checkinfo/waike.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_yanke', function() {
		jumpPage('../checkinfo/yanke.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_erbihouke', function() {
		jumpPage('../checkinfo/erbihouke.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_kouqiangke', function() {
		jumpPage('../checkinfo/kouqiangke.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_ruxianyuanhongwaixian', function() {
		jumpPage('../checkinfo/ruxianyuanhongwaixian.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_xindiantu', function() {
		jumpPage('../checkinfo/xindiantu.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_ct', function() {
		jumpPage('../checkinfo/ct.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_x', function() {
		jumpPage('../checkinfo/xray.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_niaochanggui', function() {
		jumpPage('../checkinfo/niaochanggui.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_xuechanggui', function() {
		jumpPage('../checkinfo/xuechanggui.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_xuezhilei', function() {
		jumpPage('../checkinfo/xuezhilei.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_xuetanglei', function() {
		jumpPage('../checkinfo/xuetanglei.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_gandangongneng', function() {
		jumpPage('../checkinfo/gandangongneng.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_shengongneng', function() {
		jumpPage('../checkinfo/shengongneng.html', "slide-in-right", {}, false);
	});
	mui('body').on('tap', '#li_zhongliubiaozhi', function() {
		jumpPage('../checkinfo/zhongliubiaozhi.html', "slide-in-right", {}, false);
	});
}
/**
 *	体检信息	-	赋值	后台取值
 */
function assignment_ajax(name) {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(userInformation[name] == null) {
		mui.ajax(ADDR + GETCHECKINFOBYAPPID, {
			data: {
				name: name,
				appid: user.appid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			timeout: 3000, //超时时间设置为3秒；
			async: false,
			success: function(data) {
				if(data.success) {
					userInformation[name] = data.obj;
					saveUserInformation(user.appid, userInformation);
					assignment(userInformation);
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
			}
		});
	} else {
		assignment(userInformation);
	}
}
/**
 *	体检信息	-	内科-保存
 */
function neike_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.medicalDepartment == null || userInformation.medicalDepartment == undefined) {
		userInformation.medicalDepartment = {};
	}
	//既往病史
	userInformation.medicalDepartment['past_history'] = document.getElementById("past_history").value;
	//心率
	userInformation.medicalDepartment['heart_rate'] = document.getElementById("heart_rate").value;
	//心音
	userInformation.medicalDepartment['heart_sound'] = document.getElementById("heart_sound").value;
	//心界
	userInformation.medicalDepartment['of_heart'] = document.getElementById("of_heart").value;
	//肺
	userInformation.medicalDepartment['lung'] = document.getElementById("lung").value;
	//腹部
	userInformation.medicalDepartment['abdomen'] = document.getElementById("abdomen").value;
	//肝脏
	userInformation.medicalDepartment['liver'] = document.getElementById("liver").value;
	//胆
	userInformation.medicalDepartment['bravery'] = document.getElementById("bravery").value;
	//脾脏
	userInformation.medicalDepartment['spleen'] = document.getElementById("spleen").value;
	//精神及神经
	userInformation.medicalDepartment['mental_and_neurological'] = document.getElementById("mental_and_neurological").value;
	//腱反射
	userInformation.medicalDepartment['tendon_reflexes'] = document.getElementById("tendon_reflexes").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'medicalDepartment');
}
/**
 *	体检信息	-	内科-保存
 */
function waike_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.surgical == null || userInformation.surgical == undefined) {
		userInformation.surgical = {};
	}
	// 既往病史
	userInformation.surgical['past_history'] = document.getElementById("past_history").value;
	// 皮肤
	userInformation.surgical['skin'] = document.getElementById("skin").value;
	// 浅表淋巴结
	userInformation.surgical['superficial_lymph_nodes'] = document.getElementById("superficial_lymph_nodes").value;
	// 甲状腺
	userInformation.surgical['thyroid'] = document.getElementById("thyroid").value;
	// 乳房
	userInformation.surgical['breast'] = document.getElementById("breast").value;
	// 脊柱
	userInformation.surgical['spine'] = document.getElementById("spine").value;
	// 四肢关节
	userInformation.surgical['limbs'] = document.getElementById("limbs").value;
	// 肛门
	userInformation.surgical['anus'] = document.getElementById("anus").value;
	// 直肠指诊
	userInformation.surgical['digital_rectal_examination'] = document.getElementById("digital_rectal_examination").value;
	// 外科其他
	userInformation.surgical['other'] = document.getElementById("other").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'surgical');
}
/**
 *	体检信息	-	内科-保存
 */
function yanke_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.ophthalmology == null || userInformation.ophthalmology == undefined) {
		userInformation.ophthalmology = {};
	}
	// 右眼矫正视力
	userInformation.ophthalmology['right_eye'] = document.getElementById("right_eye").value;
	// 左眼矫正视力
	userInformation.ophthalmology['left_eye'] = document.getElementById("left_eye").value;
	// 辨色力
	userInformation.ophthalmology['color'] = document.getElementById("color").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'ophthalmology');
}
/**
 *	体检信息	-	耳鼻喉科-保存
 */
function erbihouke_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.otolaryngology == null || userInformation.otolaryngology == undefined) {
		userInformation.otolaryngology = {};
	}
	// 听力
	userInformation.otolaryngology['hearing'] = document.getElementById("hearing").value;
	// 外耳
	userInformation.otolaryngology['external_ear'] = document.getElementById("external_ear").value;
	// 外耳道
	userInformation.otolaryngology['external_auditory_canal'] = document.getElementById("external_auditory_canal").value;
	// 鼓膜
	userInformation.otolaryngology['eardrum'] = document.getElementById("eardrum").value;
	// 外鼻
	userInformation.otolaryngology['external_nose'] = document.getElementById("external_nose").value;
	// 鼻腔
	userInformation.otolaryngology['nasal_cavity'] = document.getElementById("nasal_cavity").value;
	// 咽
	userInformation.otolaryngology['pharynx'] = document.getElementById("pharynx").value;
	// 喉
	userInformation.otolaryngology['throat'] = document.getElementById("throat").value;
	// 其他
	userInformation.otolaryngology['other'] = document.getElementById("other").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'otolaryngology');
}
/**
 *	体检信息	-	耳鼻喉科-保存
 */
function kouqiangke_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.dentalDepartment == null || userInformation.dentalDepartment == undefined) {
		userInformation.dentalDepartment = {};
	}
	// 颜面
	userInformation.dentalDepartment['face'] = document.getElementById("face").value;
	// 口舌
	userInformation.dentalDepartment['tongue'] = document.getElementById("tongue").value;
	// 唇腭
	userInformation.dentalDepartment['chune'] = document.getElementById("chune").value;
	// 口腔黏膜
	userInformation.dentalDepartment['oral_mucosa'] = document.getElementById("oral_mucosa").value;
	// 口腔其他
	userInformation.dentalDepartment['other'] = document.getElementById("other").value;
	// 牙齿
	userInformation.dentalDepartment['tooth'] = document.getElementById("tooth").value;
	// 缺失
	userInformation.dentalDepartment['missing'] = document.getElementById("missing").value;
	// 龋齿
	userInformation.dentalDepartment['caries'] = document.getElementById("caries").value;
	// 牙周
	userInformation.dentalDepartment['periodontal'] = document.getElementById("periodontal").value;
	// 颞下颚关节
	userInformation.dentalDepartment['temporomandibular_joint'] = document.getElementById("temporomandibular_joint").value;
	// 腮腺
	userInformation.dentalDepartment['parotid'] = document.getElementById("parotid").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'dentalDepartment');
}

/**
 * 体检信息	-	乳腺远红外线-保存
 */
function ruxianyuanhongwaixian_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.breastFarInfrared == null || userInformation.breastFarInfrared == undefined) {
		userInformation.breastFarInfrared = {};
	}
	// 右乳
	userInformation.breastFarInfrared['right_breast'] = document.getElementById("right_breast").value;
	// 右乳灰影颜色
	userInformation.breastFarInfrared['right_breast_color'] = document.getElementById("right_breast_color").value;
	// 右乳灰影边界
	userInformation.breastFarInfrared['right_breast_border'] = document.getElementById("right_breast_border").value;
	// 右乳灰影位置
	userInformation.breastFarInfrared['right_breast_position'] = document.getElementById("right_breast_position").value;
	// 右乳灰影压痛
	userInformation.breastFarInfrared['right_breast_tenderness'] = document.getElementById("right_breast_tenderness").value;
	// 右乳血管
	userInformation.breastFarInfrared['right_breast_vascular'] = document.getElementById("right_breast_vascular").value;
	// 右乳头形状
	userInformation.breastFarInfrared['right_breast_shape'] = document.getElementById("right_breast_shape").value;
	// 右乳头泌液
	userInformation.breastFarInfrared['right_breast_exudate'] = document.getElementById("right_breast_exudate").value;
	// 左乳
	userInformation.breastFarInfrared['left_breast'] = document.getElementById("left_breast").value;
	// 左乳灰影颜色
	userInformation.breastFarInfrared['left_breast_color'] = document.getElementById("left_breast_color").value;
	// 左乳灰影边界
	userInformation.breastFarInfrared['left_breast_border'] = document.getElementById("left_breast_border").value;
	// 左乳灰影位置
	userInformation.breastFarInfrared['left_breast_position'] = document.getElementById("left_breast_position").value;
	// 左乳灰影压痛
	userInformation.breastFarInfrared['left_breast_tenderness'] = document.getElementById("left_breast_tenderness").value;
	// 左乳血管
	userInformation.breastFarInfrared['left_breast_vascular'] = document.getElementById("left_breast_vascular").value;
	// 左乳头形状
	userInformation.breastFarInfrared['left_breast_shape'] = document.getElementById("left_breast_shape").value;
	// 左乳头泌液
	userInformation.breastFarInfrared['left_breast_exudate'] = document.getElementById("left_breast_exudate").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'breastFarInfrared');
}
/**
 * 体检信息	-	心电图-保存
 */
function xindiantu_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.ecg == null || userInformation.ecg == undefined) {
		userInformation.ecg = {};
	}
	// 心率
	userInformation.ecg['heart_rate'] = document.getElementById("heart_rate").value;
	// 心律
	userInformation.ecg['heart_lv'] = document.getElementById("heart_lv").value;
	// P波
	userInformation.ecg['p_wave'] = document.getElementById("p_wave").value;
	// P-R周期
	userInformation.ecg['p_r_cycle'] = document.getElementById("p_r_cycle").value;
	// QRS
	userInformation.ecg['qrs'] = document.getElementById("qrs").value;
	// ST段
	userInformation.ecg['st'] = document.getElementById("st").value;
	// T波
	userInformation.ecg['t_wave'] = document.getElementById("t_wave").value;
	// 电轴
	userInformation.ecg['axis'] = document.getElementById("axis").value;
	// 节律
	userInformation.ecg['rhythm'] = document.getElementById("rhythm").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'ecg');
}
/**
 *	体检信息	-	CT-保存
 */
function ct_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.ct == null || userInformation.ct == undefined) {
		userInformation.ct = {};
	}
	// 肝
	userInformation.ct['liver'] = document.getElementById("liver").value;
	// 胆
	userInformation.ct['bravery'] = document.getElementById("bravery").value;
	// 胰
	userInformation.ct['pancreatic'] = document.getElementById("pancreatic").value;
	// 脾
	userInformation.ct['spleen'] = document.getElementById("spleen").value;
	// 双肾
	userInformation.ct['kidneys'] = document.getElementById("kidneys").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'ct');
}
/**
 *	体检信息	-	尿常规-保存
 */
function niaochanggui_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.urineRoutine == null || userInformation.urineRoutine == undefined) {
		userInformation.urineRoutine = {};
	}
	// 比重
	userInformation.urineRoutine['proportion'] = document.getElementById("proportion").value;
	// PH
	userInformation.urineRoutine['ph'] = document.getElementById("ph").value;
	// 葡萄糖
	userInformation.urineRoutine['glucose'] = document.getElementById("glucose").value;
	// 酮体
	userInformation.urineRoutine['ketone'] = document.getElementById("ketone").value;
	// 胆红素
	userInformation.urineRoutine['bilirubin'] = document.getElementById("bilirubin").value;
	// 尿胆原
	userInformation.urineRoutine['urinary_bladder'] = document.getElementById("urinary_bladder").value;
	// 潜血
	userInformation.urineRoutine['occult_blood'] = document.getElementById("occult_blood").value;
	// 尿蛋白
	userInformation.urineRoutine['urine_protein'] = document.getElementById("urine_protein").value;
	// 亚硝酸盐
	userInformation.urineRoutine['nitrite'] = document.getElementById("nitrite").value;
	// 白细胞
	userInformation.urineRoutine['white_blood_cell'] = document.getElementById("white_blood_cell").value;
	// 抗坏血栓VC
	userInformation.urineRoutine['anti_thrombosis_vc'] = document.getElementById("anti_thrombosis_vc").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'urineRoutine');
}
/**
 *	体检信息	-	血常规-保存
 */
function xuechanggui_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.routineBloodTest == null || userInformation.routineBloodTest == undefined) {
		userInformation.routineBloodTest = {};
	}
	// 白细胞
	userInformation.routineBloodTest['wbc'] = document.getElementById("wbc").value;
	// 淋巴细胞比率
	userInformation.routineBloodTest['lym_ratio'] = document.getElementById("lym_ratio").value;
	// 单核细胞比率
	userInformation.routineBloodTest['mono_ratio'] = document.getElementById("mono_ratio").value;
	// 中性粒细胞比率
	userInformation.routineBloodTest['gra_ratio'] = document.getElementById("gra_ratio").value;
	// 淋巴细胞
	userInformation.routineBloodTest['lym'] = document.getElementById("lym").value;
	// 单核细胞数
	userInformation.routineBloodTest['mono'] = document.getElementById("mono").value;
	// 中性粒细胞
	userInformation.routineBloodTest['neut'] = document.getElementById("neut").value;
	// 红细胞
	userInformation.routineBloodTest['rbc'] = document.getElementById("rbc").value;
	// 红细胞压积
	userInformation.routineBloodTest['hct'] = document.getElementById("hct").value;
	// 平均红细胞体积
	userInformation.routineBloodTest['mcv'] = document.getElementById("mcv").value;
	// 红细胞分布宽度
	userInformation.routineBloodTest['rdw_cv'] = document.getElementById("rdw_cv").value;
	// 红细胞分布宽度
	userInformation.routineBloodTest['rdw_sd'] = document.getElementById("rdw_sd").value;
	// 血红蛋白
	userInformation.routineBloodTest['hgb'] = document.getElementById("hgb").value;
	// 平均血红蛋白浓度
	userInformation.routineBloodTest['mchc'] = document.getElementById("mchc").value;
	// 平均血红蛋白含量
	userInformation.routineBloodTest['mch'] = document.getElementById("mch").value;
	// 血小板计数
	userInformation.routineBloodTest['plt'] = document.getElementById("plt").value;
	// 平均血小板体积
	userInformation.routineBloodTest['mpv'] = document.getElementById("mpv").value;
	// 血小板压积
	userInformation.routineBloodTest['pct'] = document.getElementById("pct").value;
	// 血小板平均宽度
	userInformation.routineBloodTest['pdw'] = document.getElementById("pdw").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'routineBloodTest');
}
/**
 *	体检信息	-	血脂类-保存
 */
function xuezhilei_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.lipidClass == null || userInformation.lipidClass == undefined) {
		userInformation.lipidClass = {};
	}
	// 总胆固醇
	userInformation.lipidClass['total_cholesterol'] = document.getElementById("total_cholesterol").value;
	// 甘油三酯
	userInformation.lipidClass['triglyceride'] = document.getElementById("triglyceride").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'lipidClass');
}
/**
 *	体检信息	-	血糖类-保存
 */
function xuetanglei_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.bloodGlucose == null || userInformation.bloodGlucose == undefined) {
		userInformation.bloodGlucose = {};
	}
	userInformation.bloodGlucose['fasting_blood_glucose'] = document.getElementById("fasting_blood_glucose").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'bloodGlucose');
}
/**
 *	体检信息	-	肝胆功能保存
 */
function gandangongneng_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.liverAndGallbladder == null || userInformation.liverAndGallbladder == undefined) {
		userInformation.liverAndGallbladder = {};
	}
	// 谷丙转氨酶
	userInformation.liverAndGallbladder['alanine_aminotransferase'] = document.getElementById("alanine_aminotransferase").value;
	// 谷草转氨酶
	userInformation.liverAndGallbladder['ast'] = document.getElementById("ast").value;
	// AST/ALT
	userInformation.liverAndGallbladder['ast_alt'] = document.getElementById("ast_alt").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'liverAndGallbladder');
}
/**
 *	体检信息	-	肾功能保存
 */
function shengongneng_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.renalFunction == null || userInformation.renalFunction == undefined) {
		userInformation.renalFunction = {};
	}
	//肌酐
	userInformation.renalFunction['creatinine'] = document.getElementById("creatinine").value;
	//尿酸
	userInformation.renalFunction['uric_acid'] = document.getElementById("uric_acid").value;
	//尿素氮
	userInformation.renalFunction['urea_nitrogen'] = document.getElementById("urea_nitrogen").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'renalFunction');
}
/**
 *	体检信息	-	肿瘤标志物保存
 */
function zhongliubiaozhi_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.tumorMarker == null || userInformation.tumorMarker == undefined) {
		userInformation.tumorMarker = {};
	}
	// 癌胚抗原
	userInformation.tumorMarker['cea'] = document.getElementById("cea").value;
	// 甲胎蛋白
	userInformation.tumorMarker['afp'] = document.getElementById("afp").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'tumorMarker');
}
/**
 *	体检信息	-	X光保存
 */
function xray_saveInfo() {
	var user = getUser();
	var userInformation = getUserInformation(user.appid);
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) { //设置中提交到服务器并且判断网络是否正常
		plus.nativeUI.toast('网络异常，请检查网络设置！');
		return false;
	}
	if(userInformation.xray == null || userInformation.xray == undefined) {
		userInformation.xray = {};
	}
	// 双肾
	userInformation.xray['chest_fluoroscopy'] = document.getElementById("chest_fluoroscopy").value;
	//体验信息通用提交
	saveInfoAjax(user, userInformation, 'xray');
}
/**
 * 体验信息通用提交
 */
function saveInfoAjax(user, userInformation, checktype) {
	userInformation[checktype]['appid'] = user.appid;
	saveUserInformation(user.appid, userInformation);
	asyncResultSubmit(checktype, userInformation[checktype]);
	plus.nativeUI.toast('保存完成！');
	reback(true);
}
/*
 * 返回填写	或	继续提交
 */
function confirm_submit() {
	var btnArray, _index;
	if("Android".indexOf(plus.os.name) != -1) {
		btnArray = ['继续提交', '返回填写'];
		_index = 0;
	} else {
		btnArray = ['返回填写', '继续提交'];
		_index = 1;
	}
	mui.confirm('信息完整会给您带来更加完美的体验', '温馨提示', btnArray, function(e) {
		if(e.index == _index) {
			//等于空时去服务器查询是否有数据
			if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
				plus.nativeUI.toast('网络异常，请检查网络设置！');
				return false;
			}
			var w = plus.ui.createWaiting("提交中...");
			var user = getUser();
			var userInformation = getUserInformation(user.appid);
			userInformation.appid = user.appid;
			userInformation.iscomplete = "yes";
			//修改完成保存
			saveUserInformation(user.appid, userInformation);
			mui.ajax(ADDR + USERINFORMATION, {
				data: {
					jsonStr: JSON.stringify(userInformation),
					ishealthRing: "yes",
					appid: user.appid,
					city: localStorage.getItem('areaPosition') || "北京"
				},
				dataType: 'json', //服务器返回json格式数据
				timeout: 60000,
				type: 'post', //HTTP请求类型
				success: function(data) {
					if(data.success) {
						w.close();
						//我的健康环
						var myHealthRing = data.obj.myHealthRing;
						var json = {};
						for(var key in myHealthRing) {
							json[key] = myHealthRing[key];
						}
						//本地存储
						saveHealthRing(user.appid, json);
						//习惯
						var hbbit = data.obj.hbbit;
						//本地存储
						saveMyhabit(hbbit);
						jumpPage('../main.html', "slide-in-right", {}, false);
					}
				},
				error: function() {
					w.close();
					plus.nativeUI.toast('服务异常，请稍候重试...');
				}
			});
		}
	});
}

// 填完体检信息，获取用户基本信息和健康环的数据
function getHealthRingData(userInformation, user, w) {
	var appid = user.appid;
	mui.ajax(ADDR + GETHEALTHRINGDATA, {
		data: {
			"appid": appid
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 60000, //超时时间设置为60秒；
		success: function(data) {
			if(data.success) {
				w.close();
				//我的健康环
				var myHealthRing = data.obj.myHealthRing;
				var json = {};
				for(var key in myHealthRing) {
					json[key] = myHealthRing[key];
				}
				//本地存储
				saveHealthRing(appid, json);
				if(userInformation.sex == 0) {
					jumpPage("../givebirthinformation/bear_choose.html", "slide-in-right", {}, false);
				} else {
					jumpPage('../emotion/emotion_list.html', "slide-in-right", {}, false);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			plus.nativeUI.toast('服务器出现异常，请重试');
		}
	});
}

///////////////////////病史，过敏史，生活习惯/////////////////////////////
//病史，过敏史，生活习惯数据加载
function fun_data(data, name) {
	var fragment = document.createDocumentFragment();
	for(var i = 0; i < data.length; i++) {
		var li = document.createElement('div');
		li.className = 'mui-input-row mui-checkbox';
		li.innerHTML = '<label>' + data[i] + '</label><input name="' + name + '" value="' + data[i] + '" type="checkbox">';
		fragment.appendChild(li);
	}
	return fragment;
};
//病史，过敏史，生活习惯数据赋值
function fun_assignment(documents, values) {
	if(values != undefined && values != null) {
		var arr = values.split(",");
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < documents.length; j++) {
				if(arr[i] == documents[j].value) {
					documents[j].setAttribute("checked");
				}
			}
		}
	}
};
//病史，过敏史，生活习惯获取数据
function fun_get_data(data) {
	var temp = "";
	for(var i = 0; i < data.length; i++) {
		if(data[i].checked) {
			if("" == temp) {
				temp = data[i].value;
			} else {
				temp += "," + data[i].value;
			}
		}
	}
	return temp;
}