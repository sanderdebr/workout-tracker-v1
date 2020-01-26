import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';

import loader from './loader.gif';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function ActivityList(props) {
    const {firebase, authUser} = props;

    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
        const listener = ref.on("value", snapshot => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.values(data);
                setActivities(dataArray);
            } else {
                setNoResults(true);
            }
            setLoading(false);
        });
        return () => ref.off('value', listener);
    }, [firebase.db]);

    return (
        <>
            { 
                loading === true 
                    ? <img src={loader} alt={loader}></img> 
                    : ''
            }
            
            {
                noResults === true 
                    ? <p>No activities added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Duration</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {activities.map(activity => {
                                        return (
                                            <TableRow>
                                                <TableCell>{activity.name}</TableCell>
                                                <TableCell>{activity.type}</TableCell>
                                                <TableCell>{activity.duration}</TableCell>
                                            </TableRow>
                                        )
                            })}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default withFirebase(ActivityList);