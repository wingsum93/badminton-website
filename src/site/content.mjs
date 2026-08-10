export const site = {
  title: "羽毛球教練筆記",
  description:
    "廣東話羽毛球教學：基礎、步法、發球、擊球技術、防守、戰術同訓練。",
  footer: "羽毛球教練筆記，廣東話訓練內容。",
};

export const categories = [
  {
    id: "basics",
    label: "基礎",
    path: "pages/basics.html",
    eyebrow: "基礎",
    title: "先建立穩定身體同拍面，之後每一項技術先會易上手。",
    intro:
      "基礎練習唔係新手專用，而係所有步法、擊球同戰術嘅共同底層。重點係放鬆、平衡、準備同起動節奏。",
    cues: ["拍面先準備", "身體保持彈性", "擊球前細步調整"],
    description: "握拍、準備姿勢、站姿同 Split Step，建立穩定起動同控拍能力。",
    topics: [
      {
        id: "grip",
        label: "握拍",
        description:
          "理解正手、反手同放鬆握拍，避免由頭到尾死握拍柄。",
      },
      {
        id: "ready-position",
        label: "準備姿勢",
        description:
          "球拍放喺身前，膝頭微曲，身體可以即時向前後左右起動。",
      },
      {
        id: "stance",
        label: "站姿",
        description:
          "按單打、雙打同不同來球情況調整腳距、重心同身體方向。",
      },
      {
        id: "split-step",
        label: "Split Step",
        description:
          "對方擊球一刻做預備小跳，令第一步更快、更有方向感。",
      },
    ],
  },
  {
    id: "footwork",
    label: "步法",
    path: "pages/footwork.html",
    eyebrow: "步法",
    title: "所有步法都係為咗快啲到位、穩定擊球、打完即刻回中。",
    intro:
      "練步法唔係淨係鬥快，重點係起動、煞停、重心轉移同拍面準備。每一下移動都要保持膝頭微曲。",
    cues: ["第一步短而快", "最後一步穩住重心", "打完即刻回位"],
    description: "前場、中場、後場、四角、六點同回位，整理場上移動方向。",
    topics: [
      {
        id: "front-court",
        label: "前場",
        description:
          "用細步同弓步處理網前球，重點係拍先到、身體跟住穩定落地。",
      },
      {
        id: "mid-court",
        label: "中場",
        description:
          "處理平抽、擋網同補位，保持重心低，準備快速轉守轉攻。",
      },
      {
        id: "back-court",
        label: "後場",
        description:
          "用轉身、並步、交叉步同剪刀步到位，爭取高點擊球。",
      },
      {
        id: "four-corners",
        label: "四角",
        description:
          "由中場出發去四個角位，訓練方向判斷、煞停同回中節奏。",
      },
      {
        id: "six-points",
        label: "六點",
        description:
          "加入左右中場點位，令移動練習更接近實戰覆蓋範圍。",
      },
      {
        id: "recovery",
        label: "回位",
        description:
          "每次擊球後用落地力量回復可防守位置，避免企死喺角位。",
      },
    ],
  },
  {
    id: "serve",
    label: "發球",
    path: "pages/serve.html",
    eyebrow: "發球",
    title: "發球唔只係開始一分，係第一下控制節奏同空間。",
    intro:
      "好嘅發球要穩定、隱蔽同有目的。練習時先追求高度同落點一致，再加入長短、快慢同方向變化。",
    cues: ["動作保持細", "擊球點固定", "發完即刻企位"],
    description: "正手、反手、短發、長發同平快發球，建立開局控制。",
    topics: [
      {
        id: "forehand-serve",
        label: "正手發球",
        description:
          "適合單打高遠發球同部分變化，重點係揮拍路線穩定。",
      },
      {
        id: "backhand-serve",
        label: "反手發球",
        description:
          "雙打常用，動作短，靠手指同前臂細力送球過網。",
      },
      {
        id: "short-serve",
        label: "短發",
        description:
          "球過網後盡快下墜，迫對手低點處理，減少被直接搶攻。",
      },
      {
        id: "long-serve",
        label: "長發",
        description:
          "把球送到後場，迫對手後退，同短發形成節奏變化。",
      },
      {
        id: "flick-serve",
        label: "平快發球",
        description:
          "壓向對手身體、肩膊或反手位，縮短對方反應時間。",
      },
    ],
  },
  {
    id: "strokes",
    label: "擊球技術",
    path: "pages/strokes.html",
    eyebrow: "擊球技術",
    title: "把正手、反手同網前技術分清楚，先可以按來球選擇正確出球。",
    intro:
      "擊球技術嘅核心係到位、擊球點、拍面同發力節奏。每個動作先用穩定球質做目標，再慢慢加入速度同落點。",
    cues: ["先到位再發力", "拍面決定方向", "動作完成後回復準備"],
    description: "正手、反手同網前技術，覆蓋高遠、殺球、吊球、抽球同細球。",
    groups: [
      {
        id: "forehand",
        label: "正手",
        description: "正手多數用喺主動或半主動位置，重點係身體發力鏈同高點擊球。",
        topics: [
          {
            id: "forehand-clear",
            label: "高遠球",
            description:
              "用完整轉身同向前上方發力，把球送到對方後場底線附近。",
          },
          {
            id: "forehand-smash",
            label: "殺球",
            description:
              "由高點向下壓，配合轉腰、手肘帶動同擊球一刻收緊。",
          },
          {
            id: "forehand-drop",
            label: "吊球",
            description:
              "保持同高遠球相近準備，最後控制拍面同力度令球落前場。",
          },
          {
            id: "forehand-drive",
            label: "抽球",
            description:
              "用短促前臂同穩定拍面打平快球，爭取壓迫中前場。",
          },
        ],
      },
      {
        id: "backhand",
        label: "反手",
        description:
          "反手需要先轉身避開身體，再用拇指、前臂同短促發力完成擊球。",
        topics: [
          {
            id: "backhand-clear",
            label: "高遠球",
            description:
              "爭取身體側前方擊球，前臂快速旋轉，避免只用手臂硬拉。",
          },
          {
            id: "backhand-drop",
            label: "吊球",
            description:
              "用較細動作控制拍面，將被動後場球放到對方前場。",
          },
          {
            id: "backhand-drive",
            label: "抽球",
            description:
              "用拇指頂拍同短揮拍處理身體附近或反手邊平快球。",
          },
        ],
      },
      {
        id: "net",
        label: "網前",
        description: "網前技術重視手指控制、拍面角度同擊球前嘅安定。",
        topics: [
          {
            id: "net-spin",
            label: "搓球",
            description:
              "貼近網前用細膩拍面製造旋轉，令對方難以直接挑高或撲殺。",
          },
          {
            id: "net-cross",
            label: "勾球",
            description:
              "用手指改變拍面，把球由一邊網前勾到另一邊，製造空位。",
          },
          {
            id: "net-kill",
            label: "撲球",
            description:
              "對高過網嘅球快速向前下壓，動作要短，避免觸網或出界。",
          },
          {
            id: "net-lift",
            label: "挑球",
            description:
              "由低點把球挑到後場，目標係夠高夠深，爭取防守時間。",
          },
        ],
      },
    ],
  },
  {
    id: "defense",
    label: "防守",
    path: "pages/defense.html",
    eyebrow: "防守",
    title: "防守唔係只求救到球，而係用穩定回球爭取下一拍主動。",
    intro:
      "好防守要讀到對方發力方向，拍面早準備，身體保持低重心。接到球之後要知道係擋、挑、抽定轉攻。",
    cues: ["拍面早出現", "重心保持低", "防完準備下一拍"],
    description: "接殺、擋網、挑球同防守轉攻，處理受壓情況。",
    topics: [
      {
        id: "smash-receive",
        label: "接殺",
        description:
          "用穩定拍面同短動作借力，按來球高度選擇擋、挑或抽。",
      },
      {
        id: "block-to-net",
        label: "擋網",
        description:
          "把快球卸力放到網前，迫對手向前移動，爭取防守變化。",
      },
      {
        id: "defensive-lift",
        label: "挑球",
        description:
          "受壓時把球挑高挑深，令自己有時間回復防守位置。",
      },
      {
        id: "counter-attack",
        label: "防守轉攻",
        description:
          "當對方殺球質量下降，改用平抽、擋對角或推空位反搶主動。",
      },
    ],
  },
  {
    id: "tactics",
    label: "戰術",
    path: "pages/tactics.html",
    eyebrow: "戰術",
    title: "戰術係用落點、節奏同企位，令自己打得舒服，對手打得辛苦。",
    intro:
      "戰術唔一定複雜，初階可以由發接發、打空位、改變節奏同保持輪轉開始。每個選擇都要配合自己能力。",
    cues: ["先看空位", "用節奏製造壓力", "同拍檔保持距離"],
    description: "單打、雙打、發接發、落點同輪轉，建立比賽選擇。",
    topics: [
      {
        id: "singles",
        label: "單打",
        description:
          "用四角拉動、深淺變化同回中位置控制體力同空間。",
      },
      {
        id: "doubles",
        label: "雙打",
        description:
          "理解前後攻守、左右防守同拍檔補位，減少中間空位。",
      },
      {
        id: "serve-return",
        label: "發接發",
        description:
          "用發球質量同接發第一拍搶節奏，決定一分初段主動權。",
      },
      {
        id: "placement",
        label: "落點",
        description:
          "按對手站位選擇身體、兩邊、前後場或空位，而唔係只追求大力。",
      },
      {
        id: "rotation",
        label: "輪轉",
        description:
          "雙打攻守轉換時保持移動方向清楚，令前後或左右站位自然銜接。",
      },
    ],
  },
  {
    id: "training",
    label: "訓練",
    path: "pages/training.html",
    eyebrow: "訓練",
    title: "訓練要有目的：先建立動作，再提升穩定，最後放入實戰壓力。",
    intro:
      "每個訓練都要知道目標、組數、休息同成功標準。唔同程度可以調整速度、球數同落點難度。",
    cues: ["每組有目標", "質量先過數量", "最後加入實戰限制"],
    description: "步法、多球、發球、殺球同實戰訓練，把技術轉成場上能力。",
    topics: [
      {
        id: "footwork-training",
        label: "步法訓練",
        description:
          "由空場影子步開始，再加入指令、節奏同回中要求。",
      },
      {
        id: "multi-shuttle",
        label: "多球",
        description:
          "用連續餵球建立動作重複量，適合修正技術同提升穩定性。",
      },
      {
        id: "serve-training",
        label: "發球訓練",
        description:
          "設定落點目標同成功率，練短發、長發同變化發球。",
      },
      {
        id: "smash-training",
        label: "殺球訓練",
        description:
          "分開練起跳、擊球點、落點同殺完後下一拍銜接。",
      },
      {
        id: "match-training",
        label: "實戰訓練",
        description:
          "用限制條件、指定開局或分數壓力，把技術帶入對抗。",
      },
    ],
  },
];

export const legacyPages = [
  {
    id: "forehand-power",
    label: "正手發力",
    path: "pages/forehand-power.html",
    targetCategoryId: "strokes",
    targetAnchor: "forehand",
    title: "正手發力已整理到擊球技術。",
    intro:
      "正手高遠球、殺球、吊球同抽球而家集中放喺擊球技術入面，方便同反手、網前技術一齊比較。",
  },
  {
    id: "backhand-power",
    label: "反手發力",
    path: "pages/backhand-power.html",
    targetCategoryId: "strokes",
    targetAnchor: "backhand",
    title: "反手發力已整理到擊球技術。",
    intro:
      "反手高遠球、吊球同抽球而家集中放喺擊球技術入面，方便按擊球情況搵返對應重點。",
  },
];
