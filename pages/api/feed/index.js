import firebase from "../../../firestores/firebase";

const db = firebase.firestore();

/*
  전체 피드 목록 조회 API
  URL : /api/feed
  method : GET
*/
async function getFeedList() {
  let feedList = [];
  const feedRef = db.collection("feed");
  const feedSnapshot = await feedRef.orderBy("create_at", "desc").get();
  feedSnapshot.forEach((doc) => {
    feedList.push(doc.data());
  });
  return feedList;
}

/*
  내 피드 목록 조회 API
  URL : /api/feed/{userId}
  method : GET
*/
async function getMyFeedList(userId) {
  const myFeedList = [];
  const feedRef = db.collection("feed");
  const feedSnapshot = await feedRef.orderBy("create_at", "desc").get();
  feedSnapshot.forEach((doc) => {
    if (doc.data().author.uid === userId) {
      myFeedList.push(doc.data());
    }
  });
  return myFeedList;
}

/*
  피드 생성 API
  URL : /api/feed
  method : POST
*/
async function createFeed(createData) {
  const createParams = {
    ...createData,
    create_at: new Date(),
    like: 0,
  };

  // 피드 생성
  const feedRef = db.collection("feed").doc(createData.uid);
  await feedRef.set(createParams);

  // 사용자 피드 리스트 업데이트
  const userRef = db.collection("myuser").doc(createData.author.uid);
  const userSnapshot = await userRef.get();
  const userFeedList = userSnapshot.data().feedList;
  let newFeedList;
  if (userFeedList) {
    newFeedList = [...userFeedList, { feedId: createData.uid }];
  } else {
    newFeedList = [{ feedId: createData.uid }];
  }
  await userRef.update({ feedList: newFeedList });
}

export default async function handler(req, res) {
  const { userId } = req.query;

  if (userId) {
    const myFeedList = await getMyFeedList(userId);
    return res.status(200).json({ data: myFeedList });
  }
  if (req.method === "POST") {
    const createData = req.body;
    await createFeed(createData);
    return res.status(200).json({ message: "등록되었습니다." });
  } else {
    const feedList = await getFeedList();
    return res.status(200).json({ data: feedList });
  }
}
