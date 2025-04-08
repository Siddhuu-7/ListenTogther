import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import FileUpload from './FileUplod'
import CreatorAccess from './CreatorAccess'
import FirstPage from './FirstPage'
import CreateRoomPage from './CreateRoom'
import Chat from './Chat'
import SongSelectionPage from './SongsSection'
export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' Component={FirstPage}/>
    <Route path='/Creator-Auth' Component={CreatorAccess}/>
    <Route path='/Creator' Component={FileUpload}/>
    <Route path='/Create-Room' Component={CreateRoomPage}/>
    <Route path='/Chat-Room/:roomId' Component={Chat}/>
    <Route path='/songSelection/:roomId' Component={SongSelectionPage}/>
   </Routes>
   </BrowserRouter>
  )
}
