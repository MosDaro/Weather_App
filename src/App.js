import { Component } from "react"
import './App.css';
import Header from './component/Header';
import LowestTemps from './component/LowestTemps';

class App extends Component {
  state = {
    cities: {},
    tempScale: "Kelvin",
    loading: true
  }

  componentDidMount() {
    fetch("http://localhost:5000/get_lowest_temp")
      .then(
        response => response.json()
      ).then(
        response => {
          this.setState({
            cities: response,
            loading: false
          });
        }
      );
  }

  tempScaleChange = (event) => {
    this.setState({
      tempScale: event
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <LowestTemps
          cities={ this.state.cities }
          tempScaleChange={ this.tempScaleChange }
          tempScale={ this.state.tempScale }
          loading={ this.state.loading }
        />
      </div>
    );
  }

};

export default App;
