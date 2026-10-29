import { HighRiskType, UserPersona, WorkPermit } from '../types';

export const BANFERT_OFFICIAL_LOGO = '/assets/aistudio/______1_9987d73f.jpg';
export const BANFERT_PLANT_IMAGE = '/src/assets/images/banfert_industrial_plant_1793265863464.jpg';
export const SUDALAK_AVATAR = '/src/assets/images/avatar_safety_officer_sudalak_1793265862984.jpg';

export const LAST_ACCIDENT_DATE = new Date('2026-08-17');

export const FACILITY_ZONES_SUGGESTIONS = [
  'Building A - Line 1 High-Precision Coating',
  'Building A - Cleanroom Assembly 02 (ISO Class 7)',
  'Building B - Chemical Reactor Tank Farm North',
  'Building B - High-Pressure Steam Boiler Room #1',
  'Building C - Raw Material High-Bay Warehouse Bay 04',
  'Building C - Final Quality Inspection Lab',
  'Facility Perimeter - 115kV High Voltage Substation #2',
  'Underground Effluent Treatment Plant (ETP Tank #3)',
  'Paint Workshop 4 - Spray Booth 03 Flange Line',
  'Rooftop Section - Solar PV Array & HVAC Chiller Matrix',
];

export const PPE_OPTIONS = [
  { id: 'ppe_helmet', label: { TH: 'หมวกนิรภัย (Safety Helmet)', ZH: '安全帽 (Safety Helmet)', EN: 'Safety Helmet', MY: 'လုံခြုံရေးဦးထုပ်' } },
  { id: 'ppe_glasses', label: { TH: 'แว่นตานิรภัย (Safety Glasses)', ZH: '护目镜 (Safety Glasses)', EN: 'Safety Glasses', MY: 'မျက်မှန်' } },
  { id: 'ppe_shoes', label: { TH: 'รองเท้านิรภัยหัวเหล็ก (Safety Boots)', ZH: '防砸安全鞋 (Safety Boots)', EN: 'Safety Boots', MY: 'လုံခြုံရေးဖိနပ်' } },
  { id: 'ppe_vest', label: { TH: 'เสื้อกั๊กสะท้อนแสง (High-Vis Vest)', ZH: '反光背心 (High-Vis Vest)', EN: 'High-Vis Vest', MY: 'ရောင်ပြန်အင်္ကျီ' } },
  { id: 'ppe_harness', label: { TH: 'เข็มขัดนิรภัยเต็มตัว (Full Body Harness)', ZH: '五点双钩安全带 (Harness)', EN: 'Full Body Harness', MY: 'ခါးပတ်ကြိုး' } },
  { id: 'ppe_welding_mask', label: { TH: 'หน้ากากเชื่อม/ตัด (Welding Mask)', ZH: '电焊防护面罩 (Welding Mask)', EN: 'Welding Face Shield', MY: 'ဂဟေဆော်မျက်နှာဖုံး' } },
  { id: 'ppe_respirator', label: { TH: 'หน้ากากป้องกันสารเคมี (Chemical Respirator)', ZH: '防毒防尘面具 (Respirator)', EN: 'Chemical Respirator', MY: 'ဓာတုအဆိပ်ကာမျက်နှာဖုံး' } },
  { id: 'ppe_gloves', label: { TH: 'ถุงมือหนัง/กันบาด (Leather/Cut Gloves)', ZH: '防割/耐磨手套 (Gloves)', EN: 'Cut-Resistant Gloves', MY: 'လက်အိတ်' } },
  { id: 'ppe_earplugs', label: { TH: 'อุปกรณ์ลดเสียง (Ear Plugs / Muffs)', ZH: '防噪音耳塞 (Ear Protection)', EN: 'Hearing Protection', MY: 'အသံထိန်းနားကြပ်' } },
  { id: 'ppe_chemical_suit', label: { TH: 'ชุดป้องกันสารเคมี (Chemical Apron/Suit)', ZH: '防化服/防酸围裙 (Chemical Suit)', EN: 'Chemical Splash Suit', MY: 'ဓာတုကာကွယ်ဝတ်စုံ' } },
];

export const RISK_SPECIFIC_CHECKLISTS: Record<HighRiskType, { id: string; text: { TH: string; ZH: string; EN: string; MY: string } }[]> = {
  HOT_WORK: [
    {
      id: 'hw_1',
      text: {
        TH: 'ย้ายวัสดุติดไฟในรัศมี 10 เมตร หรือคลุมด้วยผ้ากันไฟ (Fire Blanket)',
        ZH: '作业点半径 10 米内易燃易爆物已彻底清除或使用防火毯密封隔离',
        EN: 'Combustible materials cleared within 10m radius or covered with fire blankets',
        MY: '၁၀ မီတာအတွင်း မီးလောင်လွယ်သောပစ္စည်းများကို ဖယ်ရှားထားပါသည်',
      },
    },
    {
      id: 'hw_2',
      text: {
        TH: 'จัดเตรียมถังดับเพลิงชนิดพร้อมใช้งาน (CO2 / Dry Chemical) อย่างน้อย 2 ถัง',
        ZH: '现场已就位至少 2 具检测合格并在有效期的灭火器 (干粉/二氧化碳)',
        EN: 'At least 2 certified fire extinguishers stationed adjacent to hot work area',
        MY: 'မီးသတ်ဆေးဘူး အနည်းဆုံး ၂ ဘူး အဆင်သင့်ထားရှိပါသည်',
      },
    },
    {
      id: 'hw_3',
      text: {
        TH: 'ตรวจวัดระดับก๊าซไวไฟ (LEL < 10%) ก่อนจุดไฟ และมีเจ้าหน้าที่เฝ้าระวังอัคคีภัย',
        ZH: '动火前已完成可燃气体检测 (LEL < 10%)，并委派专职动火监护人 (Fire Watch)',
        EN: 'Atmospheric combustible gas tested (LEL < 10%) and dedicated Fire Watch appointed',
        MY: 'ဓာတ်ငွေ့စစ်ဆေးပြီး မီးဘေးစောင့်ကြပ်သူ တာဝန်ပေးထားပါသည်',
      },
    },
  ],
  WORKING_AT_HEIGHT: [
    {
      id: 'wah_1',
      text: {
        TH: 'สวมใส่ Full Body Harness แบบตะขอคู่ และเกี่ยวคล้องกับจุดยึดที่ผ่านการรับรอง 100%',
        ZH: '作业人员全程 100% 挂接五点式双大钩安全带，挂钩高挂低用',
        EN: 'Full body harness with dual lanyards attached 100% to certified anchor point',
        MY: 'ခါးပတ်ကြိုးကို ၁၀၀% စနစ်တကျ ချိတ်ဆွဲထားပါသည်',
      },
    },
    {
      id: 'wah_2',
      text: {
        TH: 'นั่งร้านผ่านการตรวจรับรองและติดป้ายสีเขียว (Green Scafftag) พร้อมแผ่นกันตก (Toe Board)',
        ZH: '脚手架已通过安全合格验收并张贴绿色安全标牌 (Scafftag)，配备踢脚板与双层护栏',
        EN: 'Scaffolding inspected with valid Green Scafftag, toe-boards and double guardrails',
        MY: 'ငြမ်းစင်ကို အစိမ်းရောင်ကတ်ပြားဖြင့် စစ်ဆေးအတည်ပြုထားပါသည်',
      },
    },
    {
      id: 'wah_3',
      text: {
        TH: 'กั้นแนวเขตเตือนภัยด้านล่างและติดตั้งตาข่ายกันสิ่งของตกหล่น',
        ZH: '地面坠落半径内已设置警示警戒线，安装防坠安全兜网',
        EN: 'Drop zone barricaded below with safety debris netting installed',
        MY: 'အောက်ဘက်တွင် အန္တရာယ်ရှိသော ဧရိယာအဖြစ် သတ်မှတ်ကန့်သတ်ထားပါသည်',
      },
    },
  ],
  CONFINED_SPACE: [
    {
      id: 'cs_1',
      text: {
        TH: 'เปิดฝาระบายอากาศและเป่าลมบริสุทธิ์แบบบังคับ (Forced Ventilation) อย่างน้อย 30 นาที',
        ZH: '进入前已对受限空间强制通风置换至少 30 分钟，作业全程持续强制送风',
        EN: 'Forced mechanical ventilation operated for >= 30 mins and sustained throughout work',
        MY: 'လေဝင်လေထွက်စက်ကို မိနစ် ၃၀ ကြာ မောင်းနှင်ထားပါသည်',
      },
    },
    {
      id: 'cs_2',
      text: {
        TH: 'ตรวจวัดก๊าซ 4 ชนิด (O2: 19.5-23.5%, LEL < 10%, H2S < 10ppm, CO < 25ppm) ผลผ่านเกณฑ์',
        ZH: '四合一气体连续检测合格 (氧气 19.5-23.5%, LEL < 10%, H2S < 10ppm, CO < 25ppm)',
        EN: 'Multi-gas test verified: O2 (19.5-23.5%), LEL < 10%, H2S < 10ppm, CO < 25ppm',
        MY: 'ဓာတ်ငွေ့ ၄ မျိုးစစ်ဆေးမှု စံချိန်စံညွှန်းပြည့်မီပါသည်',
      },
    },
    {
      id: 'cs_3',
      text: {
        TH: 'จัดผู้ช่วยเหลือ (Standby Attendant) ประจำปากทางเข้า พร้อมขาหยั่งกู้ภัย Tripod และรอกฉุกเฉิน',
        ZH: '入口处设置专职监护人，现场配备三脚架救援提升装置及防爆照明 (<= 24V)',
        EN: 'Standby rescuer stationed at entrance with rescue tripod, harness winch and 24V lights',
        MY: 'အရေးပေါ်ကယ်ဆယ်ရေးပစ္စည်းများနှင့် အစောင့်တာဝန်ချထားပါသည်',
      },
    },
  ],
  ELECTRICAL_WORK: [
    {
      id: 'el_1',
      text: {
        TH: 'ตัดแยกวงจรและใส่กุญแจคล้องพร้อมป้ายเตือน Lockout / Tagout (LOTO) ทุกจุดกำเนิดไฟ',
        ZH: '已对所有电源进线执行上锁挂牌 (LOTO) 能量隔离程序，钥匙由作业负责人专管',
        EN: 'Energy isolated with padlocks and tags applied under Lockout/Tagout (LOTO)',
        MY: 'လျှပ်စစ်ဖြတ်တောက်ပြီး သော့ခတ်သတိပေးဆိုင်းဘုတ် ချိတ်ဆွဲထားပါသည်',
      },
    },
    {
      id: 'el_2',
      text: {
        TH: 'ตรวจสอบแรงดันไฟฟ้าเป็นศูนย์ (Zero Voltage Verification) ด้วยเครื่องตรวจวัดที่ได้มาตรฐาน',
        ZH: '使用校验合格的高压验电器执行验电，确认系统处于零电压状态',
        EN: 'Zero voltage verification conducted and certified before contact',
        MY: 'ဗို့အားလုံးဝမရှိကြောင်း စစ်ဆေးအတည်ပြုပြီးဖြစ်ပါသည်',
      },
    },
    {
      id: 'el_3',
      text: {
        TH: 'ใช้เครื่องมือหุ้มฉนวน 1,000V และสวมถุงมือยางฉนวนไฟฟ้าชั้น 0 ตามระดับความปลอดภัย',
        ZH: '使用 1000V 绝缘手动工具，穿戴耐高压绝缘鞋及绝缘手套',
        EN: '1,000V rated insulated hand tools, dielectric mat and rated gloves deployed',
        MY: '၁၀၀၀ ဗို့ခံနိုင်သော လျှပ်ကာပစ္စည်းများကို အသုံးပြုထားပါသည်',
      },
    },
  ],
  CHEMICAL_HANDLING: [
    {
      id: 'ch_1',
      text: {
        TH: 'ตรวจสอบเอกสารข้อมูลความปลอดภัยสารเคมี (SDS) และทำความเข้าใจข้อปฏิบัติกรณีสัมผัส',
        ZH: '现场已备查中英泰三语 SDS 安全数据技术说明书，全员掌握泄漏应急处置步骤',
        EN: 'Safety Data Sheet (SDS) reviewed and emergency neutralization steps established',
        MY: 'ဓာတုပစ္စည်းဘေးကင်းရေးအချက်အလက် (SDS) ကို စစ်ဆေးဖတ်ရှုထားပါသည်',
      },
    },
    {
      id: 'ch_2',
      text: {
        TH: 'ทดสอบการทำงานของอ่างล้างตาฉุกเฉิน (Eyewash) และฝักบัวชำระร่างกายฉุกเฉินในรัศมี 15 เมตร',
        ZH: '作业点 15 米内洗眼器与紧急喷淋装置经放水测试正常，通道无阻碍',
        EN: 'Emergency eyewash and safety shower within 15 meters tested and clear of obstacles',
        MY: 'အရေးပေါ်မျက်စိဆေးကန် ကောင်းမွန်စွာအလုပ်လုပ်ကြောင်း စစ်ဆေးပြီးပါသည်',
      },
    },
    {
      id: 'ch_3',
      text: {
        TH: 'จัดเตรียมชุดดูดซับสารเคมีหก (Chemical Spill Kit) และถาดรองรับการรั่วไหล (Spill Bund)',
        ZH: '备置防化吸附棉条及中和剂 Spill Kit，设备下方放置二次防溢流托盘',
        EN: 'Chemical spill kit with absorbent pads stationed with secondary containment tray',
        MY: 'ဓာတုပစ္စည်းယိုဖိတ်မှုထိန်းချုပ်ရေးပစ္စည်းများ အဆင်သင့်ထားရှိပါသည်',
      },
    },
  ],
  EXCAVATION: [
    {
      id: 'ex_1',
      text: {
        TH: 'สแกนตรวจสอบท่อก๊าซ สายเคเบิลแรงสูง และท่อน้ำใต้ดินด้วยเครื่อง Cable Locator',
        ZH: '使用地下管线探测仪对作业区域进行无损探测，核对地下综合管网蓝图',
        EN: 'Underground cables, gas and water utilities scanned with certified detector',
        MY: 'မြေအောက်ကြိုးလိုင်းများကို စက်ဖြင့်စစ်ဆေးရှာဖွေထားပါသည်',
      },
    },
    {
      id: 'ex_2',
      text: {
        TH: 'ความลึกเกิน 1.2 เมตร ต้องติดตั้งค้ำยัน (Shoring) หรือขุดเปิดหน้าดินลาดเอียง 45 องศา',
        ZH: '沟槽开挖深度超过 1.2 米已加装液压钢支撑或按 1:1 放坡，严防塌方',
        EN: 'Trenching depth > 1.2m secured with structural shoring or safe 45-degree angle slope',
        MY: 'ကျင်းအနက် ၁.၂ မီတာကျော်ပါက မြေပြိုမှုကာကွယ်ရေးကန့်လန့်ကာ တပ်ဆင်ထားပါသည်',
      },
    },
    {
      id: 'ex_3',
      text: {
        TH: 'จัดบันไดหนีภัยทุกระยะไม่เกิน 7.5 เมตร และกันรถบรรทุก/เครื่องจักรห่างขอบบ่ออย่างน้อย 2 ม.',
        ZH: '沟槽内每隔 7.5 米设置安全逃生梯，重型机械停放距沟槽边缘 >= 2 米',
        EN: 'Egress ladders placed every 7.5m; heavy plant machinery kept >= 2m from trench edge',
        MY: 'လှေကားများကို ၇.၅ မီတာခြားစီထားရှိပြီး စက်ယန္တရားများကို အကွာတွင်ထားပါသည်',
      },
    },
  ],
  LIFTING: [
    {
      id: 'lf_1',
      text: {
        TH: 'ปั้นจั่น/เครน มีใบรับรองการตรวจทดสอบประจำปี (คป.1) และพนักงานขับมีใบอนุญาตถูกต้อง',
        ZH: '起重机械特种设备年检合格报告及起重机司机/指挥司索工特种作业操作证齐全有效',
        EN: 'Crane certification (Por.Jor.1 / ISO) verified with certified crane operator license',
        MY: 'ကရိန်းစက်လက်မှတ်နှင့် ယာဉ်မောင်းလိုင်စင် မှန်ကန်ကြောင်း စစ်ဆေးပြီးပါသည်',
      },
    },
    {
      id: 'lf_2',
      text: {
        TH: 'ตรวจสอบสภาพสลิง ผ้าใบยก และสะเก็น (Shackles) ปราศจากการฉีกขาดหรือบิดงอ',
        ZH: '吊带、钢丝绳、卸扣经色标检查无磨损断丝变形，起吊重量未超过额定负荷 80%',
        EN: 'Rigging gear (slings, wire ropes, shackles) inspected and load <= 80% rated capacity',
        MY: 'မချီမီ ကြိုးများနှင့် တွယ်ဆက်ပစ္စည်းများကို သေချာစစ်ဆေးထားပါသည်',
      },
    },
    {
      id: 'lf_3',
      text: {
        TH: 'กั้นแนวเขตห้ามบุคคลภายนอกเข้าในรัศมีการยก (Swing Radius) ตลอดการทำงาน',
        ZH: '吊臂回转半径范围内已设置封闭警戒区域，严禁任何人站在吊物下方',
        EN: 'Swing radius barricaded with warning tape; zero personnel permitted under suspended load',
        MY: 'ဝန်ချီတင်သည့်နေရာတစ်ဝိုက်တွင် လူမဝင်ရနယ်မြေအဖြစ် ကန့်သတ်ထားပါသည်',
      },
    },
  ],
  COLD_WORK: [
    {
      id: 'cw_1',
      text: {
        TH: 'ปลดปล่อยแรงดันตกค้างในท่อและถ่ายของเหลวก่อนเริ่มถอดประกอบชิ้นส่วน',
        ZH: '管线及设备已彻底泄压、排净余料，并进行机械锁闭',
        EN: 'Internal line pressure bled and liquids drained prior to mechanical disassembly',
        MY: 'ပိုက်လိုင်းအတွင်း ဖိအားများကို လျှော့ချပြီးမှ စတင်လုပ်ကိုင်ပါသည်',
      },
    },
    {
      id: 'cw_2',
      text: {
        TH: 'ติดตั้งแผงกั้นพื้นที่และตรวจระวังจุดหนีบ (Pinch Point) ขณะใช้เครื่องมือกล',
        ZH: '作业区域设立防护隔离挡板，操作手持电动工具注意防夹手防卷入',
        EN: 'Guard barriers installed and pinch-point pinch hazard awareness communicated',
        MY: 'လက်ညှပ်နိုင်သော အန္တရာယ်များကို သတိထားကာ အကာအကွယ်တပ်ဆင်ထားပါသည်',
      },
    },
  ],
};

export const USER_PERSONAS: UserPersona[] = [
  {
    id: 'persona_sudalak',
    name: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
    nameDisplay: {
      TH: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
      ZH: 'Sudalak P. (注册安全总监)',
      EN: 'Ms. Sudalak Phimphan (Sudalak P.)',
      MY: 'Ms. Sudalak Phimphan (ဘေးကင်းရေးအရာရှိ)',
    },
    title: 'Certified Safety Officer (จป.วิชาชีพ)',
    role: 'SAFETY_OFFICER',
    email: '23252sudalak@gmail.com',
    department: 'Apex Industrial Safety Dept. / Banfert New Material (Thailand) Co.,Ltd.',
    avatarUrl: SUDALAK_AVATAR,
    channel: 'INTERNAL',
    channelLabel: 'จป.วิชาชีพ หลักของระบบ (Lead Approver)',
  },
  {
    id: 'persona_somchai',
    name: 'นายสมชาย คำดี (Somchai K.)',
    nameDisplay: {
      TH: 'นายสมชาย คำดี (ผู้รับเหมาโครงสร้าง)',
      ZH: '宋柴 (结构工程承包商负责人)',
      EN: 'Mr. Somchai Khamdee (Lead Contractor)',
      MY: 'ဦးစံချိုင်း (ကန်ထရိုက်တာခေါင်းဆောင်)',
    },
    title: 'Lead Contractor / Welding Supervisor',
    role: 'CONTRACTOR',
    email: 'somchai.contractor@thaimech.co.th',
    department: 'Thai Mech & Piping Engineering Ltd.',
    avatarUrl: '',
    channel: 'LINE',
    channelLabel: 'LINE Notify SSO Login',
  },
  {
    id: 'persona_kraingkrai',
    name: 'วิศวกรเกรียงไกร ชัยชนะ (Kraingkrai W.)',
    nameDisplay: {
      TH: 'วิศวกรเกรียงไกร ชัยชนะ (วิศวกรซ่อมบำรุง)',
      ZH: '克莱克莱 工程师 (机电维保主管)',
      EN: 'Eng. Kraingkrai Chaichana (Plant Engineer)',
      MY: 'အင်ဂျင်နီယာ ခရိုင်ခရိုင် (စက်ပြင်အင်ဂျင်နီယာ)',
    },
    title: 'Plant Maintenance Lead Engineer',
    role: 'ENGINEER',
    email: 'kraingkrai.w@banfert.com',
    department: 'Facility & Electrical Engineering',
    avatarUrl: '',
    channel: 'WECHAT',
    channelLabel: 'WeChat Work SSO Login',
  },
  {
    id: 'persona_siriporn',
    name: 'ดร.สิริพร มโนรมย์ (Dr. Siriporn M.)',
    nameDisplay: {
      TH: 'ดร.สิริพร มโนรมย์ (ผู้อำนวยการโรงงาน)',
      ZH: '斯里蓬 博士 (工厂运营总监)',
      EN: 'Dr. Siriporn Manorom (Plant Director)',
      MY: 'ဒေါက်တာသီရိပွန် (စက်ရုံညွှန်ကြားရေးမှူး)',
    },
    title: 'Executive Plant Director (ISO 45001 Management Representative)',
    role: 'DIRECTOR',
    email: 'siriporn.director@banfert.com',
    department: 'Apex Industrial Executive Board',
    avatarUrl: '',
    channel: 'QQ',
    channelLabel: 'QQ Enterprise SSO Login',
  },
  {
    id: 'persona_aungsan',
    name: 'Aung San (အာင်ဆန်း)',
    nameDisplay: {
      TH: 'อ่องซาน (Aung San - หัวหน้างานแรงงาน)',
      ZH: '昂山 (外籍维保班长)',
      EN: 'Mr. Aung San (Foreign Contractor Lead)',
      MY: 'ကိုအောင်ဆန်း (လုပ်ငန်းကြီးကြပ်သူ)',
    },
    title: 'Foreign Labor Supervisor / Confined Space Entrant',
    role: 'FOREIGN_WORKER',
    email: 'aungsan.crew@apexsite.com',
    department: 'Global Facility Contractors Group',
    avatarUrl: '',
    channel: 'EMAIL',
    channelLabel: 'Email / Badge Authentication',
  },
];

// Sample Initial ISO 45001 Permits that can be loaded on-demand
export const SAMPLE_ISO_PERMITS: WorkPermit[] = [
  {
    id: 'PTW-2026-1029-001',
    title: 'ซ่อมบำรุงท่อส่งลมแรงดันสูงและเชื่อมหน้าแปลนแท็งก์สี (High-Pressure Flange Welding)',
    riskTypes: ['HOT_WORK', 'WORKING_AT_HEIGHT'],
    facilityZone: 'Building A - Line 1 High-Precision Coating',
    requesterName: 'นายสมชาย คำดี',
    requesterCompany: 'Thai Mech & Piping Engineering Ltd.',
    requesterPhone: '081-998-3421',
    workerCount: 4,
    startDate: '2026-10-29T08:30',
    endDate: '2026-10-29T17:00',
    status: 'ACTIVE',
    safetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
    safetyOfficerEmail: '23252sudalak@gmail.com',
    gasReadings: {
      lelPercent: 0,
      oxygenPercent: 20.9,
      h2sPpm: 0,
      coPpm: 2,
      testerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
      testedAt: '2026-10-29T08:15',
      isPassed: true,
    },
    checklistSummary: [
      'เคลียร์วัสดุไวไฟ 10 เมตร',
      'ถังดับเพลิงประจำจุด 2 ถัง',
      'เข็มขัดนิรภัยเต็มตัวเกี่ยวจุดยึด 100%',
    ],
    ppeSelected: ['ppe_helmet', 'ppe_glasses', 'ppe_shoes', 'ppe_vest', 'ppe_harness', 'ppe_welding_mask', 'ppe_gloves'],
    requesterSignature: {
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><path d="M10 40 Q40 10 70 35 T140 25" stroke="%230f172a" stroke-width="2.5" fill="none"/></svg>',
      signerName: 'นายสมชาย คำดี',
      signerRole: 'Requester / Contractor',
      signedAt: '2026-10-29T08:00',
      type: 'SIMULATED',
    },
    safetyOfficerSignature: {
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><path d="M15 35 Q50 5 80 40 T150 20" stroke="%2316a34a" stroke-width="2.8" fill="none"/></svg>',
      signerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
      signerRole: 'Safety Officer (จป.วิชาชีพ)',
      signedAt: '2026-10-29T08:20',
      type: 'SIMULATED',
    },
    createdAt: '2026-10-29T07:50',
    updatedAt: '2026-10-29T08:20',
    patrolAuditPassed: true,
    safeManHours: 34,
  },
  {
    id: 'PTW-2026-1029-002',
    title: 'ตรวจสอบรอยแตกร้าวและทำความสะอาดภายในบ่อบำบัดน้ำเสีย (Confined Space Sludge Inspection)',
    riskTypes: ['CONFINED_SPACE', 'CHEMICAL_HANDLING'],
    facilityZone: 'Underground Effluent Treatment Plant (ETP Tank #3)',
    requesterName: 'Aung San (ကိုအောင်ဆန်း)',
    requesterCompany: 'Global Facility Contractors Group',
    requesterPhone: '089-223-1189',
    workerCount: 3,
    startDate: '2026-10-29T09:00',
    endDate: '2026-10-29T15:30',
    status: 'PENDING',
    safetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
    safetyOfficerEmail: '23252sudalak@gmail.com',
    checklistSummary: [
      'เป่าระบายอากาศแบบบังคับ 30 นาที',
      'จัดเจ้าหน้าที่ช่วยเหลือพร้อมรอกฉุกเฉิน',
      'ตรวจสอบ SDS สารเคมี',
    ],
    ppeSelected: ['ppe_helmet', 'ppe_shoes', 'ppe_respirator', 'ppe_gloves', 'ppe_chemical_suit', 'ppe_harness'],
    requesterSignature: {
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><path d="M20 45 Q60 15 90 30 T130 35" stroke="%230f172a" stroke-width="2.5" fill="none"/></svg>',
      signerName: 'Aung San',
      signerRole: 'Requester / Contractor',
      signedAt: '2026-10-29T08:45',
      type: 'SIMULATED',
    },
    createdAt: '2026-10-29T08:45',
    updatedAt: '2026-10-29T08:45',
    patrolAuditPassed: false,
    safeManHours: 0,
  },
  {
    id: 'PTW-2026-1028-003',
    title: 'เปลี่ยนหม้อแปลงไฟฟ้าแรงสูง 22kV และติดตั้งเบรกเกอร์ใหม่ (High-Voltage Substation Retrofit)',
    riskTypes: ['ELECTRICAL_WORK'],
    facilityZone: 'Facility Perimeter - 115kV High Voltage Substation #2',
    requesterName: 'วิศวกรเกรียงไกร ชัยชนะ',
    requesterCompany: 'Facility & Electrical Engineering Dept.',
    requesterPhone: '084-551-7788',
    workerCount: 5,
    startDate: '2026-10-28T09:00',
    endDate: '2026-10-28T16:00',
    status: 'CLOSED',
    safetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
    safetyOfficerEmail: '23252sudalak@gmail.com',
    gasReadings: {
      lelPercent: 0,
      oxygenPercent: 20.9,
      isPassed: true,
      testerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
      testedAt: '2026-10-28T08:50',
    },
    checklistSummary: [
      'ใส่กุญแจ LOTO ครบ 6 ตำแหน่ง',
      'ตรวจวัดแรงดันเป็นศูนย์ Zero Voltage',
      'ใช้เครื่องมือหุ้มฉนวน 1000V',
    ],
    ppeSelected: ['ppe_helmet', 'ppe_glasses', 'ppe_shoes', 'ppe_gloves'],
    requesterSignature: {
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><path d="M10 30 Q50 40 90 20 T140 40" stroke="%230f172a" stroke-width="2.5" fill="none"/></svg>',
      signerName: 'วิศวกรเกรียงไกร ชัยชนะ',
      signerRole: 'Requester',
      signedAt: '2026-10-28T08:40',
      type: 'SIMULATED',
    },
    safetyOfficerSignature: {
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><path d="M15 35 Q50 5 80 40 T150 20" stroke="%2316a34a" stroke-width="2.8" fill="none"/></svg>',
      signerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
      signerRole: 'Safety Officer (จป.วิชาชีพ)',
      signedAt: '2026-10-28T08:55',
      type: 'SIMULATED',
    },
    createdAt: '2026-10-28T08:30',
    updatedAt: '2026-10-28T16:30',
    patrolAuditPassed: true,
    safeManHours: 35,
  },
];
