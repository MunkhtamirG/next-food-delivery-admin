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

export default function UserTable({ users }: any) {
  const [render, setRender] = React.useState(true);
  const router = useRouter();
  return (
    <div style={{ margin: "auto", width: "auto" }}>
      <TableContainer style={header}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map(
              (user: {
                id: number;
                firstName: string;
                lastName: string;
                email: string;
                address: string;
                phone: number;
                role_id: number;
              }) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{user.firstName}</TableCell>
                  <TableCell align="right">{user.lastName}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.address}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">{user.role_id}</TableCell>

                  <TableCell align="right">
                    <Button
                      href={`http://localhost:3000/users/edit/${user.id}`}
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
                        axios.delete("http://18.141.207.7:3002/users", {
                          data: user,
                        });
                        router.push("/users");
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
      <div>
        <Button
          variant="contained"
          color="success"
          style={{ width: "100%" }}
          onClick={() => {
            router.push("/users/add");
          }}
        >
          <AddCircleIcon /> Add User
        </Button>
      </div>
    </div>
  );
}
