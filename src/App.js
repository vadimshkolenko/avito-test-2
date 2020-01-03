import React from 'react';
import Gallery from './components/Gallery'
import Modal from './components/Modal'
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Route exact path='/:imageId?' render={() => <Gallery />} />
      <Route path='/:imageId' render={(props) => <Modal {...props}/>} />
    </div>
  )
}

export default App;
