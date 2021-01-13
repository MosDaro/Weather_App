import { Card, Button } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';


const TempCard = (props) => {
    const { temp_min } = props.cityInfo
    let temp = temp_min;
    let scaleSymbol = props.scale.charAt(0);
    let img = "http://openweathermap.org/img/wn/" + props.weatherIcon + "@2x.png"

    // console.log(props.whoFlipped, props.city)
    if (scaleSymbol === "C") { // Celcius
        temp = temp_min - 273.15;
    } else if (scaleSymbol === "F") {
        temp = (temp_min - 273.15) * 9.0 / 5.0 + 32;
    }
    props.cityInfo["city"] = props.city;
    let text = JSON.stringify(props.cityInfo).replace(/,/g, " ,").replace(/{|}/g, "").replace(/"/g, "").replace(/:/g, ": ").split(",")
    let flipData = JSON.stringify(props.cityInfo).replace(/,/g, "\n").replace(/{|}/g, "").replace(/"/g, "").replace(/:/g, ": ");
    return (
        <>
            <ReactCardFlip isFlipped={ props.isFlipped === props.city } flipDirection="vertical">
                <Card key={ "card" + props.city } id={ props.city } className="card" style={ props.isLowest ? { "opacity": "1.0" } : { "opacity": "0.8" } }>
                    <Card.Body>
                        <Card.Title className="mb-2  text-muted CardTitle">{ props.city }</Card.Title>
                        <Card.Img src={ img } alt="N/A" />
                        <Card.Text
                            className="mb-2 text-muted"
                            style={ { "position": "absolute", "bottom": "5%", "left": "50%", "transform": "translate(-50%, -50%)" } }
                        >
                            { temp.toFixed(1) + "º" + scaleSymbol }
                        </Card.Text>
                    </Card.Body>
                    <Button variant="light" onClick={ props.handleCardClick }>Flip</Button>
                </Card>


                <Card key={ "card" + props.city } className="card" style={ props.isLowest ? { "opacity": "1.0" } : { "opacity": "0.8" } }>
                    <Card.Title className="mb-2 text-muted CardTitle">{ props.city }</Card.Title>

                    <Card.Body>
                        <Card.Img src={ img } alt="N/A" style={ { "opacity": "0.1" } } />
                        <Card.Text
                            className="mb-2 text-dark coldest-card-text" style={ { "fontWeight": props.fontWeight } }>
                            { text }
                        </Card.Text>
                    </Card.Body>
                    <Button className="cardButton" variant="light" onClick={ props.handleCardClick } >Flip</Button>

                </Card>

            </ReactCardFlip>
        </>
    );
};

export default TempCard;