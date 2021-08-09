import React, { useState, useEffect } from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/myfeed/Profile";
import PhotoGrid from "../components/myfeed/PhotoGrid";
import PageLoading from "../components/common/PageLoading";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(6, 0),
  },
}));

const myfeed = () => {
  const classes = useStyles();

  const [user, setUser] = useState(null);
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();
      setUser(userInfo);

      const fetchFeedList = await fetch(`/api/feed?userId=${userInfo.uid}`);
      const myFeedList = await fetchFeedList.json();
      setFeedList(myFeedList.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <PageLoading />;
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
