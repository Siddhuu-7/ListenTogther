import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileUpload from './FileUplod';
import CreatorAccess from './CreatorAccess';
import FirstPage from './FirstPage';
import CreateRoomPage from './CreateRoom';
import Chat from './Chat';
import SongSelectionPage from './SongsSection';
import Admin from './Admin'
import pageNotFound from './PageNotFound'
export default function App() {
 
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={FirstPage} />
        <Route path='/Admin' Component={Admin}/>
        <Route path='/Creator-Auth' Component={CreatorAccess} />
        <Route path='/creator-file-upload' Component={FileUpload} />
        <Route path='/Create-Room' Component={CreateRoomPage} />
        <Route path='/Chat-Room/:roomId' Component={Chat} />
        <Route path='/songSelection/:roomId' Component={SongSelectionPage} />
        <Route path='*' Component={pageNotFound}/>
      </Routes>
    </BrowserRouter>
  );
}
