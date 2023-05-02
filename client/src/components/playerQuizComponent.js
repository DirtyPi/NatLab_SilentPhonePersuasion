import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import image from '../Images/whale.jpg'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


const playerQuiz = () => {


    
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Too late...</div>;
        }
        return (
            <div className="timer">
              {/* <div className="text"></div> */}
              <div className="value"><h1>{remainingTime}</h1></div>
              {/* <div className="text"></div> */}
            </div>
          );
}
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (
    
    <div className="containerPQ">
      <div classname='idk' style={{padding: '15px'}}>
           
           {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
             <Grid xs={6} style={{color:'#FCS18A'}}>
               <Item classname= '1'style={{background:'#FCS18A'}} >
                <input type='submit' value={1} style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'#FCS18A'}}></input></Item>
             </Grid>
             <Grid xs={6} classname= '2' style={{color:'#4591FF'}}>
               <Item ><input type='submit' value={2}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent', backgroundColor:'#4591FF' }}></input></Item>
             </Grid>
             <Grid xs={6} classname= '3' style={{color:'#FFB829'}}>
               <Item ><input type='submit' value={3}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'#FFB829'}}></input></Item>
             </Grid>
             <Grid xs={6} classname= '4' style={{color:'#7DFFBB'}}>
               <Item ><input type='submit' value={4}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'#7DFFBB'}}></input></Item>
             </Grid>
           </Grid> */}
       
                 </div>
                 <div className="timer-wrapper" style={{ background:'#7dffbb', width: '110px', height: '110px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '50px'}}>

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
          <div class="rendom" style={{ padding:'10px'}}>
          <Box sx={{ height: 150, width: '100%' , border: '10px'}}>
      <Box
        sx={{
          height: '100%',
          width: "44%",
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
         <input type='submit' value={1} style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'red' }}></input>
      </Box>
      <Box
        sx={{
          height: '100%',
          width: "44%",
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        <input type='submit' value={2}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent', backgroundColor:'#4591FF' }}></input>
      </Box>
      <Box
        sx={{
          height: '100%',
          width: "44%",
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        <input type='submit' value={3}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'#FFB829'}}></input>
      </Box>
      <Box
        sx={{
          height: '100%',
          width: "44%",
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        <input type='submit' value={4}style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' ,backgroundColor:'#7DFFBB'}}></input>
      </Box>
    </Box>
          </div>
    </div>
  );
};

export default playerQuiz;