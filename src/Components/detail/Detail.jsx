import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth } from "../../lib/firebase"
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import "./detail.css"
import { db } from "../../lib/firebase";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
  const {currentUser} = useUserStore();
  
  const handleBlock = async () => {
    if(!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try{
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>이것은 채팅 입니다.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>채팅 설정</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>공유된 사진들</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./favicon.png" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "당신은 차단 되었습니다." 
            : isReceiverBlocked 
            ? "차단 하였습니다." 
            : "차단"}
        </button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail