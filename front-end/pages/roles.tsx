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
  const resRole = await axios.get("http://13.250.98.180:3002/roles");
  const roles = await resRole.data.data;

  return { roles: roles };
};
