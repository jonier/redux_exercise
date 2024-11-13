import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/sliders/auth/authSlice";
import { fetchUsers } from "../redux/sliders/auth/authSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(fetchUsers()); //Get all users
  }, [dispatch])

  console.log('Vea pues: ', users)

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div>
      <button onClick={handleLogout}> Cerrar sesión </button>
      <div>
        {users.map((user) => (
          <div style={{ display: "flex", marginTop: '15px' }} key={user._id}>
            <div style={{ width: '150px' }}>{user.firstName} {user.lastName}</div>
            <div style={{ width: '200px' }}>{user.email}</div>
            <div style={{ width: '150px' }}>{user.userName}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoutPage