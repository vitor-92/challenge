import "./App.css";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const soilMoistureLimits = {
  fino: { lower: 60, upper: 80 },
  médio: { lower: 70, upper: 88 },
  grosseiro: { lower: 80, upper: 90 },
};

const getIrrigationAdvice = (soilType, moistureLevel) => {
  const limits = soilMoistureLimits[soilType];

  if (!limits) {
    return "Selecione o tipo de solo.";
  }

  if (!moistureLevel) {
    return "Insira o nível de umidade do solo.";
  }

  if (moistureLevel > 100 || moistureLevel < 0) {
    return "Insira um nível de umidade entre 0 e 100.";
  }

  if (moistureLevel < limits.lower) {
    return "Umidade do solo perigosamente baixa!";
  } else if (moistureLevel < limits.upper) {
    return "Irrigação precisa ser aplicada.";
  } else {
    return "Irrigação não é necessária neste momento.";
  }
};

function App() {
  const [soilType, setSoilType] = useState("");
  const [moistureLevel, setMoistureLevel] = useState("");
  const [advice, setAdvice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const advice = getIrrigationAdvice(soilType, moistureLevel);
    setAdvice(advice);
  };

  return (
    <div className="content">
      <Card className="card-input">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSoilType">
            <Form.Label>Tipo de solo</Form.Label>
            <Form.Control className="soil-type" as="select" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
              <option value="">Selecione o tipo de solo...</option>
              <option value="fino">Fino (argila)</option>
              <option value="médio">Médio (argilosa)</option>
              <option value="grosseiro">Grosseiro (arenosa)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMoistureLevel">
            <Form.Label>Nível de umidade</Form.Label>
            <Form.Control className="moisture-level" type="number" value={moistureLevel} onChange={(e) => setMoistureLevel(e.target.value)} />
          </Form.Group>
          <Button variant="success" type="submit" className="btn-submit">
            Obter conselho
          </Button>
        </Form>
        <div className="text-center">
          <p className="advice-text">{advice}</p>
        </div>
      </Card>
    </div>
  );
}

export default App;
