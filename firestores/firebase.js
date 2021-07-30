import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

try {
  // 초기화 된 경우 파이어베이스 실행
  firebase.app();
} catch {
  // 초기화가 안된 경우 초기화 실행
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
