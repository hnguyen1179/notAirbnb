import React, { useContext } from "react";
import useLogout from "../hooks/useLogout";
import AppContext from "../context/app-context";
import Loading from "./Loading";

function Navbar() {
  const { user } = useContext(AppContext);
  const handleLogout = useLogout();
	return (
    <div>
      <Loading />
      {user ? <h1>hello, {user.firstName}</h1> : <a href="/">sign in</a>}
      {user ? <button onClick={handleLogout}>logout</button> : ""}
		</div>
	);
}

export default Navbar;
