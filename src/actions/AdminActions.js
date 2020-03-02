
export const removeUser = (page, user) => {
    const filteredUsers = page.state.users.filter(s => {
      return s !== user;
    });
  
  
    page.setState({
      users: filteredUsers
    });
  };