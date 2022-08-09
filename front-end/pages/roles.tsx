import axios from "axios";
import React from "react";
import RolesTable from "../components/RolesTable";

export default function roles({ roles }: any) {
  return (
    <div>
      <RolesTable roles={roles} />
    </div>
  );
}

roles.getInitialProps = async (ctx: any) => {
  const resRole = await axios.get("http://18.141.207.7:3002/roles");
  const roles = await resRole.data.data;

  return { roles: roles };
};
