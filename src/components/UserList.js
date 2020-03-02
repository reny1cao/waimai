import React from "react";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import User from "./User";
class UserList extends React.Component {
  render() {
    const { users, AdminComponent } = this.props;

    /* Our student list.  We use the state to iterate through the 
       student list and make an <li> for each one. */
    return (
      <Table className="user-list">
        <TableBody>
          {users.map(user => (
            <User
              key={uid(
                user
              )} /* unique id required to help React render more efficiently when we modify the students list. */
              user={user}
              AdminComponent={AdminComponent}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default UserList;