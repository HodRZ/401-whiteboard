import { useState } from 'react';
import './App.css';
import Hero from './components/main/Hero';
import Sidebar from './components/main/Sidebar';
import Post from './components/post/Post';
import Auth from './components/user/Auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()

  const userAuth = async (loggedUser) => {
    setIsLoggedIn(!isLoggedIn);
    setUser(loggedUser)
  }
  return (
    <div className="App pl-[4.9rem]">
      <Sidebar />
      <Hero />
      {(isLoggedIn) ? <Post userAuth={userAuth} user={user} /> : <Auth userAuth={userAuth} />}
    </div>
  );
}

export default App;
