import React, { useState, useEffect , useRef} from 'react';

import '../components/componentsCSS/setUsername.css'

const Username = () => {
    const [username, setUsername] = useState('');
    const [isButtonClickable, setIsButtonClickable] = useState(false);
  
    const usernameInputRef = useRef(null);
    const submitButtonRef = useRef(null);

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      // Check if pop-up message has already been displayed
      const hasShownPopup = sessionStorage.getItem('hasShownPopup');
      if (!hasShownPopup) {
          // Display pop-up message
          setShowPopup(true);
          // Store that pop-up message has been displayed
          sessionStorage.setItem('hasShownPopup', true);
      }
  }, []);

    useEffect(() => {
        usernameInputRef.current.focus();
      }, []);
    
      useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);
    
      useEffect(() => {
        if (username.length > 4) {
          setIsButtonClickable(true);
        } else {
          setIsButtonClickable(false);
        }
      }, [username]);
    
      const handleInputChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Store the username in the session
        sessionStorage.setItem('username', username);
        console.log(`Username: ${username}`);
      };

return(
  <>
    {showPopup ? (
      <div className="popup" onClick={() => setShowPopup(false)}>
        <p>Attention cinema-goers! For a more immersive and enjoyable experience, we kindly ask that you turn off or turn down the volume of your mobile phone. Thank you for your cooperation!</p>
        <button className="popup-button">Close</button>
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleInputChange} ref={usernameInputRef} />
        </label>
        <button type="submit" className={isButtonClickable ? 'setUsernameBtn active' : 'setUsernameBtn'} ref={submitButtonRef}><a href="/quizplayer" style={{textdecoration:'none', color:'black',  textDecoration: 'none'}}>
          Submit
        </a></button>
      </form>
    )}
  </>
)};

export default Username;