import { Component } from "react"
import './App.css';
import Header from './component/Header';
import LowestTemps from './component/LowestTemps';
import env from "react-dotenv";

class App extends Component {
    state = {
        cities: {},
        tempScale: "Kelvin",
        loading: true,
        isFlipped: "",
    }

    componentDidMount() {
        this.fetchWeather();
    };


    fetchWeather = () => {
        // get the waether data
        fetch(env.API_URL, {
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + btoa(env.API_USER + ":" + env.API_PASSWORD) }
        })
            .then((response) => {
                if (!response.ok)
                    throw Error(response.statusText);
                return response.json()
            })
            .then(response => {
                this.setState({
                    ...this.state.cities,
                    cities: response,
                    loading: false
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // change the temp scale
    tempScaleChange = (event) => {
        this.setState({ tempScale: event });
    };

    // card flip, remember which card is flipped
    handleCardClick = (event) => {
        event.preventDefault();
        let parent = event.target.parentNode.id;

        this.setState(prevState => ({
            isFlipped: prevState.isFlipped !== parent ? parent : ""
        }));
    };

    // refresh the cards info
    refresh = () => {
        this.setState({ loading: true }); // display loading spinner
        this.fetchWeather(); // fetch data again
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
