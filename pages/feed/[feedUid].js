import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { getFeedDetail } from "../api/feed/[feedUid].js";
import { getUserInfo } from "../api/user";
import DetailFeed from "../../components/feed/DetailFeed";
import Comment from "../../components/feed/Comment";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  feed: {
    textAlign: "center",
    height: "100%",
  },
}));

export const getServerSideProps = async (context) => {
  /* 1.context에서 무엇을 가져와야 할까요? */
  const { feedUid } = context.query;

  /* 2. api폴더 속에서, 알맞은 함수를 불러와주세요. */
  const user = await getUserInfo();

  /* 3. api폴더 속에서, 알맞은 함수를 불러와주세요. 파라미터필요 */
  const feedDetail = await getFeedDetail(feedUid);

  /* 4.전달해야 할 props를 return 해주세요. (3가지) */
  return {
    props: {
      feedUid,
      user,
      feedDetail,
    },
  };
};

const detail = ({ feedUid, user, feedDetail }) => {
  const classes = useStyles();
  const router = useRouter();

  async function deleteFeed() {
    try {
      /* 1.유저의 피드를 삭제하기 위해 알맞은 api 요청을 보내주세요. (옵션 필요) */
      const deleteResult = await fetch(
        `/api/feed/${feedUid}?userId=${feedDetail.author.uid}`,
        { method: "DELETE" }
      );
      const { message } = await deleteResult.json();

      /* 2.정상적으로 삭제 후, 메인 피드 화면으로 이동하게 해주세요. query 값으로 message를 보내주세요. */
      router.push({
        pathname: "/feed",
        query: { message },
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={8} className={classes.feed}>
        {/* 알맞은 props를 전달해주세요. */}
        <DetailFeed feed={feedDetail} deleteHandler={deleteFeed} user={user} />
      </Grid>
      <Grid item xs={4}>
        <Comment user={user} feedType={"detail"} />
      </Grid>
    </Grid>
  );
};

export default detail;
