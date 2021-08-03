import React from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/myfeed/Profile";
import PhotoGrid from "../components/myfeed/PhotoGrid";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(6, 0),
  },
}));

const myfeed = () => {
  const classes = useStyles();

  const user = {
    caption: "안녕하세요 반가워요 🙂",
    displayName: "설리번 선생님",
    feedList: [1, 2, 3, 4],
    likeFeeds: [1],
    photoUrl:
      "https://firebasestorage.googleapis.com/v0/b/sullivan-sns.appspot.com/o/SFCKJmd9KzCpO5H77wz1%2F40ce6140-e770-479b-98ac-61a636308b43?alt=media&token=083b8736-cbba-445c-b4cd-bebd41e76468",
    uid: "SFCKJmd9KzCpO5H77wz1",
    webpage: "https://sullivanproject.io/",
  };

  const feedList = [
    {
      uid: 1,
      photoUrl:
        "//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/oeE/image/Kq8LnsZRAMtEOfILEXIGsu9VTRE.jpg",
      author: user,
    },
    {
      uid: 2,
      photoUrl:
        "//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/oeE/image/3t40iGS1RdVqrL8rm29-_16UPE8",
      author: user,
    },
    {
      uid: 3,
      photoUrl:
        "//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/oeE/image/sh4vBIgywdcjODOoGWb3ZCXqgt4",
      author: user,
    },
    {
      uid: 4,
      photoUrl:
        "//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/oeE/image/1ukYKsDSrArjOc-YwmRamJcs5zw",
      author: user,
    },
  ];

  return (
    <>
      {/* Profile 컴포넌트(유저의 프로필 정보를 가진 컴포넌트)를 조립해주세요. */}
      <Profile user={user} />
      <Divider variant="middle" light className={classes.divider} />
      {/* PhotoGrid 컴포넌트(유저가 올린 피드가 뜨는 컴포넌트)를 조립해주세요. */}
      <PhotoGrid feedList={feedList} />
    </>
  );
};

export default myfeed;
