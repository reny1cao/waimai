export const logIn = page => {
    const account = {
        name: page.state.username,
        pass: page.state.password
    }

    if (account.name === 'admin' && account.pass === 'admin') {
        console.log('hi')
        window.location.replace("./../AdminView");
    }
}
