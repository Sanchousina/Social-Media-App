import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const logOut = async () => {
    await signOut(auth);
  }

  return (
    <div>
      <Link to={'/'}>Main</Link>
      <Link to={'/login'}>Login</Link>

      {user && (
      <div>
        <p>{user?.displayName}</p>
        <img src={user?.photoURL || ""} width="100" height="100"/>
        <button onClick={logOut}>Log out</button>
      </div>
      )}
    </div>
  )
}