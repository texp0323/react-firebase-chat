import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
    const [avatar,setAvatar] = useState({
        file:null,
        url:""
    })

    const [loading, setLoading] = useState(false)

    const handleAvatar = (e) =>{
        if(e.target.files[0])
        {
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target);

        const {username, email, password} = Object.fromEntries(formData);

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file)

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });

            toast.success("계정이 생성 되었습니다.")
        } catch(err){
            console.log(err);
            toast.error(err.message)
        } finally{
            setLoading(false)
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const {email, password} = Object.fromEntries(formData);

        try{

            await signInWithEmailAndPassword(auth,email,password);
        }catch(err){
            console.log(err);
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <div className='login'>
        <div className="item">
            <h2>잘 돌아오셨습니다,</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="이메일" name="email"/>
                <input type="text" placeholder="비밀번호" name="password"/>
                <button disabled={loading}>{loading ? "Loading" : "로그인"}</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>회원가입</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    사진을 업로드 하세요
                </label>
                <input 
                    type="file" 
                    id="file" 
                    style={{display:"none"}} 
                    onChange={handleAvatar}
                />
                <input type="text" placeholder="닉네임" name="username"/>
                <input type="text" placeholder="이메일" name="email"/>
                <input type="text" placeholder="비밀번호" name="password"/>
                <button disabled={loading}>{loading ? "Loading" : "회원가입"}</button>
            </form>
        </div>
    </div>
  )
}

export default Login