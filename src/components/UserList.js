import React from "react";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"

import User from "./User";
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
                            <TableCell > Name </TableCell>
                            <TableCell > Address </TableCell>
                            <TableCell > Contact Number </TableCell>
                            <TableCell > Area </TableCell>
                            <TableCell > Preference </TableCell>
                            <TableCell > Username </TableCell>
                            <TableCell > Password </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map(user => (
                        <User
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