const profile = {
  name: '范雅棠',
  englishName: 'Cynthia Fan',
  position: '前端工程師',
  location: '台灣台北',
  email: 'cynthiafan1230@gmail.com',
  github: 'https://github.com/Cynthiafan',
};

const summary = `
擁有2年以上的程式開發經驗，對寫程式有著莫大的熱情。具備獨立開發、解決問題的能力，也能與團隊合作、溝通無礙。持續關注各領域的發展，並且適時運用於工作上。時常精進自己的知識與能力，不排斥新的事物。
有著多樣的經歷讓我能以不同的角度解讀事物，並且能條理分明地表達看法、良好地與他人溝通。
`;

const education = [
  {
    school: '輔仁大學',
    apartment: '中國文學系',
    duration: '2010/9 - 2014/6',
    description: [
      '輔系餐飲管理學系',
      '曾任系學會會長、財務長',
      '系上排球隊球員',
    ],
  },
  {
    school: '韓國高麗大學',
    apartment: '韓文語言中心',
    duration: '2014/9 - 2015/2',
    description: [
      '通過韓語檢定 (TOPIK) 3 級',
    ],
  },
];

const language = [
  { name: '中文', level: 5, description: '母語' },
  { name: '英文', level: 3, description: '中等' },
  { name: '韓文', level: 2, description: '生活會話' },
];

const experience = [
  {
    company: '香港商阿爾伊',
    officialWebsite: 'https://myre.life/',
    position: '前端工程師',
    duration: '2018/6 - 2019/11',
    highlights: [
      '參與產品的功能發想與規劃，並與其他前端及視覺設計討論 UI/UX 設計，以同時達到更好的使用者體驗及程式架構',
      '使用 D3.js 處理數據圖像化，包含折線圖、圓餅圖、長條圖與熱力圖',
      '開發並維護常用組件，如數字鍵盤、日期範圍選擇器等',
      '解決跨系統平台／裝置／瀏覽器的問題',
      '使用 Gitlab 作為版控工具 (Git flow)',
    ],
    projects: [
      {
        name: '官方網站',
        url: 'https://myre.life/',
        badge: [],
        description: '開發使用於 APP 中的 WebView 網頁，包含活動頁面、翻牌遊戲、問卷功能等',
        skills: ['Nuxt', 'Vuex', 'jQuery', 'TypeScript', 'Pug', 'SCSS', 'RWD', 'i18n', ],
      },
      {
        name: '店家平台',
        url: 'https://boss.myre.life/',
        badge: ['後台', ],
        description: '維護、優化原有畫面及功能，並開發新功能如購物車、將資訊圖像化的會員分析等',
        skills: ['Vue', 'Vuex', 'D3', 'SCSS', 'i18n', 'Express', ],
      },
      {
        name: 'APP 內容管理系統 (CMS)',
        url: '',
        badge: ['內部系統', ],
        description: '從零建置專案，為串接上述專案所需資料的後台系統',
        skills: ['Vue', 'Vuex', 'Vue Cli 3', 'Element UI', 'Pug', 'Scss', ],
      },
      {
        name: '電子貨幣會員後台',
        url: 'https://account.birc.io/',
        badge: ['後台', ],
        description: '從零建置專案，完成設計圖切版、API 串接，功能包含 KYC、貨幣試算、交易紀錄等',
        skills: ['Vue', 'Vuex', 'Vue Cli 3', 'Element UI', 'Pug', 'Scss', 'RWD', 'Express' ],
      },
    ],
  },
  {
    company: '治略資訊',
    officialWebsite: 'https://www.crowdinsight.com.tw/',
    position: '前端工程師',
    duration: '2017/11 - 2018/2',
    highlights: [
      '發起並與其他前端共同制定程式編寫風格指南',
    ],
    projects: [
      {
        name: '農情平台',
        url: 'https://bi.agribiz.tw/',
        badge: [],
        description: '提供每日各種類農作物在世界各地的資訊，並以圖表將數據圖像化。負責主要切版，導入 Vuex，並由 vue-resource 改為 Axios，增加開發效率',
        skills: ['Vue', 'Vuex', 'SCSS', ],
      },
      {
        name: '連鎖零售商 ERP 系統',
        url: '',
        badge: [],
        description: '負責銷貨的版面配置、切版與串接 RESTful API，讓不同權限的管理者能夠看到各個分店的銷貨狀況。',
        skills: ['Vue', 'Vuex', 'SCSS', 'Bootstrap', ],
      },
    ],
  },
  {
    company: '愛動行銷',
    officialWebsite: '',
    position: '行銷企劃經理',
    duration: '2016/4 - 2017/1',
    highlights: [
      '製作社群行銷企劃並執行',
      '向其他公司客戶提案社群行銷企劃',
      '管理 10 名實習生',
    ],
    projects: [],
  },
];

const independentProject = [
  {
    name: 'Line Bot',
    url: '',
    description: '為了在出遊時不必再一一確認景點資訊，只需對 Line Bot 發送關鍵字即可獲得相關資訊與預設好的行程',
    skills: ['Express', 'mLab', 'Heroku' ],
  },
  {
    name: '新接龍',
    url: '',
    description: '2019 The F2E 前端修練精神時光屋其中一關的題目，使用原生的拖拉完成',
    skills: ['Vue', 'Heroku' ],
  },
  {
    name: '個人網站',
    url: '',
    description: '個人履歷以及目前為止的開發心得，包含語言概念、Bug 解法或是功能寫法',
    skills: ['Vuepress' ],
  }
];

const skills = [
  {
    title: '前端',
    groups: [
      { name: '基礎', content: ['HTML5/Pug', 'CSS3/SCSS', 'JavaScript ES6', ], },
      { name: '框架', content: ['Vue', 'Nuxt', ], },
      { name: 'Library', content: ['jQuery', 'D3', ], },
    ],
  },
  {
    title: '後端',
    groups: [
      { name: '語言', content: ['Node/Express', ], },
      { name: '資料庫', content: ['Mongo/Mongoose', ], },
    ],
  },
  {
    title: '其他',
    groups: [
      { name: '作業系統', content: ['MacOS', ], },
      { name: '版控工具', content: ['Git/Gitflow', ], },
      { name: '雲端主機', content: ['Heroku', 'AWS ec2' ], },
      { name: '設計軟體', content: ['Adobe XD', 'Sketch' ], },
    ],
  },
];

export default {
  profile,
  summary,
  education,
  independentProject,
  language,
  experience,
  skills,
};