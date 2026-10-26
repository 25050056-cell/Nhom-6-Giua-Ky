const members = [
  {
    name: "hải anh",
    className: "28TH01",
    image: "haianh.jpg",
    profile: "../members/Nguyen Hai Anh_25050056/index.html",
  },
  {
    name: "minh",
    className: "28TH01",
    image: "../members/voledangminh_25050058/minh.jpg",
    profile: "../members/voledangminh_25050058/minh.html",
  }, 
  { 
    name: "hòa", 
    className: "28TH01",
    image: "Xuan_Hoa_045.jpg",
    profile: "../members/Pham_Vo_Xuan_Hoa_25050045/index.html", 
  },
  {
    name: "Đạt",
    className: "28TH01",
    image: "25050030.jpg",
    profile: "../members/NguyenTanDat_25050030/25050030.html",
  },
];

const memberGrid = document.querySelector(".member-grid");

members.forEach((member) => {
  const card = document.createElement("article");
  card.className = "member-card";

  const photo = document.createElement("img");
  photo.className = "member-photo";
  photo.alt = `Ảnh của ${member.name}`;
  if (member.image) {
    photo.src = member.image;
  }

  if (member.profile) {
    const photoLink = document.createElement("a");
    photoLink.className = "member-photo-link";
    photoLink.href = member.profile;
    photoLink.setAttribute("aria-label", `Xem hồ sơ của ${member.name}`);
    photoLink.append(photo);
    card.append(photoLink);
  } else {
    card.append(photo);
  }

  const info = document.createElement("div");
  info.className = "member-info";

  const name = document.createElement("h2");
  name.textContent = member.name;

  const className = document.createElement("p");
  className.textContent = member.className;

  info.append(name, className);
  card.append(info);
  memberGrid.append(card);
});
