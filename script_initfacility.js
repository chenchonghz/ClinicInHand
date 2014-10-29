// script_initfacility.js

var facilityOpt = require('./models/facilityOpt');

var dummyfacility = new Object();

// dummyfacility.name = '上海瑞金医院';
// dummyfacility.grade = 'grade3';
// dummyfacility.addr = '上海市卢湾区瑞金二路197号';
// dummyfacility.tel = '021-64370045';
// dummyfacility.email = '';
// dummyfacility.type = 'general';
// dummyfacility.website = 'http://www.rjh.com.cn';
// dummyfacility.weibo = '';
// dummyfacility.weixin = '';
// dummyfacility.des = '上海交通大学医学院附属瑞金医院(上海瑞金医院)建于1907年，原名广慈医院，是一所三级甲等大型综合性教学医院。医院占地面积12万平方米，建筑面积24.5万平方米，绿化面积4万平方米，核定床位1600张，全院职工3445人，其中医师1010余人(其中正副教授及各类高级科技人员593人)。拥有中国科学院院士陈竺、中国工程院院士王振义、陈赛娟等一大批在国内外享有较高知名度的医学专家。医院设有34个临床科室、9个医技科室;现有国家教育部重点学科3个(内分泌、血液、消化)，上海市重中之重学科1个(血液)，上海市重点学科1个(内分泌)，上海市优势学科一个(肾脏)，上海市教委重点学科6个(消化外科、血液科、内分泌科、骨科、烧伤科、心脏内科)，上海市卫生局医学领先专业重点学科3个(消化外科、血液科、肾脏内科)。医院还有6个市级研究所(上海市伤骨科研究所、上海市高血压研究所、上海市内分泌研究所 、上海烧伤研究所、上海血液学研究所、上海消化外科研究所)，2个校级研究所(上海交通大学医学院神经病学研究所、上海交通大学心血管病研究所)，1个院级研究所(感染病与呼吸病研究所)，8个校级研究室，3个院级实验室。此外，还建立了国家重点实验室和教育部重点实验室各1个(医学基因组学重点实验室)，2个卫生部重点实验室(人类基因组重点实验室、内分泌代谢重点实验室)，4个上海市重点实验室(人类基因组研究重点实验室、血管生物学重点实验室、中西医防治骨关节病损重点实验室、内分泌肿瘤重点实验室)。并通过整合上述科研力量，建立了附属瑞金医院生物医学研究院。同时，还建有与临床诊疗密切结合的一些中心，包括分子医学中心、糖尿病研究中心、血栓与止血研究中心、血液病诊治中心、基因诊断中心、眼科中心、青少年生长发育中心、介入治疗中心、生殖医学中心等。另外上海市卫生局有4个质量控制中心(康复、骨科、心脏介入、血液)挂靠在瑞金医院。瑞金医院于20世纪50年代成功抢救邱财康后，大面积烧伤治疗始终处于世界先进水平;70年代在国内率先开展了心脏和肝脏的移植手术;90年代在白血病分子生物学研究和临床医疗领域取得了重大进展;21世纪日臻完善的器官移植，使得许多病人将这里视为生命的绿洲。为此，医院获得了全国卫生系统先进集体(6次)、全国百佳医院;全国创建文明行业先进集体、全国卫生系统先进思想政治工作研究会;上海市文明单位(9次);全国模范职工之家;全国青年文明号、全国“五四”红旗团组织创建单位等。瑞金医院以所取得的成就和荣誉为动力，为了进一步适应市场需求，医院积极开展高精尖诊疗技术，如微创伤手术、关节镜手术、心血管介入治疗、眼科准分子激光术等，并充分利用医院综合医疗优势，实行多学科或跨学科联合会诊制，使医疗诊治水平日益提高。同时医院还将发展目标定位在研究型医院上，借助医院9个市级研究所，医院在肾脏内科、消化内科、内分泌、高血压、中医伤科、急性坏死性胰腺炎、生殖医学等学科中颇具特色，特别是国家重点研究所的科研优势，立足临床加大科研力度，为人民健康创造出了许多临床新成果。医院还不断深化人性化服务，推出了“以优质的医疗使病人放心、以一流的服务使病人称心、以优美的环境使病人舒心”的“三心工程”，以温馨、便捷、优质、高效的服务赢得了社会和病家的信任，促进了医院两个文明建设的发展。瑞金医院是上海交通大学医学院最大的临床教学基地，“瑞金临床医学院”也设在医院中，承担医学系、检验系、高级护理系的临床教学任务，并接受上海交通大学医学院夜大学、高级医师进修班及来自全国各地医院的进修学员的临床教学任务。近年来，瑞金医院获得各类科研项目300余项，包括国家自然科学基金重大项目、重点项目、面上项目、国家科委863项目、S863项目、973项目、攀登计划、国家八五攻关项目、九五攻关项目、卫生部科研项目、国家教委留学生基金项目、上海市级科研项目等重大项目。医院现有硕士生点29个、博士生点22个，具有招生资格的博士生导师66名、具有招生资格的硕士生导师84名，内、外科均为博士后流动站。医院的科研技术人才在国家杰出人才基金、国家教委跨世纪人才培养基金、上海市启明星计划、启明星后计划、上海市曙光计划、上海市卫生系统百名跨世纪优秀学科带头人计划中占有较重比例。还获得一系列有很高含金量的国际奖项，如：美国灼伤协会伊文思奖，意大利惠特克国际烧伤奖，美国凯特林癌症奖，瑞士布鲁巴赫癌症研究奖，法国卢瓦茨奖和祺诺台杜加奖，以及香港何梁何利基金技术奖等。为了引进先进的技术和设备，瑞金医院还积极开展对外交流与协作，与法国、美国、英国、加拿大、比利时、日本、澳大利亚等国家和香港、台湾、世界卫生组织等地区和组织有着广泛的联系，并建立了多项科研合作。 1999年8月4日，为了贯彻落实国家卫生改革工作的精神，探索市场经济条件下医院发展的新模式，实现“以比较低廉的价格提供比较优质服务”的宗旨，瑞金医院率先与部分医疗机构实行资产重组，建立了上海瑞金医院集团，初步实现了跨地区、跨行业、跨级别、跨部门医疗资源的重组，使以瑞金医院为核心的区域医疗卫生中心逐步形成。多年来，瑞金医院与集团下属的医院分部、卢湾分院、闵行医院和台州中心医院都取得了明显的经济效益和社会效益。 2002年10月25日，瑞金医院在科研工作模式的探索上又迈出了坚实的一步，在国内开创性的成立了“生物医学研究院”。从而形成了“大科研”的新格局，实现科研体制、用人机制和科学研究等的全面创新。该研究院以瑞金医院的研究力量为主，联合中国科学院上海生命科学研究院、原上海第二医科大学健康科学中心、国家人类基因组南方中心等科研单位，是我国第一个以医院为主体的、将生命科学与临床医学紧密结合的研究与开发机构。研究院所奉行的“但求所用，不求所有”的用人原则，真正实现了人才的“柔性流动”，使更多科研人员有了施展才华的舞台和空间。 2010年瑞金医院门急诊人次达270.6万，手术例数达4.12万次，出院病人7.6万人次，平均住院天数为8.68天。';


dummyfacility.name = '复旦大学附属华山医院';
dummyfacility.grade = 'grade3';
dummyfacility.addr = '上海市静安区乌鲁木齐中路12号';
dummyfacility.tel = '021-52889999';
dummyfacility.email = '';
dummyfacility.type = 'general';
dummyfacility.website = 'http://huashan.org.cn/';
dummyfacility.weibo = '';
dummyfacility.weixin = '';
dummyfacility.des = '复旦大学附属华山医院是卫生部直属复旦大学（原上海医科大学）附属的一所综合性教学医院。建院于1907年，前身是中国红十字会总院，是上海地区中国人最早创办的医院，1991年重新恢复为中国红十字会直属医院。1992年首批通过国家三级甲等医院评审，目前已成为一所国家高层次的医疗机构，并为全国医疗、预防、教学、科研相结合的技术中心，在国内外 享有较高的声誉。 华山医院医疗技术力量雄厚，全院近1800名职工之中，医疗专业技术人员占80％，其中副高职以上专家教授290人，博士点10个，博士生导师39名，中国科学院院士、中国工程院院士各1名，开通博士后流动站2个；硕士点19个，硕士生导师79名。许多专家教授在国内外享有较高知名度。还有一整套行之有效的管理体制和管理人才。';



facilityOpt.create(dummyfacility, function(data){
	console.log(JSON.stringify(data));
});

dummyfacility.name = '曙光东院';
dummyfacility.grade = 'grade3';
dummyfacility.addr = '上海市张衡路528';
dummyfacility.tel = '021-20256117';
dummyfacility.email = '';
dummyfacility.type = 'general';
dummyfacility.website = 'http://www.scmc.com.cn';
dummyfacility.weibo = '';
dummyfacility.weixin = '';
dummyfacility.des = '上海中医药大学附属曙光医院是一所沪上的百年老院，三级甲等综合性中医院、位列上海十大综合性医院之一、全国示范中医院。1984—2008年十三次蝉联“上海市文明单位”称号；1999年荣获卫生部“全国百佳医院”称号；2004年第三次获得“全国卫生系统先进集体”荣誉；2005年被评为全国精神文明建设工作先进单位；2008年、2009年两次获得全国医院文化建设先进单位称号；2009年获得了“上海市迎世博优质服务贡献奖”。2001年成为全国首家通过ISO9001质量管理体系认证的中医医院。';

facilityOpt.create(dummyfacility, function(data){
	console.log(JSON.stringify(data));
	facilityOpt.listAll(function(err, reply){
		var first = JSON.parse(reply[0]);
		console.log( first.fid );
		console.log( first.name );
		process.exit(0);
	});
});