import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import countries from './components/data';
import './App.css';

const Translate = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fromText = document.querySelector('.from-text');
    const toText = document.querySelector('.to-text');
    const exchangeIcon = document.querySelector('.exchange');
    const selectTag = document.querySelectorAll('select');
    const icons = document.querySelectorAll('.row i');
    const translateBtn = document.querySelector('button');

    selectTag.forEach((tag, id) => {
      for (let country_code in countries) {
        let selected =
          id === 0
            ? country_code === 'en-GB'
              ? 'selected'
              : ''
            : country_code === 'hi-IN'
            ? 'selected'
            : '';
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
      }
    });

    exchangeIcon.addEventListener('click', () => {
      let tempText = fromText.value;
      let tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
    });

    fromText.addEventListener('keyup', () => {
      if (!fromText.value) {
        toText.value = '';
      }
    });

    translateBtn.addEventListener('click', () => {
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute('placeholder', 'Translating...');
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach((data) => {
            if (data.id === 0) {
              toText.value = data.translation;
            }
          });
          toText.setAttribute('placeholder', 'Translation');
        });
    });

    icons.forEach((icon) => {
      icon.addEventListener('click', ({ target }) => {
        if (!fromText.value || !toText.value) return;
        if (target.classList.contains('fa-copy')) {
          if (target.id === 'from') {
            navigator.clipboard.writeText(fromText.value);
          } else {
            navigator.clipboard.writeText(toText.value);
          }
        } else {
          let utterance;
          if (target.id === 'from') {
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTag[0].value;
          } else {
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTag[1].value;
          }
          speechSynthesis.speak(utterance);
        }
      });
    });

    return () => {
      // Cleanup event listeners
      exchangeIcon.removeEventListener('click', () => {});
      fromText.removeEventListener('keyup', () => {});
      translateBtn.removeEventListener('click', () => {});
      icons.forEach((icon) => {
        icon.removeEventListener('click', () => {});
      });
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="wrapper">
          <div className="text-input">
            <textarea
              spellCheck="false"
              className="from-text"
              placeholder="Enter text"
            ></textarea>
            <textarea
              spellCheck="false"
              readOnly
              disabled
              className="to-text"
              placeholder="Translation"
            ></textarea>
          </div>
          <ul className="controls">
            <li className="row from"> 
              <div className="icons">
                <i id="from" className="fas fa-volume-up"></i>
                <i id="from" className="fas fa-copy"></i>
              </div>
              <select></select>
            </li>
            <li className="exchange">
              <i className="fas fa-exchange-alt"></i>
            </li>
            <li className="row to">
              <select></select>
              <div className="icons">
                <i id="to" className="fas fa-volume-up"></i>
                <i id="to" className="fas fa-copy"></i>
              </div>
            </li>
          </ul>
        </div>
        <button>Translate Text</button>
      </div>
    </>
  );
};

export default Translate;
