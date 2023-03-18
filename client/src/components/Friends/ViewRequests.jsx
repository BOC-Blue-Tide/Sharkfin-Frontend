import React from "react";
import { Button } from '@mui/material';
import {friends} from  '../../../../mockData_friends.js';


class ViewRequests extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'popup-content'>
        <div>Friend Requests</div>
        <div>
          {friends.map((friend) => {
            return (
              <div key={friend.id}>
              <label>{friend.username}</label>
              <Button color="primary">Accept Request</Button>
            </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default ViewRequests;