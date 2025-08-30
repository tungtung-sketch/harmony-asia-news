export interface NewsArticle {
  id: string;
  title: {
    en: string;
    ja: string;
  };
  excerpt: {
    en: string;
    ja: string;
  };
  content: {
    en: string;
    ja: string;
  };
  category: {
    en: string;
    ja: string;
  };
  author: string;
  location: string;
  date: string;
  time: string;
  featured?: boolean;
  image?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "thai-baht-outlook-2024",
    title: {
      en: "Thai Baht Outlook: What Exporters Should Watch",
      ja: "タイバーツ見通し：輸出企業が注目すべきポイント"
    },
    excerpt: {
      en: "Bank of Thailand signals policy shifts that could impact currency stability. Key factors exporters need to monitor in Q4 2024.",
      ja: "タイ中央銀行の政策転換が通貨安定性に影響する可能性。2024年第4四半期に輸出企業が監視すべき主要要因。"
    },
    content: {
      en: "The Bank of Thailand's recent policy announcements have created new dynamics in the currency market that exporters must carefully navigate. With inflation pressures and global economic uncertainties, the baht's trajectory will significantly impact business operations across Southeast Asia.\n\nKey factors to monitor include interest rate decisions, trade balance data, and regional economic indicators. Export-dependent businesses should consider hedging strategies to mitigate currency risks during this volatile period.",
      ja: "タイ中央銀行の最近の政策発表により、輸出企業が慎重に対応すべき通貨市場に新たな動きが生まれています。インフレ圧力と世界経済の不確実性により、バーツの軌道は東南アジア全域のビジネス運営に大きな影響を与えるでしょう。\n\n監視すべき主要要因には、金利決定、貿易収支データ、地域経済指標が含まれます。輸出依存企業は、この不安定な期間中の通貨リスクを軽減するためのヘッジ戦略を検討すべきです。"
    },
    category: {
      en: "Analysis",
      ja: "分析"
    },
    author: "Hiroshi Tanaka",
    location: "Bangkok",
    date: "2024-08-30",
    time: "2 hours ago",
    featured: true,
    image: "/lovable-uploads/7b8ba96a-3acf-4389-a970-9c41ac7fa4d6.png"
  },
  {
    id: "digital-transformation-japan",
    title: {
      en: "Japan's Digital Transformation Accelerates Post-Pandemic",
      ja: "パンデミック後の日本のデジタル変革が加速"
    },
    excerpt: {
      en: "Government initiatives and corporate adoption drive unprecedented digitalization across traditional industries in Japan.",
      ja: "政府の取り組みと企業の導入により、日本の伝統的産業全体で前例のないデジタル化が進む。"
    },
    content: {
      en: "Japan's digital transformation landscape has undergone remarkable changes following the pandemic, with both public and private sectors embracing technology solutions at an accelerated pace. Government digital agency initiatives have streamlined bureaucratic processes, while corporations invest heavily in automation and AI integration.\n\nThe shift represents a fundamental change in how Japanese businesses operate, moving from traditional paper-based systems to cloud-first approaches that enhance efficiency and competitiveness in the global market.",
      ja: "パンデミック後、日本のデジタル変革の状況は著しく変化し、官民両部門がテクノロジーソリューションを加速的に受け入れています。政府デジタル庁の取り組みにより官僚的プロセスが合理化され、企業は自動化とAI統合に大きく投資しています。\n\nこの変化は、日本企業の運営方法における根本的な変化を表しており、従来の紙ベースシステムからクラウドファーストアプローチへと移行し、グローバル市場での効率性と競争力を向上させています。"
    },
    category: {
      en: "Breaking",
      ja: "速報"
    },
    author: "Yuki Sato",
    location: "Tokyo",
    date: "2024-08-30",
    time: "4 hours ago",
    featured: true
  },
  {
    id: "asean-trade-agreement",
    title: {
      en: "ASEAN Trade Agreement Shows Strong Q3 Results",
      ja: "ASEAN貿易協定、第3四半期に好調な結果"
    },
    excerpt: {
      en: "Regional Comprehensive Economic Partnership delivers measurable benefits across member nations with increased trade volumes.",
      ja: "地域包括的経済連携協定、加盟国全体で貿易量増加により測定可能な利益をもたらす。"
    },
    content: {
      en: "The Regional Comprehensive Economic Partnership (RCEP) has demonstrated significant positive impact on intra-ASEAN trade during the third quarter, with member nations reporting substantial increases in bilateral commerce. Manufacturing and agricultural sectors have particularly benefited from reduced tariffs and streamlined customs procedures.\n\nData from trade ministries across the region indicates that implementation challenges have been largely overcome, positioning RCEP as a model for future regional economic integration initiatives.",
      ja: "地域包括的経済連携協定（RCEP）は第3四半期中にASEAN域内貿易に大きな好影響を示し、加盟国は二国間貿易の大幅な増加を報告しています。製造業と農業部門は特に関税引き下げと税関手続きの合理化から恩恵を受けています。\n\n地域全体の貿易省からのデータは、実施上の課題がほぼ克服され、RCEPが将来の地域経済統合イニシアチブのモデルとして位置づけられていることを示しています。"
    },
    category: {
      en: "Market",
      ja: "市場"
    },
    author: "Maria Santos",
    location: "Jakarta",
    date: "2024-08-29",
    time: "1 day ago"
  },
  {
    id: "korea-ai-investment",
    title: {
      en: "South Korea Unveils $2B AI Research Initiative",
      ja: "韓国、20億ドルのAI研究イニシアチブを発表"
    },
    excerpt: {
      en: "Government and private sector collaboration aims to establish Korea as a global leader in artificial intelligence technology.",
      ja: "政府と民間部門の協力により、韓国を人工知能技術の世界的リーダーとして確立することを目指す。"
    },
    content: {
      en: "South Korea has announced a comprehensive $2 billion artificial intelligence research initiative, combining government funding with private sector investment to accelerate the country's position in the global AI race. The program focuses on semiconductor AI chips, autonomous systems, and healthcare applications.\n\nMajor Korean technology companies including Samsung, LG, and SK have committed to significant participation, with plans to establish new research facilities and expand international collaboration with leading universities worldwide.",
      ja: "韓国は、政府資金と民間投資を組み合わせた包括的な20億ドルの人工知能研究イニシアチブを発表し、世界のAI競争における同国の地位を加速させることを目指しています。このプログラムは、半導体AIチップ、自律システム、ヘルスケア応用に焦点を当てています。\n\nサムスン、LG、SKを含む韓国の主要テクノロジー企業が大きな参加を約束し、新しい研究施設の設立と世界の主要大学との国際協力の拡大を計画しています。"
    },
    category: {
      en: "Policy",
      ja: "政策"
    },
    author: "Kim Min-jun",
    location: "Seoul",
    date: "2024-08-29",
    time: "1 day ago"
  },
  {
    id: "singapore-fintech-hub",
    title: {
      en: "Singapore Reinforces Position as Asia's Fintech Hub",
      ja: "シンガポール、アジアのフィンテック拠点としての地位を強化"
    },
    excerpt: {
      en: "New regulatory framework and innovation sandbox attract global financial technology companies to establish regional headquarters.",
      ja: "新たな規制枠組みとイノベーションサンドボックスが、世界の金融技術企業の地域本部設立を促進。"
    },
    content: {
      en: "Singapore's Monetary Authority has introduced enhanced regulatory frameworks designed to attract fintech innovation while maintaining strict consumer protection standards. The new policies have already resulted in several major international fintech companies announcing plans to establish their Asian headquarters in the city-state.\n\nThe innovation sandbox program allows emerging financial technologies to test their solutions in a controlled environment, fostering entrepreneurship while ensuring regulatory compliance and market stability.",
      ja: "シンガポール通貨庁は、厳格な消費者保護基準を維持しながらフィンテックイノベーションを誘致するよう設計された強化された規制枠組みを導入しました。新政策により、すでに複数の主要国際フィンテック企業がこの都市国家にアジア本部を設立する計画を発表しています。\n\nイノベーションサンドボックスプログラムにより、新興金融技術は管理された環境でソリューションをテストでき、規制遵守と市場安定性を確保しながら起業を促進しています。"
    },
    category: {
      en: "Opinion",
      ja: "意見"
    },
    author: "David Wong",
    location: "Singapore",
    date: "2024-08-28",
    time: "2 days ago"
  },
  {
    id: "vietnam-manufacturing-boom",
    title: {
      en: "Vietnam's Manufacturing Sector Records Historic Growth",
      ja: "ベトナムの製造業、歴史的成長を記録"
    },
    excerpt: {
      en: "Foreign direct investment and domestic consumption drive unprecedented expansion in Vietnamese manufacturing industries.",
      ja: "外国直接投資と国内消費がベトナム製造業の前例のない拡大を牽引。"
    },
    content: {
      en: "Vietnam's manufacturing sector has achieved record-breaking growth rates, driven by increased foreign direct investment and robust domestic demand. The country's strategic position in global supply chains has attracted multinational corporations seeking to diversify their production bases.\n\nGovernment initiatives supporting infrastructure development and workforce training have created favorable conditions for sustained industrial expansion, positioning Vietnam as a key manufacturing destination in Southeast Asia.",
      ja: "ベトナムの製造業は、外国直接投資の増加と堅調な国内需要により、記録的な成長率を達成しています。グローバルサプライチェーンにおける同国の戦略的地位は、生産拠点の多様化を求める多国籍企業を惹きつけています。\n\nインフラ開発と労働力訓練を支援する政府イニシアチブは、持続的な産業拡大に有利な条件を創出し、ベトナムを東南アジアの主要製造拠点として位置づけています。"
    },
    category: {
      en: "Analysis",
      ja: "分析"
    },
    author: "Nguyen Thi Lan",
    location: "Ho Chi Minh City",
    date: "2024-08-27",
    time: "3 days ago"
  }
];