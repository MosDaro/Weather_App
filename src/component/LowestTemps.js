import { Container, Row, Col, Spinner } from "react-bootstrap";
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

            <Container key="temp-container" className="cards-container">
                <br />
                { props.loading ? loading :
                    <>
                        {
                            cities.map(function (name, index) {
                                const { main, is_min } = props.cities[name];
                                if (is_min) {
                                    lowest_temp_city = name;
                                } else {
                                    other_cities.push(
                                        <Col key={ "colNum-" + index }>
                                            <TempCard
                                                key={ "cardNum-" + index }
                                                city={ name }
                                                cityInfo={ main }
                                                scale={ props.tempScale }
                                                loading={ props.loading }
                                            />
                                        </Col>
                                    )
                                }
                                return null;
                            })
                        }
                        <Row key="rowNum-1" className="first-row-card">
                            {
                                // props.cities["is_min"] ? <Col>the min</Col> : null
                                // console.log(props.cities[lowest_temp_city]["main"])
                                <Col>
                                    <TempCard
                                        key={ "cardNum-lowest" }
                                        city={ lowest_temp_city }
                                        cityInfo={ props.cities[lowest_temp_city]["main"] }
                                        scale={ props.tempScale }
                                        loading={ props.loading }
                                        isLowest={ true }
                                    />
                                </Col>
                            }
                        </Row>
                        <br />
                        <Row className="second-row-card">
                            { other_cities }
                        </Row>
                    </>
                }
            </Container>

        </div >
    );
};

export default LowestTemps;

