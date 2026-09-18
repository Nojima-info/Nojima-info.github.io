const profileData={
  akio:{
    name:"野島昭生",
    englishName:"Akio Nojima",
    birth:"1945年4月6日",
    agency:"シグマ・セブン",
    sns:"-",
    introduction:"子役として芸能界に入り、以後声優・ナレーター・声優養成所の講師と活躍の場を広げる。役者仲間と結成した、自身がリーダーを務めるバンド「スラップスティック」ではギター・ベースを担当。"
  },
  hirofumi:{
    name:"野島 裕史",
    englishName:"Hirofumi Nojima",
    birth:"1973年4月16日",
    agency:"青二プロダクション",
    sns:[
  {name:"X",url:"https://x.com/nojimahirofumi?s=11"},
  {name:"Instagram",url:"https://www.instagram.com/nojimahirofumi?stkn=cm1oMmk3ZG12bzZ6"},
      {name:"Threads",url:"https://www.threads.com/@nojimahirofumi?igshid=NTc4MTIwNjQ2YQ=="},
      {name:"Facebook",url:"https://www.facebook.com/share/1KNmhMd3Bk/?mibextid=wwXIfr"}
],
    introduction:"温かみのある優しい声で、幅広い年代を演じる。情報番組やバラエティー番組のナレーションなどでも活躍。パーソナリティーを務めるラジオ番組「サイクリスト・ステーション ツアー・オブ・ジャパン」は今年で放送11年目に突入。"
  },
  kenji:{
    name:"野島健児",
    englishName:"Kenji Nojima",
    birth:"1976年3月16日",
    agency:"青二プロダクション",
    sns:[
  {name:"X",url:"https://x.com/nojimakenji?s=11"},
  {name:"Instagram",url:"https://www.instagram.com/nojima_kenji?stkn=bWYxbGpzcm80Zno3"}
],
    introduction:"爽やかな涼しい声が特徴。自ら企画するイベントや生配信などでは独特の空気感でファンを楽しませる。2026年には「踊る大捜査線 N.E.W. メトロポリスを駆け抜けろ！」にて俳優にも挑戦。"
  },
  touya:{
    name:"野島透也",
    englishName:"Toya Nojima",
    birth:"2003年5月18日",
    agency:"松竹エンタテインメント",
    sns:[
  {name:"X",url:"https://x.com/nojimatoya?s=11"}
],
    introduction:"映画・舞台・吹き替え・ラジオドラマなど、様々な形で俳優・声優として活躍。所属事務所の公式プロフィールページでボイスサンプルを聴くことができる。歌唱力も高く、父・健児と共にオリジナル曲「君と出会うとき」をリリースしている。"
  },
  rui:{
    name:"野島悠生",
      englishName:"Rui Nojima",
    birth:"-",
    agency:"劇団ひまわり",
    sns:"-",
    introduction:"ミュージカル「忍たま乱太郎」(第16弾)では、主人公である猪名寺乱太郎を演じ注目を集める。ほかにアパレルのキッズモデルやラジオドラマの声優としても活躍。"
  },
  ruku:{
    name:"野島瑠玖",
      englishName:"Ruku Nojima",
    birth:"-",
    agency:"劇団ひまわり",
    sns:"-",
    introduction:"2026年、24時間テレビのドラマ「幸せはある」にメインキャラクターとして出演。所属事務所の公式プロフィールページにある「特技」欄は空欄になっており、これからなにが入るのかなぁと管理人が勝手にワクワクしている。"
  }
};
const profileButtons=document.querySelectorAll(".profile-button");
const profileModal=document.querySelector("#profile-modal");
const modalTitle=document.querySelector("#modal-title");
const modalBody=document.querySelector("#modal-body");
const modalClose=document.querySelector("#modal-close");
function createProfileContent(profile){
  const wrapper=document.createElement("div");
  const table=document.createElement("dl");
  const fields=[
    ["生年月日",profile.birth],
    ["所属事務所",profile.agency],
    ["SNS",profile.sns]
  ];
  fields.forEach(([label,value])=>{
  const term=document.createElement("dt");
  const description=document.createElement("dd");
  term.textContent=label;
  if(label==="SNS"&&Array.isArray(value)){
    value.forEach((sns,index)=>{
      const link=document.createElement("a");
      link.href=sns.url;
      link.textContent=sns.name;
      link.target="_blank";
      link.rel="noopener noreferrer";
      description.appendChild(link);
      if(index<value.length-1){
        description.appendChild(document.createTextNode(" / "));
      }
    });
  }else{
    description.textContent=value;
  }
  table.appendChild(term);
  table.appendChild(description);
});
  const introduction=document.createElement("p");
introduction.textContent=profile.introduction;
wrapper.appendChild(table);
wrapper.appendChild(introduction);
  return wrapper;
}
profileButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    const profile=profileData[button.dataset.profile];
    if(!profile||!profileModal||!modalTitle||!modalBody)return;
    modalTitle.replaceChildren();
const japaneseName=document.createElement("span");
japaneseName.textContent=profile.name;
const englishName=document.createElement("span");
englishName.textContent=profile.englishName;
englishName.className="english-name";
modalTitle.appendChild(japaneseName);
modalTitle.appendChild(englishName);
modalBody.replaceChildren(createProfileContent(profile));
    profileModal.hidden=false;
  });
});
if(modalClose&&profileModal){
  modalClose.addEventListener("click",()=>{
    profileModal.hidden=true;
  });
  profileModal.addEventListener("click",event=>{
    if(event.target===profileModal){
      profileModal.hidden=true;
    }
  });
}
