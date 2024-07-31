import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';
import itt from './itt'; 

const App = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTranslate = async () => {
    setTranslatedText(text.split('').reverse().join(''));
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/image-to-text" component={itt} />
          <Route path="/" exact component={App}>
            <div className="container">
              <h1>Text Translator</h1>
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text to translate"
              />
              <button onClick={handleTranslate}>Translate</button>
              {translatedText && (
                <div className="translated-text">
                  <h2>Translated Text:</h2>
                  <p>{translatedText}</p>
                </div>
              )}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
