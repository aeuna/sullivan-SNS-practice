import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
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
  const { feedUid } = context.query;
  /* 1.유저의 정보를 가져오기 위해 알맞은 api 요청을 보내주세요. */
  const fetchUserInfo = await fetch(/* 채워주세요. */);
  const user = await fetchUserInfo.json();

  /* 2.한 피드의 디테일 정보를 가져오기 위해 알맞은 api 요청을 보내주세요. */
  const fetchFeedDetail = await fetch(/* 채워주세요. */);
  const feedDetail = await fetchFeedDetail.json();

  /* 3.전달해야 할 props를 return 해주세요. (3가지) */
  return {
    props: {
      /* 채워주세요. */
    },
  };
};

const detail = ({/* 알맞은 props를 전달해주세요. */}) => {
  const classes = useStyles();
  const router = useRouter();

  async function deleteFeed() {
    try {
      /* 1.유저의 피드를 삭제하기 위해 알맞은 api 요청을 보내주세요. (옵션 필요) */
      const deleteResult = await fetch( /* 채워주세요. */, { method:  /* 채워주세요. */ });
      const { message } = await deleteResult.json();

      /* 2.정상적으로 삭제 후, 메인 피드 화면으로 이동하게 해주세요. query 값으로 message를 보내주세요. */
      router.push({
        pathname:/* 채워주세요. */,
        query: /* 채워주세요. */,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={8} className={classes.feed}>
        {/* 알맞은 props를 전달해주세요. */} 
        <DetailFeed feed={/* 채워주세요. */} deleteHandler={/* 채워주세요. */} user={/* 채워주세요. */} />
      </Grid>
      <Grid item xs={4}>
        <Comment user={user} feedType={"detail"} />
      </Grid>
    </Grid>
  );
};

export default detail;
