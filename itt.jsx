import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './iit.css';

const Itt = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageToText = () => {
    if (!image) {
      alert('Please upload an image first.');
      return;
    }

    setLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => console.log(m), // Log progress
      }
    ).then(({ data: { text } }) => {
      setResult(text);
      setLoading(false);
    }).catch((error) => {
      console.error('Error:', error);
      setResult('Error occurred while processing the image.');
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <h1>Image to Text</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleImageToText}>Convert Image to Text</button>
      {loading && <p>Processing...</p>}
      {result && (
        <div className="result">
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Itt;
