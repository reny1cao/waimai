import React from "react";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"

import UserAdmin from "./UserAdmin";

class UserList extends React.Component {
  render() {
    const { users, AdminComponent, handleChangeEdit} = this.props;

    /* Our student list.  We use the state to iterate through the 
       student list and make an <li> for each one. */
    return (
        <TableContainer>
            <Table className="user-list" size="small">
                <TableHead>
                        <TableRow>
                            <TableCell > <strong> Name </strong></TableCell>
                            <TableCell > <strong> Address </strong></TableCell>
                            <TableCell >  <strong>Contact Number </strong></TableCell>
                            <TableCell >  <strong>Area </strong></TableCell>
                            <TableCell >  <strong>Preference </strong></TableCell>
                            <TableCell >  <strong>Username </strong></TableCell>
                            <TableCell >   </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map(user => (
                        <UserAdmin
                        key={uid(
                            user
                        )} /* unique id required to help React render more efficiently when we modify the students list. */
                        user={user}
                        AdminComponent={AdminComponent}
                        handleChangeEdit={handleChangeEdit}

                        />
                    ))}
                    </TableBody>
            </Table>
        </TableContainer>
    );
  }
}

export default UserList;