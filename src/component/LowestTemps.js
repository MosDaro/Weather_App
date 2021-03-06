import { Container, Row, Col, Spinner, Badge, Button } from "react-bootstrap";
import TempScale from "./TempScale";
import TempCard from "./TempCard";


const LowestTemps = (props) => {
    let cities = Object.keys(props.cities);
    let lowest_temp_city;
    let other_cities = [];
    let loading = <Spinner animation="border" variant="info" />;

    return (
        <div id="card-group">
            <TempScale key="temp-scale" tempScaleChange={ props.tempScaleChange } tempScale={ props.tempScale } />
            <Button onClick={ props.refresh } variant="link" className="refresh-button">
                <i className="fa">&#xf021;</i>
            </Button>
            <Container key="temp-container" className="cards-container">
                <br />
                {/* if loading display a loading spinner */ }
                { props.loading ? loading :
                    <>{
                        cities.map(function (name, index) {
                            if (name === "isFlipped")
                                return null;

                            const { main, is_min, weather_icon } = props.cities[name];

                            if (is_min)
                                lowest_temp_city = name;
                            else {
                                other_cities.push(
                                    <Col key={ "colNum-" + index }>
                                        <TempCard
                                            key={ "cardNum-" + index }
                                            city={ name }
                                            cityInfo={ main }
                                            weatherIcon={ weather_icon }
                                            scale={ props.tempScale }
                                            loading={ props.loading }
                                            isFlipped={ props.isFlipped }
                                            handleCardClick={ props.handleCardClick }
                                        />
                                    </Col>
                                )
                            }
                            return null;
                        }) }

                        {/* coldest city */ }
                        <Row key="first-row-card" className="first-row-card">{
                            <Col>
                                <TempCard
                                    key={ "cardNum-lowest" }
                                    city={ lowest_temp_city }
                                    cityInfo={ props.cities[lowest_temp_city]["main"] }
                                    weatherIcon={ props.cities[lowest_temp_city]["weather_icon"] }
                                    scale={ props.tempScale }
                                    loading={ props.loading }
                                    isLowest={ true }
                                    isFlipped={ props.isFlipped }
                                    handleCardClick={ props.handleCardClick }
                                    fontWeight="900"
                                />
                                <h2><Badge pill variant="primary" className="coldestBadge">The Coldest</Badge></h2>
                            </Col> }
                            { other_cities }
                        </Row>
                    </>
                }
            </Container>
        </div >
    );
};

export default LowestTemps;
