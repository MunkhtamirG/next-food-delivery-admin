import { Container } from "@mui/material";
import axios from "axios";
import React from "react";
import UserTable from "../components/UserTable";

export default function users({ users, roles }: any) {
  return (
    <div>
      <UserTable users={users} roles={roles} />
    </div>
  );
}

users.getInitialProps = async (ctx: any) => {
  const resUsers = await axios.get("http://13.250.98.180:3002/users");
  const users = await resUsers.data.data;
  const resRole = await axios.get("http://13.250.98.180:3002/roles");
  const roles = await resRole.data.data;

  return { users: users, roles: roles };
};
