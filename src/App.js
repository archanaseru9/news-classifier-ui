import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');

  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', {
        text: input,
        description: description,

      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      alert("Error connecting to the API");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>News Article Categorizer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          News Text:
          <br />
          <textarea
            rows="5"
            cols="50"
            placeholder="Enter news article text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <br /><br />
        <label>
          Description:
          <br />
          <textarea
            rows="3"
            cols="50"
            placeholder="Enter description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br /><br />
        <button type="submit">Classify</button>
      </form>
      {prediction !== null && (
        <div>
          <h2>Prediction: {prediction}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
