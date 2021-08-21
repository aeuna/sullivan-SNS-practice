import firebase from "../../firestores/firebase";

const userId = "Xg1W0jvZWl6887BsqsWI";
const db = firebase.firestore();

/*
  내 정보 조회 API
  URL : /api/user/
  method : GET
*/
export async function getUserInfo() {
  const userRef = db.collection("myuser").doc(userId);
  const userDoc = await userRef.get();
  const userInfo = userDoc.data();
  return userInfo;
}

/*
  내 프로필 수정 API
  URL : /api/user/
  method : PATCH
*/
async function updateUser(updateData) {
  const userRef = db.collection("myuser").doc(userId);
  await userRef.update(updateData);
}

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const updateData = req.body;
    await updateUser(updateData);
    return res.status(200).json({ message: "프로필이 수정되었습니다." });
  } else {
    const userInfo = await getUserInfo();
    return res.status(200).json(userInfo);
  }
}
