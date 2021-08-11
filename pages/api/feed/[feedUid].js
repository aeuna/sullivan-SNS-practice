import firebase from "../../../firestores/firebase";

const db = firebase.firestore();

/*
  상세 피드 조회 API
  URL : /api/feed/{feedUid}
  method : GET
*/
export async function getFeedDetail(feedUid) {
  const feedRef = db.collection("feed").doc(feedUid);
  const feedDoc = await feedRef.get();
  let feedDetail = feedDoc.data();
  feedDetail.create_at = JSON.parse(JSON.stringify(feedDetail.create_at));
  return feedDetail;
}

/*
  상세 피드 수정 API
  URL : /api/feed/{feedUid}
  method : PATCH
*/
async function updateFeed(feedUid, updateData) {
  const feedRef = db.collection("feed").doc(feedUid);
  await feedRef.update(updateData);
}

/*
  상세 피드 삭제 API
  URL : /api/feed/{feedUid}
  method : DELETE
*/
async function deleteFeed(feedUid, userId) {
  // 피드 삭제
  const feedRef = db.collection("feed").doc(feedUid);
  await feedRef.delete();

  // 사용자 피드 리스트 업데이트
  const userRef = db.collection("myuser").doc(userId);
  const userSnapshot = await userRef.get();
  const userFeedList = userSnapshot.data().feedList;
  const userLikeFeeds = userSnapshot.data().likeFeeds;

  const newFeedList = userFeedList.filter((feed) => {
    return feed.feedId !== feedUid;
  });

  const newLikeFeeds = userLikeFeeds.filter((feed) => {
    return feed !== feedUid;
  });

  await userRef.update({
    feedList: newFeedList,
    likeFeeds: newLikeFeeds,
  });
}

export default async function handler(req, res) {
  const { feedUid, userId } = req.query;

  if (req.method === "PATCH") {
    const updateData = req.body;
    await updateFeed(feedUid, updateData);
    return res.status(200).json({ message: "수정되었습니다." });
  }
  if (req.method === "DELETE") {
    await deleteFeed(feedUid, userId);
    return res.status(200).json({ message: "삭제되었습니다." });
  } else {
    const feedDetail = await getFeedDetail(feedUid);
    return res.status(200).json(feedDetail);
  }
}
