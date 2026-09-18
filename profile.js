const profileData={
  akio:{
    name:"野島昭生さん",
    content:"ここに野島昭生さんのプロフィールを掲載します。"
  },
  hirofumi:{
    name:"野島裕史さん",
    content:"ここに野島裕史さんのプロフィールを掲載します。"
  },
  kenji:{
    name:"野島健児さん",
    content:"ここに野島健児さんのプロフィールを掲載します。"
  },
  touya:{
    name:"野島透也さん",
    content:"ここに野島透也さんのプロフィールを掲載します。"
  },
  yuki:{
    name:"野島悠生さん",
    content:"ここに野島悠生さんのプロフィールを掲載します。"
  },
  ruku:{
    name:"野島瑠玖さん",
    content:"ここに野島瑠玖さんのプロフィールを掲載します。"
  }
};
const profileButtons=document.querySelectorAll(".profile-button");
const profileModal=document.querySelector("#profile-modal");
const modalTitle=document.querySelector("#modal-title");
const modalBody=document.querySelector("#modal-body");
const modalClose=document.querySelector("#modal-close");
profileButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    const profile=profileData[button.dataset.profile];
    if(!profile||!profileModal||!modalTitle||!modalBody)return;
    modalTitle.textContent=profile.name;
    modalBody.textContent=profile.content;
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
