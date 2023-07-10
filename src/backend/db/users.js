
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 1,
    firstName: "Dogesh",
    lastName: "Cheems",
    username: "dogesh12",
    password: "123",
    bio: "Hey there, dogesh here",
    website: "https://www.wikipedia.com",
    profileAvatar: "https://i.postimg.cc/52JY9znd/image.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        _id:2,
        firstName: "Sheru",
        lastName: "King",
        username: "K_Sheru",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
    ],
    followers: [
      {
        _id: 3,
        firstName: "Dogelina",
        lastName: "Pathak",
        username: "P_dogelina",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
    ],
  },
  {
    _id: 2,
    firstName: "Sheru",
    lastName: "King",
    username: "K_Sheru",
    password: "sheru123",
    website: "https://www.wikipedia.com",
    bio: "Hey there, Sheru here",
    profileAvatar: "https://i.postimg.cc/fbbW69bB/image.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        _id: 4,
        firstName: "Bruno",
        lastName: "Sharma",
        username: "S_bruno",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
    ],
    followers: [
      {
        _id: 3,
        firstName: "Dogelina",
        lastName: "Pathak",
        username: "P_dogelina",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
      {
        _id: 1,
        firstName: "dogesh",
        lastName: "cheems",
        username: "dogesh12",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
    ],
  },
  {
    _id: 3,
    firstName: "Dogelina",
    lastName: "Pathak",
    username: "P_dogelina",
    password: "dogelina123",
    website: "https://www.wikipedia.com",
    bio: "Hey there, Dogelina here",
    profileAvatar: "https://i.postimg.cc/LX7kxVLg/image.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        _id: 2,
        firstName: "Sheru",
        lastName: "King",
        username: "K_Sheru",
        profileAvatar: "https://picsum.photos/id/1012/150",
      },
      {
        _id: 1,
        firstName: "dogesh",
        lastName: "cheems",
        username: "dogesh12",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
    ],
    followers: [
      {
        _id: 4,
        firstName: "Bruno",
        lastName: "Sharma",
        username: "S_bruno",
        profileAvatar: "https://picsum.photos/id/1005/150",
      },
      {
        _id: 5,
        firstName: "Chimtu",
        lastName: "Khanna",
        username: "Chimtu10",
        profileAvatar: "https://picsum.photos/id/1012/150",
      },
    ],
  },
  {
    _id: 5,
    firstName: "Chimtu",
    lastName: "Khanna",
    username: "Chimtu10",
    password: "chimtu123",
    website: "https://www.wikipedia.com",
    bio: "Hey there, Chimtu here",
    profileAvatar: "https://i.postimg.cc/vm5XwcSx/image.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        _id: 4,
        firstName: "Bruno",
        lastName: "Sharma",
        username: "S_bruno",
        profileAvatar: "https://picsum.photos/id/1012/150",
      },
      {
        _id: 3,
        firstName: "Dogelina",
        lastName: "Pathak",
        username: "P_dogelina",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
    ],
    followers: [
      {
        _id: 4,
        firstName: "Bruno",
        lastName: "Sharma",
        username: "S_bruno",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
    ],
  },
  {
    _id: 4,
    firstName: "Bruno",
    lastName: "Sharma",
    username: "S_bruno",
    password: "bruno123",
    bio: "Hello tindog, bruno here! bho bho",
    website: "https://www.wikipedia.com",
    profileAvatar: "https://i.postimg.cc/XYfnZgr2/image.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        _id: 3,
        firstName: "Dogelina",
        lastName: "Pathak",
        username: "P_dogelina",
        profileAvatar: "https://picsum.photos/id/1012/150",
      },
      {
        _id: 5,
        firstName: "Chimtu",
        lastName: "Khanna",
        username: "Chimtu10",
        profileAvatar: "https://picsum.photos/id/1005/150",
      },
    ],
    followers: [
      {
        _id: 2,
        firstName: "Sheru",
        lastName: "King",
        username: "K_Sheru",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
      {
        _id: 5,
        firstName: "Chimtu",
        lastName: "Khanna",
        username: "Chimtu10",
        profileAvatar: "https://picsum.photos/id/1005/150",
      },
    ],
  },
  {
    _id: 6,
    firstName: "Doggy",
    lastName: "Don",
    username: "D_Doggy",
    password: "Doggy123",
    bio: "Hello tindog, Doggy here! bho bho",
    website: "https://www.wikipedia.com",
    profileAvatar: "https://i.postimg.cc/CxsRhXKb/image.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      
    ],
    followers: [
      
    ],
  },
  {
    _id: 7,
    firstName: "Shiro",
    lastName: "Baby",
    username: "B_Shiro",
    password: "Shiro123",
    bio: "Hello tindog, Shiro here! bho bho",
    website: "https://www.wikipedia.com",
    profileAvatar: "https://i.postimg.cc/ZRrg28HY/image.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      
    ],
    followers: [
      
    ],
  },
  {
    _id: 8,
    firstName: "Daisy",
    lastName: "Oberoy",
    username: "O_Daisy",
    password: "Daisy123",
    bio: "Hello tindog, Daisy here! bho bho",
    website: "https://www.wikipedia.com",
    profileAvatar: "https://i.postimg.cc/G2HNh0b2/image.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      
    ],
    followers: [
      
    ],
  },
];
