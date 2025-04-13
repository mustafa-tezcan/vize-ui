export let data = [
  {
    id: 1,
    title: "İstanbulda Etkinlik",
    creator: "Mustafa",
    avatar: "https://shorturl.at/ESHZF",
    thumbnails: [
      "https://www.missafir.com/blog/wp-content/uploads/2023/09/istanbul-eylul-konserleri-etkinlik-rehberi.jpg",
      "https://www.missafir.com/blog/wp-content/uploads/2023/10/istanbul-konser.jpg.webp",
      "https://www.missafir.com/blog/wp-content/uploads/2023/10/istanbul-konser.jpg.webp",
    ],
    price: "7.39$",
    participant: "1/2",
    location: "İstanbul Sardunya Sokak no 3 kayisdagi",
    likeCount: 24,
    liked: true,
  },
  {
    id: 2,
    title: "İstanbulda Etkinlik",
    creator: "Mustafa",
    avatar: "https://shorturl.at/ESHZF",
    thumbnails: [
      "https://www.missafir.com/blog/wp-content/uploads/2023/10/istanbul-konser.jpg.webp",
      "https://www.missafir.com/blog/wp-content/uploads/2023/10/istanbul-konser.jpg.webp",
      "https://www.missafir.com/blog/wp-content/uploads/2023/10/istanbul-konser.jpg.webp",
    ],
    price: "7.39$",
    participant: "2/5",
    location: "İstanbul Umraniye",
    likeCount: 13,
    liked: false,
  },
  {
    id: 3,
    title: "İstanbulda Etkinlik",
    creator: "Mustafa",
    avatar: "https://shorturl.at/ESHZF",
    thumbnails: [
      "https://www.missafir.com/blog/wp-content/uploads/2023/09/istanbul-konserleri.jpg",
    ],
    price: "7.39$",
    participant: "3/4",
    location: "İstanbul",
    likeCount: 41,
    liked: true,
  },
];

export const toggleLike = (id) => {
  const index = data.findIndex(item => item.id === id);

};

export const local_data = [
  {
    value: "1",
    lable: "Country 1",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "2",
    lable: "Country 2",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "3",
    lable: "Country 3",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "4",
    lable: "Country 4",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "5",
    lable: "Country 5",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
];


