import { Language, HighRiskType } from '../types';

export interface TranslationDict {
  brandName: string;
  systemTitle: string;
  systemSubtitle: string;
  standardsBadge: string;
  navDashboard: string;
  navPermits: string;
  navNewPermit: string;
  navAnalytics: string;
  navDriveVault: string;
  navWebhooks: string;
  navSheetsConfig: string;

  // Zero Accident Days
  zeroAccidentTitle: string;
  zeroAccidentDays: string;
  zeroAccidentSince: string;
  zeroAccidentTarget: string;

  // Metric Cards
  metricTotal: string;
  metricActive: string;
  metricPending: string;
  metricApproved: string;
  metricClosed: string;
  metricRejected: string;

  // Safety Advisory Banner
  advisoryTitle: string;
  advisoryText: string;

  // 8 High-Risk Standards
  riskFilterAll: string;
  riskTypes: Record<HighRiskType, { title: string; desc: string }>;

  // Work Permit List & Table
  tablePermitId: string;
  tableTitle: string;
  tableRiskType: string;
  tableZone: string;
  tableRequester: string;
  tableTiming: string;
  tableStatus: string;
  tableApprover: string;
  tableActions: string;
  noPermitsFound: string;
  noPermitsDesc: string;
  btnCreatePermit: string;
  btnLoadSampleData: string;
  btnSyncSheets: string;
  syncSuccess: string;
  syncIdle: string;
  lastSynced: string;
  searchPlaceholder: string;

  // Form Wizard
  wizardTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  btnNext: string;
  btnBack: string;
  btnSubmitPermit: string;
  btnCancel: string;

  // Form Fields
  fieldJobTitle: string;
  fieldJobTitlePlaceholder: string;
  fieldFacilityZone: string;
  fieldFacilityZonePlaceholder: string;
  fieldContractorName: string;
  fieldContractorCompany: string;
  fieldPhone: string;
  fieldWorkerCount: string;
  fieldStartTime: string;
  fieldEndTime: string;
  fieldSelectRiskTypes: string;

  // Checklists & PPE
  checklistHeader: string;
  ppeHeader: string;
  gasTestingHeader: string;
  gasTestingDesc: string;
  lelReading: string;
  oxygenReading: string;
  h2sReading: string;
  coReading: string;

  // Signature
  signatureTitle: string;
  signatureDrawTab: string;
  signatureUploadTab: string;
  signatureClear: string;
  signatureUndo: string;
  signatureSimulate: string;
  signatureUploadPrompt: string;
  signatureRequesterNotice: string;
  signatureOfficerNotice: string;

  // Approval & Roles
  approvalModalTitle: string;
  requesterBoxTitle: string;
  safetyOfficerBoxTitle: string;
  leadSafetyOfficerName: string;
  leadSafetyOfficerTitle: string;
  btnApproveAndActivate: string;
  btnRejectPermit: string;
  btnClosePermit: string;
  btnPrintISO: string;
  rejectReasonPrompt: string;

  // Analytics & Reports
  analyticsTitle: string;
  safeManHours: string;
  patrolPassRate: string;
  monthlyBreakdown: string;
  zoneBreakdown: string;
  exportPdf: string;
  downloadCsv: string;

  // Status Labels
  statusPending: string;
  statusApproved: string;
  statusActive: string;
  statusClosed: string;
  statusRejected: string;

  // Persona
  personaSwitch: string;
  currentPersona: string;
}

export const translations: Record<Language, TranslationDict> = {
  TH: {
    brandName: 'BANFERT',
    systemTitle: 'ระบบใบอนุญาตทำงานปลอดภัยดิจิทัล (e-PTW)',
    systemSubtitle: 'มาตรฐานสากล ISO 45001 | ISO 18001 | ISO 9001 | IATF 16949 แบบไร้กระดาษ (Paperless)',
    standardsBadge: 'มาตรฐานความปลอดภัยโรงงานอุตสาหกรรมสากล',
    navDashboard: 'แดชบอร์ดความปลอดภัย',
    navPermits: 'รายการใบอนุญาต',
    navNewPermit: 'ขอใบอนุญาตใหม่',
    navAnalytics: 'รายงาน & สถิติประจำเดือน',
    navDriveVault: 'Google Drive คลังเอกสาร',
    navWebhooks: 'ประวัติแจ้งเตือน Webhooks',
    navSheetsConfig: 'การเชื่อมต่อ Google Sheets',

    zeroAccidentTitle: 'สถิติวันทำงานปลอดภัยต่อเนื่อง (Zero Accident Days)',
    zeroAccidentDays: 'วันปลอดภัย',
    zeroAccidentSince: 'นับจากอุบัติเหตุครั้งล่าสุด: 17 สิงหาคม 2026',
    zeroAccidentTarget: 'เป้าหมายประจำปี 2026: 365 วัน ปลอดอุบัติเหตุร้ายแรง 100%',

    metricTotal: 'ใบงานทั้งหมด',
    metricActive: 'กำลังปฏิบัติงาน (Active)',
    metricPending: 'รอ จป.วิชาชีพ อนุมัติ',
    metricApproved: 'อนุมัติแล้ว',
    metricClosed: 'ปิดงานปลอดภัยแล้ว',
    metricRejected: 'ปฏิเสธ / สั่งแก้ไข',

    advisoryTitle: 'ประกาศความปลอดภัยประจำวัน (Safety Advisory)',
    advisoryText: 'เน้นย้ำ: ก่อนเริ่มงาน Hot Work และ Confined Space ทุกครั้ง ต้องตรวจวัดค่าแก๊ส (LEL < 10%, O2 19.5-23.5%) โดย จป.วิชาชีพ นางสาวสุดาลักษ์ พิมพ์พันธ์ เท่านั้น',

    riskFilterAll: 'ทุกประเภทงานเสี่ยงสูง',
    riskTypes: {
      HOT_WORK: {
        title: 'งานความร้อนและประกายไฟ (Hot Work)',
        desc: 'งานเชื่อม ตัด เจียร เปลวไฟ ป้องกันเพลิงไหม้',
      },
      WORKING_AT_HEIGHT: {
        title: 'งานบนที่สูง (Working at Height)',
        desc: 'ปฏิบัติงานสูงเกิน 1.8 ม. บังคับใช้ Full Body Harness',
      },
      CONFINED_SPACE: {
        title: 'งานในที่อับอากาศ (Confined Space)',
        desc: 'แท็งก์ บ่อ อุโมงค์ ตรวจวัด O2, LEL, H2S, CO',
      },
      ELECTRICAL_WORK: {
        title: 'งานระบบไฟฟ้าแรงสูง (Electrical Work)',
        desc: 'ระบบตัดแยกพลังงาน Lockout/Tagout (LOTO)',
      },
      CHEMICAL_HANDLING: {
        title: 'งานสารเคมีอันตราย (Chemical Handling)',
        desc: 'กรด ด่าง สารละลายไวไฟ ตรวจสอบ SDS และ PPE เฉพาะทาง',
      },
      EXCAVATION: {
        title: 'งานขุดเจาะและเปิดหน้าดิน (Excavation)',
        desc: 'สแกนท่อสายเคเบิลใต้ดินและค้ำยันป้องกันดินถล่ม',
      },
      LIFTING: {
        title: 'งานยกย้ายด้วยปั้นจั่น (Lifting Operations)',
        desc: 'เครน รอก สลิง ตรวจสอบใบรับรอง คป.1 และ Rigging Check',
      },
      COLD_WORK: {
        title: 'งานเย็นและทั่วไป (Cold Work)',
        desc: 'ซ่อมบำรุงเครื่องจักร ประกอบชิ้นส่วนทั่วไป',
      },
    },

    tablePermitId: 'เลขที่ใบอนุญาต',
    tableTitle: 'ชื่องาน / รายละเอียด',
    tableRiskType: 'ความเสี่ยงสูง',
    tableZone: 'โซน / อาคาร / ไลน์ผลิต',
    tableRequester: 'ผู้ขอ / ผู้รับเหมา',
    tableTiming: 'วัน-เวลา ปฏิบัติงาน',
    tableStatus: 'สถานะ',
    tableApprover: 'จป.วิชาชีพ ผู้ตรวจ',
    tableActions: 'การจัดการ',
    noPermitsFound: 'ยังไม่มีใบอนุญาตทำงานในระบบ',
    noPermitsDesc: 'เริ่มต้นระบบไร้กระดาษโดยคลิกขอใบอนุญาตใหม่ หรือเชื่อมต่อซิงค์ข้อมูลจาก Google Sheets',
    btnCreatePermit: '+ ขอใบอนุญาตใหม่ (e-PTW)',
    btnLoadSampleData: 'โหลดข้อมูลตัวอย่าง ISO 45001',
    btnSyncSheets: 'รีเฟรชจาก Google Sheets',
    syncSuccess: 'ซิงค์ข้อมูลสำเร็จ',
    syncIdle: 'เชื่อมต่อ Google Sheets API v4 เรียบร้อย',
    lastSynced: 'ซิงค์ล่าสุด:',
    searchPlaceholder: 'ค้นหาด้วยเลขที่ใบอนุญาต, ชื่องาน, ผู้รับเหมา, โซน...',

    wizardTitle: 'แบบฟอร์มขอใบอนุญาตทำงานปลอดภัยดิจิทัล (3-Step Wizard)',
    step1Title: 'ขั้นตอนที่ 1: ข้อมูลทั่วไป & ประเภทงานเสี่ยงสูง',
    step1Desc: 'ระบุชื่องาน สถานที่ ผู้ขอ และสิทธิ์งานเสี่ยงสูง 8 ประเภท',
    step2Title: 'ขั้นตอนที่ 2: มาตรการควบคุม & อุปกรณ์ PPE',
    step2Desc: 'ตรวจสอบความปลอดภัยเฉพาะความเสี่ยงและการสวมใส่อุปกรณ์คุ้มครองความปลอดภัย',
    step3Title: 'ขั้นตอนที่ 3: ลงนามดิจิทัล & ส่งขออนุมัติ',
    step3Desc: 'ลงนามดิจิทัลบนหน้าจอ หรือ อัปโหลดภาพลายเซ็นผู้ขออนุญาต',
    btnNext: 'ถัดไป',
    btnBack: 'ย้อนกลับ',
    btnSubmitPermit: 'ส่งขออนุมัติ e-PTW',
    btnCancel: 'ยกเลิก',

    fieldJobTitle: 'ชื่องาน / ภารกิจปฏิบัติงาน',
    fieldJobTitlePlaceholder: 'เช่น ซ่อมบำรุงท่อลมแรงดันสูงและเชื่อมหน้าแปลนแท็งก์เก็บสี',
    fieldFacilityZone: 'โซน / อาคาร / ชั้น / ไลน์การผลิต (เลือกคำแนะนำหรือพิมพ์อิสระ)',
    fieldFacilityZonePlaceholder: 'เช่น Building A - Line 1 Coating, Tank Farm North...',
    fieldContractorName: 'ชื่อ-นามสกุล ผู้ขออนุญาต / ผู้รับเหมา',
    fieldContractorCompany: 'บริษัทผู้รับเหมา / แผนกภายใน',
    fieldPhone: 'เบอร์โทรศัพท์ติดต่อฉุกเฉิน',
    fieldWorkerCount: 'จำนวนผู้ปฏิบัติงานทั้งหมด (คน)',
    fieldStartTime: 'วัน-เวลา เริ่มต้นงาน',
    fieldEndTime: 'วัน-เวลา สิ้นสุดงาน',
    fieldSelectRiskTypes: 'เลือกประเภทงานความเสี่ยงสูงที่เกี่ยวข้อง (เลือกได้มากกว่า 1 ประเภท)',

    checklistHeader: 'รายการตรวจสอบมาตรการความปลอดภัยเฉพาะงาน (Dynamic Checklist)',
    ppeHeader: 'อุปกรณ์คุ้มครองความปลอดภัยส่วนบุคคลที่ต้องสวมใส่ (Mandatory PPE)',
    gasTestingHeader: 'การตรวจวัดระดับแก๊สอันตรายก่อนเข้าปฏิบัติงาน (Gas Testing Clearance)',
    gasTestingDesc: 'บันทึกโดย จป.วิชาชีพ (Safety Officer) หรือผู้มีหน้าที่ตรวจสอบแก๊ส',
    lelReading: 'สารไวไฟ (LEL) [%]: เกณฑ์ปลอดภัย < 10%',
    oxygenReading: 'ออกซิเจน (O2) [%]: เกณฑ์ปลอดภัย 19.5% - 23.5%',
    h2sReading: 'ก๊าซไข่เน่า (H2S) [ppm]: เกณฑ์ปลอดภัย < 10 ppm',
    coReading: 'คาร์บอนมอนอกไซด์ (CO) [ppm]: เกณฑ์ปลอดภัย < 25 ppm',

    signatureTitle: 'ระบบลงนามดิจิทัล (Digital Signature)',
    signatureDrawTab: 'วาดลายเซ็นสด (Touch / Mouse)',
    signatureUploadTab: 'อัปโหลดภาพลายเซ็น (.PNG / .JPG)',
    signatureClear: 'ล้างลายเซ็น',
    signatureUndo: 'ย้อนกลับ 1 เส้น',
    signatureSimulate: 'จำลองลายเซ็น (Auto Sign)',
    signatureUploadPrompt: 'คลิกหรือลากวางไฟล์ภาพลายเซ็นเพื่อแปลงเป็น Base64',
    signatureRequesterNotice: 'ข้าพเจ้าขอรับรองว่าจะปฏิบัติตามกฎความปลอดภัย ISO 45001 และสวมใส่อุปกรณ์ PPE ครบถ้วนตลอดระยะเวลาปฏิบัติงาน',
    signatureOfficerNotice: 'ข้าพเจ้าได้ตรวจสอบพื้นที่ มาตรการตัดแยกพลังงาน และการตรวจวัดแก๊สแล้ว เห็นชอบให้อนุมัติเริ่มงานได้',

    approvalModalTitle: 'ขั้นตอนการอนุมัติ 2 ระดับ (Chain of Approval - 2 Boxes)',
    requesterBoxTitle: 'กล่องที่ 1: ผู้ขออนุญาต / ผู้รับเหมา (Requester / Contractor)',
    safetyOfficerBoxTitle: 'กล่องที่ 2: จป.วิชาชีพ อนุมัติงาน (Safety Officer - Approver)',
    leadSafetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
    leadSafetyOfficerTitle: 'Safety Officer (จป.วิชาชีพ) | Apex Industrial Safety Dept.',
    btnApproveAndActivate: 'อนุมัติ / เริ่มปฏิบัติงานได้ (Approved & Active)',
    btnRejectPermit: 'ไม่อนุมัติ / สั่งหยุดงาน (Reject)',
    btnClosePermit: 'ตรวจปิดงานปลอดภัย (Close Permit)',
    btnPrintISO: 'พิมพ์ / ส่งออกเอกสาร ISO 45001',
    rejectReasonPrompt: 'ระบุเหตุผลที่ไม่อนุมัติหรือข้อแก้ไขที่ต้องดำเนินการ:',

    analyticsTitle: 'สรุปสถิติความปลอดภัยประจำเดือน (Monthly Safety Analytics)',
    safeManHours: 'ชั่วโมงทำงานปลอดภัยสะสม (Safe Man-Hours)',
    patrolPassRate: 'อัตราการผ่านการตรวจความปลอดภัย (Patrol Pass Rate)',
    monthlyBreakdown: 'จำแนกตามประเภทงานความเสี่ยงสูง 8 ด้าน',
    zoneBreakdown: 'จำแนกตามโซนและพื้นที่โรงงาน',
    exportPdf: 'พิมพ์ / ส่งออกรายงาน PDF (Simulated)',
    downloadCsv: 'ดาวน์โหลดไฟล์ฐานข้อมูล WorkPermit_Database.csv (UTF-8 BOM)',

    statusPending: 'รออนุมัติ',
    statusApproved: 'อนุมัติแล้ว',
    statusActive: 'กำลังปฏิบัติงาน',
    statusClosed: 'ปิดงานปลอดภัย',
    statusRejected: 'ไม่อนุมัติ',

    personaSwitch: 'สลับบทบาทผู้ใช้งาน (Persona Switcher)',
    currentPersona: 'ผู้ใช้งานปัจจุบัน:',
  },
  ZH: {
    brandName: 'BANFERT',
    systemTitle: '数字化安全作业票系统 (e-PTW)',
    systemSubtitle: '国际标准 ISO 45001 | ISO 18001 | ISO 9001 | IATF 16949 无纸化作业系统',
    standardsBadge: '国际工业安全与质量合规认证',
    navDashboard: '安全控制台',
    navPermits: '作业票清单',
    navNewPermit: '申请新作业票',
    navAnalytics: '月度安全报表',
    navDriveVault: '云端档案库 (Drive)',
    navWebhooks: '通知日志 (Webhooks)',
    navSheetsConfig: 'Google 表格连接',

    zeroAccidentTitle: '连续安全生产无事故天数 (Zero Accident Days)',
    zeroAccidentDays: '安全天数',
    zeroAccidentSince: '自上次事故以来：2026年8月17日',
    zeroAccidentTarget: '2026年度目标：365天 零严重伤亡事故 100% 达成',

    metricTotal: '作业票总数',
    metricActive: '进行中 (Active)',
    metricPending: '待安全官审批',
    metricApproved: '已批准',
    metricClosed: '安全关闭',
    metricRejected: '已驳回/整改',

    advisoryTitle: '今日安全公告 (Safety Advisory)',
    advisoryText: '重点强调：动火和受限空间作业前，必须由注册安全官 Sudalak P. 完成气体检测 (LEL < 10%, O2 19.5-23.5%)。',

    riskFilterAll: '全部高风险作业',
    riskTypes: {
      HOT_WORK: {
        title: '动火作业 (Hot Work)',
        desc: '焊接、气割、打磨、明火，现场必须配备灭火器及接火斗',
      },
      WORKING_AT_HEIGHT: {
        title: '高处作业 (Working at Height)',
        desc: '基准面 1.8 米以上作业，必须 100% 挂接五点式安全带',
      },
      CONFINED_SPACE: {
        title: '受限空间作业 (Confined Space)',
        desc: '储罐、储槽、管道、阴井，严格执行通风并连续监测有害气体',
      },
      ELECTRICAL_WORK: {
        title: '电气高压作业 (Electrical Work)',
        desc: '严格执行上锁挂牌 (LOTO) 能量隔离及验电绝缘工器具',
      },
      CHEMICAL_HANDLING: {
        title: '危化品操作 (Chemical Handling)',
        desc: '强酸、强碱、易燃溶剂，核查 SDS 并在现场备置洗眼器与防溢套件',
      },
      EXCAVATION: {
        title: '挖掘与沟槽作业 (Excavation)',
        desc: '地下管线排查探测，沟槽深度超 1.2 米须进行支护放坡',
      },
      LIFTING: {
        title: '起重吊装作业 (Lifting Operations)',
        desc: '特种设备起重机、吊索吊具检查，严禁起重臂下站人',
      },
      COLD_WORK: {
        title: '冷作与通用维修 (Cold Work)',
        desc: '机械设备维保、管路紧固与通用无火安装作业',
      },
    },

    tablePermitId: '许可证编号',
    tableTitle: '作业名称 / 施工内容',
    tableRiskType: '高风险类别',
    tableZone: '施工区域 / 车间 / 产线',
    tableRequester: '申请人 / 承包商',
    tableTiming: '作业有效时间',
    tableStatus: '当前状态',
    tableApprover: '审批安全官',
    tableActions: '操作',
    noPermitsFound: '系统中暂无作业票',
    noPermitsDesc: '开启无纸化安全管理，请点击新建作业票或从 Google 表格同步数据',
    btnCreatePermit: '+ 申请新作业票 (e-PTW)',
    btnLoadSampleData: '载入 ISO 45001 样例数据',
    btnSyncSheets: '从 Google Sheets 刷新',
    syncSuccess: '数据同步成功',
    syncIdle: '已连接 Google Sheets API v4',
    lastSynced: '上次同步：',
    searchPlaceholder: '搜索许可证编号、名称、承包商、车间区域...',

    wizardTitle: '申请数字化安全作业票 (三步式向导)',
    step1Title: '第 1 步：基础信息与高风险类别',
    step1Desc: '填写作业名称、位置区域、申请人及 8 项高风险标准',
    step2Title: '第 2 步：安全防护措施与 PPE 要求',
    step2Desc: '针对性安全防范清单与个人特种劳动防护用品核查',
    step3Title: '第 3 步：数字签名与最终提交',
    step3Desc: '手写触屏绘制签名或上传印章签名图片',
    btnNext: '下一步',
    btnBack: '上一步',
    btnSubmitPermit: '提交 e-PTW 审批',
    btnCancel: '取消',

    fieldJobTitle: '作业项目名称 / 内容',
    fieldJobTitlePlaceholder: '例如：A栋1号涂布线高压气阀检修及法兰焊接',
    fieldFacilityZone: '厂区区域 / 厂房 / 楼层 / 生产线 (可自输或选择预设)',
    fieldFacilityZonePlaceholder: '例如：Building A - Line 1 Coating, Tank Farm North...',
    fieldContractorName: '申请人姓名 / 施工负责人',
    fieldContractorCompany: '承包商单位 / 厂内部门',
    fieldPhone: '现场紧急联络电话',
    fieldWorkerCount: '现场作业总人数 (人)',
    fieldStartTime: '计划开始时间',
    fieldEndTime: '计划结束时间',
    fieldSelectRiskTypes: '选择适用高风险作业类别 (多选)',

    checklistHeader: '动态安全控制核查清单 (Dynamic Checklist)',
    ppeHeader: '必须佩戴之个人防护装备 (Mandatory PPE)',
    gasTestingHeader: '有害气体检测准入记录 (Gas Testing Clearance)',
    gasTestingDesc: '由专业安全官 (Safety Officer) 使用校准检测仪测定',
    lelReading: '可燃气体 (LEL) [%]：安全阈值 < 10%',
    oxygenReading: '氧气浓度 (O2) [%]：安全范围 19.5% - 23.5%',
    h2sReading: '硫化氢 (H2S) [ppm]：安全阈值 < 10 ppm',
    coReading: '一氧化碳 (CO) [ppm]：安全阈值 < 25 ppm',

    signatureTitle: '电子签名确认 (Digital Signature)',
    signatureDrawTab: '实时手写绘制 (触控 / 鼠标)',
    signatureUploadTab: '上传签名图片 (.PNG / .JPG)',
    signatureClear: '清除重签',
    signatureUndo: '撤销上一步',
    signatureSimulate: '模拟签名 (自动生成)',
    signatureUploadPrompt: '点击或拖拽签名图片转为 Base64',
    signatureRequesterNotice: '本人保证严格遵守现场 ISO 45001 安全规程并全员佩戴齐备 PPE。',
    signatureOfficerNotice: '本人已核实施工现场能量隔离、气体检测合规，准予开工。',

    approvalModalTitle: '两级审批流机制 (Chain of Approval - 2 Boxes)',
    requesterBoxTitle: '第 1 栏：申请人 / 承包商负责人 (Requester)',
    safetyOfficerBoxTitle: '第 2 栏：注册安全官签发 (Safety Officer Approver)',
    leadSafetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (Sudalak P.)',
    leadSafetyOfficerTitle: '注册安全总监 (จป.วิชาชีพ) | Apex Industrial Safety Dept.',
    btnApproveAndActivate: '批准开工 / 激活作业票 (Approved & Active)',
    btnRejectPermit: '驳回申请 / 停止作业 (Reject)',
    btnClosePermit: '现场核验并关闭工单 (Close Permit)',
    btnPrintISO: '打印 / 导出 ISO 45001 标准单据',
    rejectReasonPrompt: '请输入驳回理由或需整改事项：',

    analyticsTitle: '月度安全运营统计 (Monthly Safety Analytics)',
    safeManHours: '累计安全工时 (Safe Man-Hours)',
    patrolPassRate: '安全稽核合格率 (Patrol Pass Rate)',
    monthlyBreakdown: '8类高风险作业分布',
    zoneBreakdown: '按厂房区域分布统计',
    exportPdf: '打印 / 导出 PDF 报表 (模拟)',
    downloadCsv: '导出 WorkPermit_Database.csv 数据库 (UTF-8 BOM)',

    statusPending: '待审核',
    statusApproved: '已批准',
    statusActive: '作业中',
    statusClosed: '已关闭',
    statusRejected: '已驳回',

    personaSwitch: '切换用户角色 (Persona Switcher)',
    currentPersona: '当前操作身份：',
  },
  EN: {
    brandName: 'BANFERT',
    systemTitle: 'Digital Work Permit System (e-PTW)',
    systemSubtitle: 'ISO 45001 | ISO 18001 | ISO 9001 | IATF 16949 Certified Paperless Industrial System',
    standardsBadge: 'Global Industrial Safety & Compliance Standards',
    navDashboard: 'Safety Dashboard',
    navPermits: 'Work Permits',
    navNewPermit: 'Request Permit',
    navAnalytics: 'Monthly Analytics',
    navDriveVault: 'Google Drive Vault',
    navWebhooks: 'Notification Logs',
    navSheetsConfig: 'Google Sheets Integration',

    zeroAccidentTitle: 'Zero Accident Days Counter (Safe Operational Streak)',
    zeroAccidentDays: 'Safe Days',
    zeroAccidentSince: 'Since last recorded incident: August 17, 2026',
    zeroAccidentTarget: 'Year 2026 Target: 365 Days Zero Recordable Incidents 100%',

    metricTotal: 'Total Permits',
    metricActive: 'Active & In-Progress',
    metricPending: 'Pending Safety Officer',
    metricApproved: 'Approved',
    metricClosed: 'Safely Closed',
    metricRejected: 'Rejected / Rectify',

    advisoryTitle: 'Daily Safety Advisory Banner',
    advisoryText: 'Mandatory: Before commencing Hot Work or Confined Space entries, multi-gas testing (LEL < 10%, O2 19.5-23.5%) must be certified by Safety Officer Sudalak P.',

    riskFilterAll: 'All High-Risk Standards',
    riskTypes: {
      HOT_WORK: {
        title: 'Hot Work & Spark Operations',
        desc: 'Welding, torch cutting, grinding, fire watch & extinguisher mandatory',
      },
      WORKING_AT_HEIGHT: {
        title: 'Working at Height (> 1.8m)',
        desc: 'Full body harness with 100% tie-off, scaffolding & lifelines inspected',
      },
      CONFINED_SPACE: {
        title: 'Confined Space Entry',
        desc: 'Tanks, pits, vaults with continuous O2, LEL, H2S, CO monitoring',
      },
      ELECTRICAL_WORK: {
        title: 'Electrical & High Voltage',
        desc: 'Lockout / Tagout (LOTO), zero voltage test & insulated gear',
      },
      CHEMICAL_HANDLING: {
        title: 'Chemical & Hazardous Media',
        desc: 'Acids, solvents, SDS verification, emergency shower & spill kit ready',
      },
      EXCAVATION: {
        title: 'Excavation & Trenching',
        desc: 'Underground utility cable scans, shoring and trench slope protection',
      },
      LIFTING: {
        title: 'Lifting & Crane Operations',
        desc: 'Crane operator certification, certified rigging & swing radius barricades',
      },
      COLD_WORK: {
        title: 'Cold Work & General Maintenance',
        desc: 'Mechanical servicing, piping assembly & equipment overhaul without ignition',
      },
    },

    tablePermitId: 'Permit ID',
    tableTitle: 'Job Title / Scope of Work',
    tableRiskType: 'High-Risk Categories',
    tableZone: 'Facility Zone & Building',
    tableRequester: 'Requester / Contractor',
    tableTiming: 'Scheduled Window',
    tableStatus: 'Status',
    tableApprover: 'Safety Approver',
    tableActions: 'Actions',
    noPermitsFound: 'No work permits in database',
    noPermitsDesc: 'Initiate a paperless workflow by requesting a new permit or syncing with Google Sheets.',
    btnCreatePermit: '+ Request New Permit (e-PTW)',
    btnLoadSampleData: 'Load Sample ISO 45001 Data',
    btnSyncSheets: 'Refresh from Google Sheets',
    syncSuccess: 'Google Sheets sync completed',
    syncIdle: 'Connected to Google Sheets API v4',
    lastSynced: 'Last Synced:',
    searchPlaceholder: 'Search by Permit ID, Title, Contractor, Zone...',

    wizardTitle: 'Digital Work Permit Application (3-Step Wizard)',
    step1Title: 'Step 1: General Info & High-Risk Selection',
    step1Desc: 'Define job scope, location zone, contractor details, and 8 risk standards',
    step2Title: 'Step 2: Safety Checklist & PPE Requirements',
    step2Desc: 'Verify dynamic risk controls and mandatory personal protective equipment',
    step3Title: 'Step 3: Digital Signature & Submission',
    step3Desc: 'Sign on touch screen / canvas or upload official signature image',
    btnNext: 'Next Step',
    btnBack: 'Previous',
    btnSubmitPermit: 'Submit e-PTW',
    btnCancel: 'Cancel',

    fieldJobTitle: 'Job Title / Scope of Work',
    fieldJobTitlePlaceholder: 'e.g. High-pressure air line maintenance and paint tank flange welding',
    fieldFacilityZone: 'Facility Zone / Building / Floor / Line (Type or choose suggestion)',
    fieldFacilityZonePlaceholder: 'e.g. Building A - Line 1 Coating, Tank Farm North...',
    fieldContractorName: 'Requester Full Name / Lead Contractor',
    fieldContractorCompany: 'Contractor Enterprise / Internal Dept.',
    fieldPhone: 'Emergency Contact Number',
    fieldWorkerCount: 'Total Number of Workers',
    fieldStartTime: 'Commencement Date & Time',
    fieldEndTime: 'Completion Date & Time',
    fieldSelectRiskTypes: 'Select Applicable High-Risk Work Types (Multi-select)',

    checklistHeader: 'Dynamic Risk Control Checklist (Dynamic Checklist)',
    ppeHeader: 'Mandatory Personal Protective Equipment (PPE)',
    gasTestingHeader: 'Gas Testing Clearance (Pre-Entry Verification)',
    gasTestingDesc: 'Recorded by certified Safety Officer or certified atmospheric tester',
    lelReading: 'Combustible Gas (LEL) [%]: Safe threshold < 10%',
    oxygenReading: 'Oxygen (O2) [%]: Safe range 19.5% - 23.5%',
    h2sReading: 'Hydrogen Sulfide (H2S) [ppm]: Safe threshold < 10 ppm',
    coReading: 'Carbon Monoxide (CO) [ppm]: Safe threshold < 25 ppm',

    signatureTitle: 'Digital Signature & Verification',
    signatureDrawTab: 'Draw Live (Touch / Mouse)',
    signatureUploadTab: 'Upload Signature Image (.PNG / .JPG)',
    signatureClear: 'Clear Pad',
    signatureUndo: 'Undo Stroke',
    signatureSimulate: 'Simulate Signature (Auto-sign)',
    signatureUploadPrompt: 'Click or drop signature image file to convert to Base64',
    signatureRequesterNotice: 'I hereby certify that all works will adhere to ISO 45001 standards with mandatory PPE enforced.',
    signatureOfficerNotice: 'I have inspected the site, verified energy isolation and gas readings, and grant authorization to proceed.',

    approvalModalTitle: 'Chain of Approval Workflow (2-Step Logic)',
    requesterBoxTitle: 'Box 1: Requester / Contractor (ผู้ขออนุญาต / ผู้รับเหมา)',
    safetyOfficerBoxTitle: 'Box 2: Safety Officer (จป.วิชาชีพ อนุมัติงาน)',
    leadSafetyOfficerName: 'Ms. Sudalak Phimphan (Sudalak P.)',
    leadSafetyOfficerTitle: 'Certified Safety Officer (จป.วิชาชีพ) | Apex Industrial Safety Dept.',
    btnApproveAndActivate: 'Approve & Activate Work Permit',
    btnRejectPermit: 'Reject / Stop Work',
    btnClosePermit: 'Inspect & Safely Close Permit',
    btnPrintISO: 'Print / Export ISO 45001 Document',
    rejectReasonPrompt: 'Specify reason for rejection or required corrective action:',

    analyticsTitle: 'Monthly Safety Performance Analytics',
    safeManHours: 'Cumulative Safe Man-Hours',
    patrolPassRate: 'Safety Patrol Audit Pass Rate',
    monthlyBreakdown: 'Breakdown across 8 High-Risk Standards',
    zoneBreakdown: 'Facility Zone & Building Distribution',
    exportPdf: 'Print / Export PDF Report (Simulated)',
    downloadCsv: 'Export WorkPermit_Database.csv (UTF-8 BOM)',

    statusPending: 'Pending',
    statusApproved: 'Approved',
    statusActive: 'Active',
    statusClosed: 'Closed',
    statusRejected: 'Rejected',

    personaSwitch: 'Switch Persona (Demo Role Simulation)',
    currentPersona: 'Active Persona:',
  },
  MY: {
    brandName: 'BANFERT',
    systemTitle: 'ဒစ်ဂျစ်တယ် အလုပ်လုပ်ခွင့်ပြုမိန့်စနစ် (e-PTW)',
    systemSubtitle: 'နိုင်ငံတကာစံနှုန်း ISO 45001 | ISO 18001 | ISO 9001 စက္ကူမသုံးသောစနစ် (Paperless)',
    standardsBadge: 'နိုင်ငံတကာ စက်ရုံဘေးကင်းလုံခြုံရေး စံသတ်မှတ်ချက်',
    navDashboard: 'ဒက်ရှ်ဘုတ်',
    navPermits: 'ခွင့်ပြုမိန့်စာရင်း',
    navNewPermit: 'ခွင့်ပြုမိန့်အသစ်တောင်းဆိုရန်',
    navAnalytics: 'လစဉ်အစီရင်ခံစာ',
    navDriveVault: 'Google Drive မော်ကွန်းတိုက်',
    navWebhooks: 'အသိပေးချက်မှတ်တမ်း',
    navSheetsConfig: 'Google Sheets ချိတ်ဆက်မှု',

    zeroAccidentTitle: 'မတော်တဆမှုကင်းရှင်းသော လုပ်ငန်းခွင်ရက်များ (Zero Accident Days)',
    zeroAccidentDays: 'ဘေးကင်းသောရက်များ',
    zeroAccidentSince: 'နောက်ဆုံးမတော်တဆဖြစ်ပွားခဲ့သည့်နေ့: ၁၇ သြဂုတ် ၂၀၂၆',
    zeroAccidentTarget: '၂၀၂၆ ခုနှစ်ပစ်မှတ်: ၃၆၅ ရက် မတော်တဆမှုလုံးဝမရှိစေရေး ၁၀၀%',

    metricTotal: 'စုစုပေါင်းခွင့်ပြုမိန့်',
    metricActive: 'လုပ်ကိုင်နေဆဲ (Active)',
    metricPending: 'ဘေးကင်းရေးအရာရှိ အတည်ပြုချက်စောင့်ဆိုင်းဆဲ',
    metricApproved: 'အတည်ပြုပြီး',
    metricClosed: 'ဘေးကင်းစွာပိတ်သိမ်းပြီး',
    metricRejected: 'ပယ်ချထားသည်',

    advisoryTitle: 'နေ့စဉ်ဘေးကင်းရေးသတိပေးချက် (Safety Advisory)',
    advisoryText: 'သတိပေးချက်: အပူပေးလုပ်ငန်းနှင့် အကန့်အသတ်ရှိနေရာလုပ်ငန်းမစတင်မီ ဓာတ်ငွေ့စစ်ဆေးမှုကို ဘေးကင်းရေးအရာရှိ Sudalak P. မှ မဖြစ်မနေစစ်ဆေးရပါမည်။',

    riskFilterAll: 'အန္တရာယ်ကြီးမားသောအလုပ်အားလုံး',
    riskTypes: {
      HOT_WORK: {
        title: 'အပူပေးနှင့် မီးပွားထွက်လုပ်ငန်း (Hot Work)',
        desc: 'ဂဟေဆော်ခြင်း၊ ဖြတ်တောက်ခြင်းနှင့် မီးသတ်ဆေးဘူးအဆင်သင့်ထားရှိခြင်း',
      },
      WORKING_AT_HEIGHT: {
        title: 'မြင့်သောနေရာလုပ်ငန်း (Working at Height)',
        desc: '၁.၈ မီတာထက်မြင့်သောနေရာတွင် အပြည့်အဝခါးပတ်ကြိုး မဖြစ်မနေတပ်ဆင်ရမည်',
      },
      CONFINED_SPACE: {
        title: 'အကန့်အသတ်ရှိနေရာလုပ်ငန်း (Confined Space)',
        desc: 'ကန်များ၊ ကျင်းများအတွင်း ဓာတ်ငွေ့စစ်ဆေးခြင်းနှင့် လေဝင်လေထွက်သေချာစေခြင်း',
      },
      ELECTRICAL_WORK: {
        title: 'လျှပ်စစ်နှင့် ဗို့အားမြင့်လုပ်ငန်း (Electrical Work)',
        desc: 'လျှပ်စစ်စွမ်းအင်ဖြတ်တောက်ခြင်း (LOTO) နှင့် လျှပ်ကာပစ္စည်းများအသုံးပြုခြင်း',
      },
      CHEMICAL_HANDLING: {
        title: 'ဓာတုပစ္စည်းကိုင်တွယ်မှု (Chemical Handling)',
        desc: 'အက်ဆစ်၊ အယ်ကာလီနှင့် SDS စစ်ဆေးပြီး အရေးပေါ်မျက်စိဆေးကန်အဆင်သင့်ထားရှိခြင်း',
      },
      EXCAVATION: {
        title: 'ကျင်းတူးလုပ်ငန်း (Excavation)',
        desc: 'မြေအောက်ကြိုးလိုင်းများစစ်ဆေးခြင်းနှင့် မြေပြိုမှုကာကွယ်ခြင်း',
      },
      LIFTING: {
        title: 'ဝန်ချီတင်လုပ်ငန်း (Lifting Operations)',
        desc: 'ကရိန်းလက်မှတ်နှင့် ကြိုးများကို စနစ်တကျစစ်ဆေးအတည်ပြုခြင်း',
      },
      COLD_WORK: {
        title: 'အအေးခန်းနှင့် အထွေထွေပြင်ဆင်ရေး (Cold Work)',
        desc: 'စက်ယန္တရားများပြုပြင်ခြင်းနှင့် အထွေထွေတပ်ဆင်ရေးလုပ်ငန်းများ',
      },
    },

    tablePermitId: 'ခွင့်ပြုမိန့်အမှတ်',
    tableTitle: 'လုပ်ငန်းအမည် / အသေးစိတ်',
    tableRiskType: 'အန္တရာယ်အမျိုးအစား',
    tableZone: 'ဇုန် / အဆောက်အအုံ / လိုင်း',
    tableRequester: 'တောင်းဆိုသူ / ကန်ထရိုက်တာ',
    tableTiming: 'လုပ်ငန်းအချိန်',
    tableStatus: 'အခြေအနေ',
    tableApprover: 'ဘေးကင်းရေးအရာရှိ',
    tableActions: 'လုပ်ဆောင်ချက်များ',
    noPermitsFound: 'စနစ်အတွင်း ခွင့်ပြုမိန့်မရှိသေးပါ',
    noPermitsDesc: 'စက္ကူမသုံးသောစနစ်ကိုစတင်ရန် ခွင့်ပြုမိန့်အသစ်တောင်းဆိုပါ သို့မဟုတ် Google Sheets မှ ဆွဲယူပါ',
    btnCreatePermit: '+ ခွင့်ပြုမိန့်အသစ်တောင်းဆိုရန် (e-PTW)',
    btnLoadSampleData: 'ISO 45001 နမူနာဒေတာထည့်သွင်းရန်',
    btnSyncSheets: 'Google Sheets မှ ပြန်လည်ဆွဲယူရန်',
    syncSuccess: 'ဒေတာချိန်ညှိမှု အောင်မြင်ပါသည်',
    syncIdle: 'Google Sheets API ချိတ်ဆက်ထားသည်',
    lastSynced: 'နောက်ဆုံးချိန်ညှိချိန်:',
    searchPlaceholder: 'ခွင့်ပြုမိန့်အမှတ်၊ အမည်၊ ကန်ထရိုက်တာ ရှာဖွေရန်...',

    wizardTitle: 'ဒစ်ဂျစ်တယ် အလုပ်လုပ်ခွင့်ပြုမိန့် လျှောက်ထားလွှာ (အဆင့် ၃ ဆင့်)',
    step1Title: 'အဆင့် ၁: အထွေထွေအချက်အလက်နှင့် အန္တရာယ်အမျိုးအစား',
    step1Desc: 'လုပ်ငန်းအမည်၊ နေရာဇုန်နှင့် အန္တရာယ်အမျိုးအစား ၈ မျိုးသတ်မှတ်ပါ',
    step2Title: 'အဆင့် ၂: ဘေးကင်းရေးစစ်ဆေးမှုနှင့် PPE အကာအကွယ်ပစ္စည်းများ',
    step2Desc: 'ဘေးကင်းရေးစည်းကမ်းများနှင့် ဝတ်ဆင်ရမည့် အကာအကွယ်ပစ္စည်းများစစ်ဆေးပါ',
    step3Title: 'အဆင့် ၃: ဒစ်ဂျစ်တယ်လက်မှတ်နှင့် တင်သွင်းခြင်း',
    step3Desc: 'မျက်နှာပြင်ပေါ်တွင် လက်မှတ်ရေးထိုးပါ သို့မဟုတ် ပုံတင်ပါ',
    btnNext: 'ရှေ့သို့',
    btnBack: 'နောက်သို့',
    btnSubmitPermit: 'ခွင့်ပြုမိန့်တင်သွင်းမည်',
    btnCancel: 'ပယ်ဖျက်မည်',

    fieldJobTitle: 'လုပ်ငန်းအမည် / လုပ်ဆောင်ချက်',
    fieldJobTitlePlaceholder: 'ဥပမာ- ပိုက်လိုင်းပြုပြင်ခြင်းနှင့် ဂဟေဆော်ခြင်း',
    fieldFacilityZone: 'စက်ရုံဇုန် / အဆောက်အအုံ / အထပ် / လိုင်း',
    fieldFacilityZonePlaceholder: 'ဥပမာ- Building A - Line 1 Coating...',
    fieldContractorName: 'တောင်းဆိုသူအမည် / ကန်ထရိုက်တာ',
    fieldContractorCompany: 'ကုမ္ပဏီအမည် / ဌာန',
    fieldPhone: 'အရေးပေါ်ဖုန်းနံပါတ်',
    fieldWorkerCount: 'လုပ်သားဦးရေ စုစုပေါင်း (ဦး)',
    fieldStartTime: 'စတင်မည့်ရက်စွဲနှင့် အချိန်',
    fieldEndTime: 'ပြီးဆုံးမည့်ရက်စွဲနှင့် အချိန်',
    fieldSelectRiskTypes: 'သက်ဆိုင်ရာ အန္တရာယ်အမျိုးအစားကို ရွေးချယ်ပါ',

    checklistHeader: 'ဘေးကင်းရေးစစ်ဆေးချက်စာရင်း (Dynamic Checklist)',
    ppeHeader: 'မဖြစ်မနေဝတ်ဆင်ရမည့် အကာအကွယ်ပစ္စည်းများ (PPE)',
    gasTestingHeader: 'အန္တရာယ်ရှိသော ဓာတ်ငွေ့စစ်ဆေးမှုမှတ်တမ်း',
    gasTestingDesc: 'ဘေးကင်းရေးအရာရှိ (Safety Officer) မှ စစ်ဆေးမှတ်တမ်းတင်သည်',
    lelReading: 'လောင်ကျွမ်းလွယ်ဓာတ်ငွေ့ (LEL) [%]: ဘေးကင်းစံနှုန်း < 10%',
    oxygenReading: 'အောက်ဆီဂျင် (O2) [%]: ဘေးကင်းစံနှုန်း 19.5% - 23.5%',
    h2sReading: 'ဟိုက်ဒရိုဂျင်ဆာလ်ဖိုဒ် (H2S) [ppm]: ဘေးကင်းစံနှုန်း < 10 ppm',
    coReading: 'ကာဗွန်မိုနောက်ဆိုက် (CO) [ppm]: ဘေးကင်းစံနှုန်း < 25 ppm',

    signatureTitle: 'ဒစ်ဂျစ်တယ်လက်မှတ် (Digital Signature)',
    signatureDrawTab: 'လက်ဖြင့်ရေးထိုးရန် (Touch / Mouse)',
    signatureUploadTab: 'လက်မှတ်ပုံတင်ရန် (.PNG / .JPG)',
    signatureClear: 'ပြန်ဖျက်ရန်',
    signatureUndo: 'တစ်ဆင့်ပြန်ဆုတ်ရန်',
    signatureSimulate: 'နမူနာလက်မှတ် (Auto Sign)',
    signatureUploadPrompt: 'လက်မှတ်ပုံကို Base64 သို့ ပြောင်းရန် ဤနေရာတွင် နှိပ်ပါ သို့မဟုတ် ဆွဲထည့်ပါ',
    signatureRequesterNotice: 'ISO 45001 ဘေးကင်းရေးစည်းကမ်းများကို အပြည့်အဝလိုက်နာမည်ဟု အာမခံပါသည်။',
    signatureOfficerNotice: 'စစ်ဆေးမှုများနှင့် ဓာတ်ငွေ့တိုင်းတာမှုများကို စစ်ဆေးပြီး အလုပ်စတင်ရန် ခွင့်ပြုပါသည်။',

    approvalModalTitle: 'အတည်ပြုခြင်းလုပ်ငန်းစဉ် ၂ ဆင့် (Chain of Approval)',
    requesterBoxTitle: 'အကွက် ၁: တောင်းဆိုသူ / ကန်ထရိုက်တာ (Requester / Contractor)',
    safetyOfficerBoxTitle: 'အကွက် ၂: ဘေးကင်းရေးအရာရှိ အတည်ပြုချက် (Safety Officer)',
    leadSafetyOfficerName: 'Ms. Sudalak Phimphan (Sudalak P.)',
    leadSafetyOfficerTitle: 'Safety Officer (จป.วิชาชีพ) | Apex Industrial Safety Dept.',
    btnApproveAndActivate: 'အတည်ပြုပြီး စတင်လုပ်ကိုင်နိုင်သည် (Approved & Active)',
    btnRejectPermit: 'ခွင့်မပြုပါ / ရပ်ဆိုင်းရန် (Reject)',
    btnClosePermit: 'လုပ်ငန်းစစ်ဆေးပြီး ပိတ်သိမ်းရန် (Close Permit)',
    btnPrintISO: 'ISO 45001 စာရွက်စာတမ်း ထုတ်ယူရန်',
    rejectReasonPrompt: 'ပယ်ချရသည့် အကြောင်းရင်းကို ဖော်ပြပါ:',

    analyticsTitle: 'လစဉ် ဘေးကင်းရေးစာရင်းအင်း (Monthly Safety Analytics)',
    safeManHours: 'ဘေးကင်းစွာလုပ်ကိုင်ခဲ့သော နာရီပေါင်း (Safe Man-Hours)',
    patrolPassRate: 'စစ်ဆေးမှုအောင်မြင်မှုရာခိုင်နှုန်း (Patrol Pass Rate)',
    monthlyBreakdown: 'အန္တရာယ်အမျိုးအစား ၈ မျိုးခွဲခြမ်းစိတ်ဖြာချက်',
    zoneBreakdown: 'စက်ရုံဇုန်အလိုက် ခွဲခြမ်းစိတ်ဖြာချက်',
    exportPdf: 'PDF အစီရင်ခံစာထုတ်ယူရန် (Simulated)',
    downloadCsv: 'WorkPermit_Database.csv ဒေတာဘေ့စ်ဒေါင်းလုဒ်လုပ်ရန် (UTF-8 BOM)',

    statusPending: 'စောင့်ဆိုင်းဆဲ',
    statusApproved: 'အတည်ပြုပြီး',
    statusActive: 'လုပ်ကိုင်နေဆဲ',
    statusClosed: 'ပိတ်သိမ်းပြီး',
    statusRejected: 'ပယ်ချထားသည်',

    personaSwitch: 'အသုံးပြုသူအခန်းကဏ္ဍပြောင်းရန် (Persona Switcher)',
    currentPersona: 'လက်ရှိအသုံးပြုသူ:',
  },
};
