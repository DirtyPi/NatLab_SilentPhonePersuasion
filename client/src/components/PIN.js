import React, { useRef, useEffect } from "react";

import { Link } from "react-router-dom";


import '../components/componentsCSS/PIN.css'
const PIN = () => {
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const handleInput = (e, currentIndex) => {
    const currentInput = inputsRef.current[currentIndex];
    const nextInput = inputsRef.current[currentIndex + 1];
    const prevInput = inputsRef.current[currentIndex - 1];

    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    if (e.key === "Backspace") {
      inputsRef.current.forEach((input, index) => {
        if (currentIndex <= index && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }

    if (!inputsRef.current[3].hasAttribute("disabled") && inputsRef.current[3].value !== "") {
      buttonRef.current.classList.add("active");
      return;
    }

    buttonRef.current.classList.remove("active");
  };

  return (
    
    <div className="containerPin">
      
      <form>
        <div className="input-field">
          <input type="text" maxLength="1" ref={(el) => (inputsRef.current[0] = el)} onKeyUp={(e) => handleInput(e, 0)} />
          <input type="text" maxLength="1" disabled ref={(el) => (inputsRef.current[1] = el)} onKeyUp={(e) => handleInput(e, 1)} />
          <input type="text" maxLength="1" disabled ref={(el) => (inputsRef.current[2] = el)} onKeyUp={(e) => handleInput(e, 2)} />
          <input type="text" maxLength="1" disabled ref={(el) => (inputsRef.current[3] = el)} onKeyUp={(e) => handleInput(e, 3)} />
        </div>
        
        <button className="pinbutton" type="submit" disabled ref={buttonRef} ><a href="/quizplayer" style={{textdecoration:'none', color:'black',  textDecoration: 'none'}}>
          Verify
       </a> </button>
       
      </form>
    </div>
  );
};

export default PIN;
