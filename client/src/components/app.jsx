import React from 'react';
import TransactionList from './TransactionList.jsx';
import mockData from '../../../mockData.js';
import LeaderBoard from './leaderboard/leaderboard.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      Hello Worldsss
      {/* <TransactionList data={mockData}/> */}
      <LeaderBoard />
      </>
    )
  }
}

export default App;