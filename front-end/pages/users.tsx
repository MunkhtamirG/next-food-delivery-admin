import { Container } from "@mui/material";
import axios from "axios";
import React from "react";
import UserTable from "../components/UserTable";

export default function users({ users }: any) {
  return (
    <div>
      <UserTable users={users} />
    </div>
  );
}

users.getInitialProps = async (ctx: any) => {
  const resUsers = await axios.get("http://18.141.207.7:3002/users");
  const users = await resUsers.data.data;

  return { users: users };
};
