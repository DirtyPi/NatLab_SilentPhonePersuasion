import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import ACP from './pages/AccessCodePage'
import QuizGame from './pages/QuizGame';
import PlayQuiz from './pages/playerQuiz';
import SetUsername from './pages/SetUsernamePAge';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
      <Routes>
        <Route
        path='/'
        element={<Home/>}
        />

        <Route
        path='/ACP'
        element={<ACP/>}
        />

        <Route
        path='/quizgame'
        element={<QuizGame/>}
        />

         <Route
        path='/quizplayer'
        element={<PlayQuiz/>}
        />

        <Route
        path='/SetUsername'
        element={<SetUsername/>}
        />

      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
