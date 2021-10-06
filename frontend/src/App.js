import React from 'react';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainRouter from './components/MainRouter';
import Footer from './components/Footer';

function App() {
  return (
    <div>
    <div className="App" style={{'minHeight':'100vh','height':'100%'}}>
        <Header />
        <MainRouter/>  	      
    </div>
    <Footer/>	
    </div>
  );
}

export default App;
