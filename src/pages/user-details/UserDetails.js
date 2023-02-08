import React from "react";
import { Link } from "react-router-dom";


const UserDetails = ({ users }) => (
  <lu>
    {users.map((user) => (
      <li key={user.id}>
        <Link to={`/user/${user.id}`}>{user.name}</Link>
      </li>
    ))}
  </lu>
);

export default UserDetails;
