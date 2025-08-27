export interface BusinessTip {
  id: string;
  title: string;
  titleJa: string;
  description: string;
  descriptionJa: string;
  readTime: string;
  imageUrl?: string;
  content: string[];
  contentJa: string[];
}

export const businessTips: BusinessTip[] = [
  {
    id: "manage-thai-staff",
    title: "5 Techniques to Manage Thai National Staff as Desired",
    titleJa: "タイ人スタッフを思い通りに管理する5つのテクニック",
    description: "Effective strategies for international managers working with Thai employees in multicultural environments.",
    descriptionJa: "多文化環境でタイ人従業員と働く国際的なマネージャーのための効果的な戦略。",
    readTime: "3 min read",
    content: [
      "Understand the concept of 'Kreng Jai' - the Thai cultural value of consideration and reluctance to burden others.",
      "Use indirect communication and provide face-saving opportunities when giving feedback or corrections.",  
      "Build personal relationships first before focusing on business tasks - invest time in getting to know your team.",
      "Recognize hierarchical respect and ensure clear chain of command while maintaining approachable leadership.",
      "Celebrate achievements publicly and provide constructive criticism privately to maintain team harmony."
    ],
    contentJa: [
      "「グレンジャイ」の概念を理解する - 他者への配慮と負担をかけることへの遠慮というタイの文化的価値。",
      "間接的なコミュニケーションを使い、フィードバックや修正を行う際は面子を保つ機会を提供する。",
      "ビジネスタスクに集中する前に、まず個人的な関係を築く - チームを知ることに時間を投資する。",
      "階層への敬意を認識し、親しみやすいリーダーシップを維持しながら明確な指揮系統を確保する。",
      "成果は公に称賛し、建設的な批判は私的に行い、チームの調和を維持する。"
    ]
  },
  {
    id: "cross-cultural-meetings",
    title: "7 Ways to Run Effective Cross-Cultural Business Meetings",
    titleJa: "効果的な異文化ビジネス会議を運営する7つの方法",
    description: "Maximize productivity and engagement in international business meetings with diverse teams.",
    descriptionJa: "多様なチームとの国際ビジネス会議で生産性と参加を最大化する。",
    readTime: "4 min read",
    content: [
      "Start meetings with relationship-building time to accommodate high-context cultures like Thailand.",
      "Use visual aids and written summaries to bridge language barriers and ensure understanding.",
      "Allow silence and processing time - not everyone communicates at the same pace or style.",
      "Rotate speaking opportunities to ensure all cultural communication styles are represented.",
      "Follow up with written action items in multiple languages if necessary for clarity.",
      "Respect different concepts of time - build buffer time for relationship-focused cultures.",
      "Create psychological safety where team members feel comfortable expressing disagreement respectfully."
    ],
    contentJa: [
      "タイのような高コンテクスト文化に配慮し、関係構築の時間から会議を始める。",
      "視覚的補助と書面での要約を使用し、言語の壁を橋渡しして理解を確実にする。",
      "沈黙と処理時間を許可する - 全員が同じペースやスタイルでコミュニケーションを取るわけではない。",
      "発言機会を順番に回し、すべての文化的コミュニケーションスタイルが代表されるようにする。",
      "必要に応じて複数言語で書面のアクションアイテムをフォローアップし、明確性を確保する。",
      "異なる時間概念を尊重し、関係重視の文化のためにバッファー時間を設ける。",
      "チームメンバーが敬意を持って異議を表明できる心理的安全性を作る。"
    ]
  },
  {
    id: "thai-business-etiquette",
    title: "Essential Thai Business Etiquette for International Executives",
    titleJa: "国際的な経営者のための必須タイビジネスエチケット",
    description: "Navigate Thai business culture successfully with these fundamental etiquette guidelines.",
    descriptionJa: "これらの基本的なエチケットガイドラインでタイのビジネス文化を成功裏にナビゲートする。",
    readTime: "5 min read",
    content: [
      "Master the 'wai' greeting - hands pressed together at chest level with slight bow, reciprocate appropriately.",
      "Exchange business cards with both hands and receive them with respect, take time to read them carefully.",
      "Dress conservatively and professionally - long sleeves and formal attire show respect for business culture.",
      "Use titles and formal address until invited to use first names, showing respect for hierarchical structure.",
      "Avoid pointing with feet or showing shoe soles, keep feet flat on floor during meetings.",
      "Practice patience in decision-making processes - consensus-building takes time in Thai business culture.",
      "Bring small gifts for hosts and wrap them nicely, but avoid giving in sets of four (unlucky number)."
    ],
    contentJa: [
      "「ワイ」の挨拶をマスターする - 胸の高さで手を合わせ軽くお辞儀、適切に返礼する。",
      "名刺は両手で交換し、敬意を持って受け取り、時間をかけて丁寧に読む。",
      "保守的で専門的な服装をする - 長袖と正装はビジネス文化への敬意を示す。",
      "ファーストネームの使用を招待されるまで、敬称と正式な呼び方を使用し、階層構造への敬意を示す。",
      "足で指差したり靴底を見せることを避け、会議中は足を床に平らに置く。",
      "意思決定プロセスで忍耐を実践する - タイのビジネス文化では合意形成に時間がかかる。",
      "ホストへの小さな贈り物を持参し、きれいに包装するが、4つのセット（不運な数字）での贈呈は避ける。"
    ]
  },
  {
    id: "digital-transformation-thailand",
    title: "6 Steps to Lead Digital Transformation in Thai Organizations",
    titleJa: "タイの組織でデジタル変革をリードする6つのステップ",
    description: "Successfully implement digital initiatives while respecting traditional Thai business values.",
    descriptionJa: "伝統的なタイのビジネス価値を尊重しながらデジタル施策を成功裏に実装する。",
    readTime: "4 min read",
    content: [
      "Start with relationship-building and trust establishment before introducing major technological changes.",
      "Provide comprehensive training programs that accommodate different learning styles and technological comfort levels.",
      "Implement changes gradually to allow adaptation time and reduce resistance from traditional mindsets.",
      "Involve local champions and influencers to advocate for digital initiatives within their peer groups.",
      "Communicate benefits clearly in both business and personal terms that resonate with Thai values.",
      "Create feedback loops and adjustment mechanisms to ensure technology serves people, not the reverse."
    ],
    contentJa: [
      "主要な技術変更を導入する前に、関係構築と信頼確立から始める。",
      "異なる学習スタイルと技術的快適レベルに対応する包括的なトレーニングプログラムを提供する。",
      "適応時間を可能にし、伝統的な考え方からの抵抗を減らすため、変更を段階的に実装する。",
      "地元のチャンピオンとインフルエンサーを巻き込み、仲間グループ内でデジタル施策を支持してもらう。",
      "タイの価値観に共鳴するビジネスと個人の両方の観点で利益を明確に伝達する。",
      "技術が人に仕える、逆ではないことを確実にするフィードバックループと調整メカニズムを作る。"
    ]
  }
];