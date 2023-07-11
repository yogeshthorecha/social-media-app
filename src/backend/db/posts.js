import { v4 as uuid } from "uuid";
import { formatDate} from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "Goa Vibes.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/dVqPGxqs/image.png",
    username: "K_Sheru",
    createdAt: "2022-02-04T12:00:00Z",
    updatedAt: formatDate(),
    trending:true
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et us asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/xT0qFHx8/image.png",
    username: "dogesh12",
    createdAt: "2019-06-15T12:00:00Z",
    updatedAt: formatDate(),
    trending:false
  },
  {
    _id: uuid(),
    content:
      "Chimlling",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/zX48Wjy3/image.png",
    username: "dogesh12",
    createdAt: "2023-06-23T12:00:00Z",
    updatedAt: formatDate(),
    trending:true
  },
  {
    _id: uuid(),
    content:
      "fun day with family.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/dts46PTx/image.png",
    username: "K_Sheru",
    createdAt: "2022-06-24T12:00:00Z",
    updatedAt: formatDate(),
    trending:true
  },
  {
    _id: uuid(),
    content:
      "Selfie time!!!!!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/XJ2p0CQF/image.png",
    username: "K_Sheru",
    createdAt: "2021-08-13T12:00:00Z",
    updatedAt: formatDate(),
    trending:false
  },
  {
    _id: uuid(),
    content:
      "My mad friend",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/RZHJx9Bb/image.png",
    username: "P_dogelina",
    createdAt: "2023-02-20T12:00:00Z",
    updatedAt: formatDate(),
    trending:true
  },
  {
    _id: uuid(),
    content:
      "cutie or wotttt.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/L41qh5Hh/image.png",
    username: "P_dogelina",
    createdAt: "2021-06-14T12:00:00Z",
    updatedAt: formatDate(),
    trending:false
  },
  {
    _id: uuid(),
    content:
      "stay classy.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/W4v8YCXw/image.png",
    username: "Chimtu10",
    createdAt: "2021-06-14T12:00:00Z",
    updatedAt: formatDate(),
    trending:false
  },
  {
    _id: uuid(),
    content:
      "colorful day it is....",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/wTt1ykDX/image.png",
    username: "S_bruno",
    createdAt: "2021-06-14T12:00:00Z",
    updatedAt: formatDate(),
    trending:false
  },
  {
    _id: uuid(),
    content:
      "Don't mess with me....",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/rmxKZyFf/image.png",
    username: "D_Doggy",
    createdAt: "2021-06-14T12:00:00Z",
    updatedAt: formatDate(),
    trending:false
  },
  {
    _id: uuid(),
    content:
      "Full Emditing...hue hue hue",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/ZnW6qzT3/image.png",
    username: "D_Doggy",
    createdAt: "2021-06-14T12:00:00Z",
    updatedAt: formatDate(),
    trending:true
  },
  {
    _id: uuid(),
    content:
      "side please, cutie is coming",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/7Y0rCCts/image.png",
    username: "O_Daisy",
    createdAt: "2021-06-14T12:00:00Z",
    updatedAt: formatDate(),
    trending:true
  },
  {
    _id: uuid(),
    content:
      "Oh common......I am on dieting",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    website: "https://www.wikipedia.com",
    image: "https://i.postimg.cc/L54gqK2v/image.png",
    username: "B_Shiro",
    createdAt: "2021-06-14T12:00:00Z",
    updatedAt: formatDate(),
    trending:false
  },
];

