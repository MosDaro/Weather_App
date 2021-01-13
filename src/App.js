import { Component } from "react"
import './App.css';
import Header from './component/Header';
import LowestTemps from './component/LowestTemps';

class App extends Component {
  state = {
    cities: {},
    tempScale: "Kelvin",
    loading: true,
    isFlipped: ""
  }

  componentDidMount() {
    fetch("http://localhost:5000/get_lowest_temp")
      .then(
        response => response.json()
      ).then(
        response => {

          this.setState({
            ...this.state.cities,
            cities: response,
            loading: false
          });
        }
      );
  };

  tempScaleChange = (event) => {
    this.setState({
      tempScale: event
    });
  };

  handleCardClick = (event) => {
    event.preventDefault();
    let parent = event.target.parentNode.id;
    this.setState(prevState => ({
      isFlipped: prevState.isFlipped !== parent ? parent : ""
    }));
  };

  refresh = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 100);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <LowestTemps
          cities={ this.state.cities }
          tempScaleChange={ this.tempScaleChange }
          tempScale={ this.state.tempScale }
          loading={ this.state.loading }
          handleCardClick={ this.handleCardClick }
          isFlipped={ this.state.isFlipped }
          refresh={ this.refresh }
        />
      </div>
    );
  }

};

export default App;
