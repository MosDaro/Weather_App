import { Container, Row, Col, Spinner } from "react-bootstrap";
import TempScale from "./TempScale";
import TempCard from "./TempCard";

const LowestTemps = (props) => {

    let cities = Object.keys(props.cities);
    let loading = <Spinner animation="border" variant="info" />;
    return (
        <div id="card-group">

            <TempScale key="temp-scale" tempScaleChange={ props.tempScaleChange } tempScale={ props.tempScale } />

            <Container key="temp-container">
                <br />
                { props.loading ? loading : null }
                <Row key="rowNum-1" className="rowCard">

                    {
                        cities.map(function (name, index) {
                            const { main } = props.cities[name]
                            return (
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
                        })
                    }
                </Row>
                <Row>
                    {
                        // <Col key={ "colNum-lowest" }>
                        //     <TempCard
                        //         city={ name }
                        //         cityInfo={ main }
                        //         scale={ props.tempScale }
                        //         loading={ props.loading }
                        //     />
                        // </Col>
                    }
                </Row>
            </Container>

        </div>
    );
};

export default LowestTemps;

