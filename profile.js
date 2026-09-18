const profileData={
  akio:{
    name:"野島昭生さん",
    birth:"確認中",
    birthplace:"確認中",
    agency:"確認中",
    height:"確認中",
    blood:"確認中",
    sns:"確認中",
    introduction:"ここに管理人からの個人的な紹介文を掲載します。"
  },
  hirofumi:{
    name:"野島 裕史<br>Hirofumi Nojima",
    birth:"1973年4月16日",
    birthplace:"東京都",
    agency:"青二プロダクション",
    height:"166cm",
    blood:"A型",
    sns:"確認中",
    introduction:"ここに管理人からの個人的な紹介文を掲載します。"
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
    ["出身地",profile.birthplace],
    ["所属事務所",profile.agency],
    ["身長",profile.height],
    ["血液型",profile.blood],
    ["SNS",profile.sns]
  ];
  fields.forEach(([label,value])=>{
    const term=document.createElement("dt");
    const description=document.createElement("dd");
    term.textContent=label;
    description.textContent=value;
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
    modalTitle.textContent=profile.name;
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
