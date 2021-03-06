import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "../../components/common/Snackbar";
import MainFeed from "../../components/feed/MainFeed";
import PageLoading from "../../components/common/PageLoading";

const feed = () => {
  const router = useRouter();
  const { message } = router.query;
  /* feeds, user, likeFeeds, loading 상태를 관리하도록 useState를 사용해주세요. 초기값 null (4줄) */
  const [feeds, setFeeds] = useState(null);
  const [user, setUser] = useState(null);
  const [likeFeeds, setLikeFeeds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      /* 1. api를 통해 접속한 유저의 정보를 가져오세요. */
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();

      /* 2. 유저의 정보로 상태 변화를 시켜주세요. (1줄) */
      setUser(userInfo);

      /* 3. 유저가 좋아요 한 feed들의 정보로 상태 변화를 시켜주세요. (1줄) */
      setLikeFeeds(userInfo.likeFeeds);

      /* 4. api를 통해 피드 전체를 가져오세요. */
      const fetchFeedList = await fetch("/api/feed");
      const feedList = await fetchFeedList.json();

      /* 5. 피드 전체 정보로 상태 변화를 시켜주세요. (1줄) */
      setFeeds(feedList.data);

      /* 6. 로딩 상태를 false로 바꿔주세요. (1줄) */
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <PageLoading />;
  return (
    <div>
      {feeds.map((feed) => (
        <MainFeed
          key={feed.uid}
          user={user}
          feed={feed}
          likeFeeds={likeFeeds}
          setLikeFeeds={setLikeFeeds}
        />
      ))}
      {message && <Snackbar resultMessage={message} durationProps={1400} />}
    </div>
  );
};

export default feed;
