import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    class withAuthentication extends React.Component {
        constructor() {
            super();

            this.state = {
                authUser: null,
            };
        }

        componentDidMount() {
            this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser ? 
                this.setState({ authUser: authUser }) 
                : this.setState({ authUser: null })
            })
        };

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            )
        }
    }

    return withFirebase(withAuthentication);
}

export default withAuthentication;