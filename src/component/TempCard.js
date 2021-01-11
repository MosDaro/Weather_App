import { Card } from 'react-bootstrap';

const TempCard = (props) => {
    const { temp_min } = props.cityInfo
    var temp = temp_min;
    var scaleSymbol = props.scale.charAt(0);


    if (scaleSymbol === "C") { // Celcius
        temp = temp_min - 273.15;
    } else if (scaleSymbol === "F") {
        temp = (temp_min - 273.15) * 9.0 / 5.0 + 32;
    }


    return (
        <Card key={ "card" + props.city } className="primary card">
            <Card.Body>
                <Card.Title className="mb-2  text-muted CardTitle">{ props.city }</Card.Title>
                <Card.Img src="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png"></Card.Img>
                <Card.Text className="mb-2 text-muted">{ Math.round(temp) + "º" + scaleSymbol }</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TempCard;