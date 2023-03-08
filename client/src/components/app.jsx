import React from 'react';
import Portfolio from './portfolio/portfolio.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: {}
    }
  }

  render() {
    return (
      <>
      Hello Worldsss
      <Portfolio portfolio={this.state.portfolio} />
      </>
    )
  }
}

export default App;