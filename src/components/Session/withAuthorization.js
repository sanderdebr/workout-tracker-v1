import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if (!condition(authUser)) {
                    console.log('not authorized');
                }
            }
        )
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    condition(authUser) ? <Component {...this.props} /> : <p>Not authorized</p>
                }
            </AuthUserContext.Consumer>
        )
    }
  }

  return withFirebase(WithAuthorization);
};

export default withAuthorization;