import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CreateIcon from "@mui/icons-material/Create";
import { Link } from "react-router-dom";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {
  const [APIData, setAPIData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelSucDia, setOpenDelSucDia] = useState(false);
  const [idDelete, setIdDelete] = useState(-1);
  const deleteStaffsUrl = `https://65375d06bb226bb85dd31d1e.mockapi.io/api/pe_test/staffManagement`;
  const getStaffsUrl =
    "https://65375d06bb226bb85dd31d1e.mockapi.io/api/pe_test/staffManagement";

  useEffect(() => {
    loadStaffs();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpenDelSucDia(false);
    loadStaffs();
  };

  const deleteStaff = () => {
    setOpen(false);
    axios
      .delete(deleteStaffsUrl + `/${idDelete}`)
      .then((response) => {
        return response.data;
      })
      .then((data) => setOpenDelSucDia(true))
      .catch((error) => console.log(error.message));
  };

  const showConfirmDeleteDialog = (id) => {
    setIdDelete(id);
    setOpen(true);
  };

  const loadStaffs = () => {
    axios
      .get(getStaffsUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setAPIData(
          data.sort((a, b) => {
            return a.id - b.id;
          })
        );
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="pt-5">
      <TableContainer component={Paper} className="container">
        <Grid item container xs={12} alignItems="flex-end" direction="column">
          <Grid item>
            <Tooltip title="Add" placement="right">
              <Link to="/addNewStaff">
                <Button align="right" variant="contained" className="mt-2">
                  <CreateIcon /> Create Staff
                </Button>
              </Link>
            </Tooltip>
          </Grid>{" "}
        </Grid>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left"> </TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((staff) => (
              <TableRow
                key={staff.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {staff.id}
                </TableCell>
                <TableCell>
                  <Avatar alt={staff.name} src={staff.avatar} />
                </TableCell>
                <TableCell align="left">{staff.name}</TableCell>
                <TableCell align="left">{staff.age}</TableCell>
                <TableCell align="left">{staff.address}</TableCell>
                <TableCell align="right">
                  <Grid container spacing={2}>
                    <Grid item>
                      <Link to={`/updateStaff/${staff.id}`}>
                        <Tooltip title="Update" placement="right">
                          <Button
                            align="right"
                            variant="outlined"
                            className="mt-2"
                          >
                            <PostAddIcon color="warning" />
                          </Button>
                        </Tooltip>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Delete" placement="right">
                        <Button
                          align="right"
                          variant="outlined"
                          className="mt-2"
                        >
                          <DeleteIcon
                            onClick={(e) => {
                              showConfirmDeleteDialog(staff.id);
                            }}
                            color="error"
                          />
                        </Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Staff"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="warning">
              <AlertTitle>Are you sure to delete this staff ?</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteStaff}>Yes</Button>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelSucDia}
        onClose={handleOk}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Delete Staff Successfully</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
