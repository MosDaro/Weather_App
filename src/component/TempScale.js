import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const TempScale = (prop) => {
    const { tempScale } = prop;
    return (
        <ToggleButtonGroup name="scale" type="radio" className="buttons-scale" size="lg" onChange={ prop.tempScaleChange }>
            <ToggleButton value="Kelvin" variant={ tempScale === "Kelvin" ? "primary" : "secondary" }>
                ºK
            </ToggleButton>
            <ToggleButton value="Celsius" variant={ tempScale === "Celsius" ? "primary" : "secondary" }>
                ºC
            </ToggleButton>
            <ToggleButton value="Fahrenheit" variant={ tempScale === "Fahrenheit" ? "primary" : "secondary" }>
                ºF
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default TempScale;

