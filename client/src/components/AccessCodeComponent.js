import { CountdownCircleTimer } from 'react-countdown-circle-timer'




const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Too late...</div>;
        }
        return (
            <div className="timer"  >
              {/* <div className="text"></div> */}
              <div className="value"><h1>{remainingTime}</h1></div>
              {/* <div className="text"></div> */}
            </div>
          );
}

function ACC(){
    return (
        <div className="App">
         
          <div className="timer-wrapper" style={{background:'#7dffbb', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>

            <CountdownCircleTimer
              isPlaying
              duration={60}
              size={100} 
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
          <div className="join-text" style={{display: 'flex', justifyContent: 'center'}}><h2 style={{color: 'white'}}>To join the game, enter the code on your phone's browser.</h2></div>
        <div className='join-code' style={{display: 'flex', justifyContent: 'center' , fontsize: "100px"}}><h1 style={{color: 'white' }}>1923</h1></div>
        </div>
        
      );
}

export default ACC

   
   