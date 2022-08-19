import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const header: {} = {
  color: "white",
};

export default function RolesTable({ roles }: any) {
  const [render, setRender] = React.useState(true);
  const router = useRouter();
  return (
    <div style={{ margin: "auto", width: "auto" }}>
      <TableContainer style={header}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                ID
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Role Name
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Role Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles?.map(
              (role: {
                id: number;
                role_name: string;
                role_description: string;
              }) => (
                <TableRow
                  key={role.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {role.id}
                  </TableCell>
                  <TableCell align="right">{role.role_name}</TableCell>
                  <TableCell align="right">{role.role_description}</TableCell>
                  <TableCell align="right">
                    <Button
                      href={`http://localhost:3000/roles/edit/${role.id}`}
                      variant="outlined"
                    >
                      {<EditIcon />}
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        axios.delete("http://13.250.98.180:3002/roles", {
                          data: role,
                        });
                        router.push("/roles");
                        setRender(false);
                      }}
                    >
                      {<DeleteIcon />}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ margin: "auto" }}>
        <Button
          variant="contained"
          color="success"
          style={{ width: "100%" }}
          onClick={() => {
            router.push("/roles/add");
          }}
        >
          <AddCircleIcon /> Add Role
        </Button>
      </div>
    </div>
  );
}
