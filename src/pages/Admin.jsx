import React from 'react';
import { withAuthorization } from '../components/Session';

const Admin = () => (
    <h2>Admin</h2>
)

export default withAuthorization(Admin);