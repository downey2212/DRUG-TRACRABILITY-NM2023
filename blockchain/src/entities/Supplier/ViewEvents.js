import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import Transactions from '../../build/Transactions.json';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ViewEvents(props) {
  const classes = useStyles();
  const [address] = useState(props.location.query.address);
  const [account] = useState(props.location.query.account);
  const [supplyChain] = useState(props.location.query.supplyChain);
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getEvents() {
    // let events = await supplyChain.getPastEvents('buyEvent', {filter: {packageAddr: address}, fromBlock: 0, toBlock: 'latest'});
    let events = await supplyChain.getPastEvents('buyEvent', {fromBlock: 0, toBlock: 'latest'});
    events = events.filter((event) => {
        return event.returnValues.packageAddr == address;
    });
    const lst = events.map(data => {
        return(
            <tr key={data.returnValues[0]} style={{height: 100}}>
                <td>{data.returnValues[0]}</td>
                <td>{data.returnValues[1]}</td>
                <td>{data.returnValues[2]}</td>
                <td>{data.returnValues[3]}</td>
                <td>{new Date(data.returnValues[4] * 1000).toString()}</td>
                <td><Button variant="contained" color="secondary" onClick={{}}>Verify Signature</Button></td>
            </tr>
        )
    });
    setDetails(lst);
    isLoading(false);
  }

  if(loading) {
    getEvents();
    return (
      <Loader></Loader>
    );
  } else {
    return (
        <div className="container">
        <div className="table-responsive">
            <table border="1" className="table" style={{marginTop: 20}}>
                <thead>
                    <tr>
                    <th scope="col-xs-2">Buyer Address</th>
                    <th scope="col-xs-2">Seller Address</th>
                    <th scope="col-xs-2">Package Address</th>
                    <th scope="col-xs-2">Signature</th>
                    <th scope="col-xs-2">Timestamp</th>
                    <th scope="col-xs-2">Verify</th>
                    </tr>
                </thead>
                <tbody>
                        {details}
                </tbody>
            </table>
        </div>
    </div>
    );
  }
} 