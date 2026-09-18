const profileData={
  akio:{
    name:"野島昭生",
    englishName:"Akio Nojima",
    birth:"1945年4月6日",
    agency:"シグマ・セブン",
    sns:"-",
    introduction:"子役として芸能界に入り、以後声優・ナレーター・声優養成所の講師と活躍の幅を広げる。役者仲間と結成した、自身がリーダーを務めるバンド「スラップスティック」ではギター・ベースを担当。"
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
    name:"野島健児さん",
    birth:"確認中",
    birthplace:"確認中",
    agency:"確認中",
    height:"確認中",
    blood:"確認中",
    sns:"確認中",
    introduction:"ここに管理人からの個人的な紹介文を掲載します。"
  },
  touya:{
    name:"野島透也さん",
    birth:"確認中",
    birthplace:"確認中",
    agency:"確認中",
    height:"確認中",
    blood:"確認中",
    sns:"確認中",
    introduction:"ここに管理人からの個人的な紹介文を掲載します。"
  },
  rui:{
    name:"野島悠生さん",
    birth:"確認中",
    birthplace:"確認中",
    agency:"確認中",
    height:"確認中",
    blood:"確認中",
    sns:"確認中",
    introduction:"ここに管理人からの個人的な紹介文を掲載します。"
  },
  ruku:{
    name:"野島瑠玖さん",
    birth:"確認中",
    birthplace:"確認中",
    agency:"確認中",
    height:"確認中",
    blood:"確認中",
    sns:"確認中",
    introduction:"ここに管理人からの個人的な紹介文を掲載します。"
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
