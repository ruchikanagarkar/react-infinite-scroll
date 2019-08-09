import React from 'react';
import './App.css';
import InfiniteScroll from "react-infinite-scroll-component";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        hasMore: true
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
      fetch('https://randomuser.me/api/?results=20')
        .then(response => response.json())
        .then(
          (response) => {
            this.setState({
                items: this.state.items.concat(response.results)
            });
          },
          (error) => {
            console.log('error');
          }
        );
  };

  render() {
    return (
        <div className="App" style={{ width: '350px'}}>
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              height={400}
            >
              {this.state.items.map((value, index) => (
                <ul className="row" key={index}>
                  <li><b>{value.name.first + ' ' + value.name.last}</b><br/>{value.phone}</li>
                </ul>
              ))}
            </InfiniteScroll>
        </div>
      );
  }

}

export default App;
