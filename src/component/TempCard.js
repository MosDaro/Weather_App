import { Card, Button } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';


const TempCard = (props) => {
    const { temp_min } = props.cityInfo
    let temp = temp_min; // copy the constant
    let scaleSymbol = props.scale.charAt(0); // scale symbol
    let img = "http://openweathermap.org/img/wn/" + props.weatherIcon + "@2x.png" // card image
    props.cityInfo["city"] = props.city; // add the current city to the json

    // set the json to text display
    let flipData = JSON.stringify(props.cityInfo).replace(/,/g, " ,").replace(/{|}/g, "").replace(/"/g, "").replace(/:/g, ": ").split(",")

    // set the right scale
    if (scaleSymbol === "C") // Celcius
        temp = temp_min - 273.15;
    else if (scaleSymbol === "F") // Fahrenheit
        temp = (temp_min - 273.15) * 9.0 / 5.0 + 32;

    return (
        <>
            <ReactCardFlip isFlipped={ props.isFlipped === props.city } flipDirection="vertical">

                {/* front card face */ }
                <Card key={ "card" + props.city } id={ props.city } className="card" style={ props.isLowest ? { "opacity": "1.0" } : { "opacity": "0.8" } }>
                    <Card.Body>
                        <Card.Title className="mb-2  text-muted CardTitle">{ props.city }</Card.Title>
                        <Card.Img src={ img } alt="Weather Image" />
                        <Card.Text className="mb-2 text-muted frontCardFace">
                            { temp.toFixed(1) + "º" + scaleSymbol }
                        </Card.Text>
                    </Card.Body>
                    <Button variant="light" onClick={ props.handleCardClick }>More Info</Button>
                </Card>

                {/* back card face */ }
                <Card key={ "card" + props.city } className="card" style={ props.isLowest ? { "opacity": "1.0" } : { "opacity": "0.8" } }>
                    <Card.Title className="mb-2 text-muted CardTitle">{ props.city }</Card.Title>
                    <Card.Body>
                        <Card.Img src={ img } alt="Weather Image" style={ { "opacity": "0.1" } } />
                        <Card.Text
                            className="mb-2 text-dark coldest-card-text"
                            style={ { "fontWeight": props.fontWeight } }
                        >
                            { flipData }
                        </Card.Text>
                    </Card.Body>
                    <Button className="cardButton" variant="light" onClick={ props.handleCardClick }>Return</Button>
                </Card>
            </ReactCardFlip>
        </>
    );
};

export default TempCard;
