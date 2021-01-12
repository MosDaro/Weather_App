import { Card, Button } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';


const TempCard = (props) => {

    // let flipData = JSON.stringify(props.cityInfo).replace(/\"|{|}/g, "").replace(/,/g, "\n");
    let flipData = JSON.stringify(props.cityInfo).replace(/,/g, "\n").replace(/{|}/g, "").replace(/"/g, "");

    // for (e in props.cityInfo) {
    //     flipData += e + ": " + props.cityInfo[e] + "\n"
    // }
    // console.log(flipData)
    console.log(props.cityInfo)
    let fontSize = props.fontSize;
    const { temp_min } = props.cityInfo
    let temp = temp_min;
    let scaleSymbol = props.scale.charAt(0);

    // console.log(props.whoFlipped, props.city)
    if (scaleSymbol === "C") { // Celcius
        temp = temp_min - 273.15;
    } else if (scaleSymbol === "F") {
        temp = (temp_min - 273.15) * 9.0 / 5.0 + 32;
    }
    return (
        <>
            <ReactCardFlip isFlipped={ props.isFlipped === props.city } flipDirection="vertical">
                <Card key={ "card" + props.city } id={ props.city } className="card" style={ props.isLowest ? { "opacity": "1.0" } : { "opacity": "0.8" } }>
                    <Card.Body>
                        <Card.Title className="mb-2  text-muted CardTitle">{ props.city }</Card.Title>
                        <Card.Img src="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png" alt="N/A" />
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
                    <Card.Body>
                        <Card.Title className="mb-2  text-muted CardTitle">{ props.city }</Card.Title>
                        <Card.Img
                            src="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png"
                            alt="N/A"
                            style={ { "opacity": "0.1" } }
                        />
                        <Card.Text
                            className="mb-2 text-dark"
                            style={ {
                                "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)",
                                "maxWidth": "40%", "font-size": fontSize
                            } }
                        >
                            { flipData }
                        </Card.Text>
                    </Card.Body>
                    <Button variant="light" onClick={ props.handleCardClick }>Flip</Button>
                </Card>

            </ReactCardFlip>
        </>
    );
};

export default TempCard;