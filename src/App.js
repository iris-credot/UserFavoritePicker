import logo from './logo.svg';
import './App.css';
import UserPicker from './components/userPicker';
import { FavoritesProvider } from "./components/favoriteUserContent"
function App() {
  return (
    <div className="bg-gradient-to-r from-[#62656d] to-[#1d1d1e] h-screen flex justify-center items-center p-6  ">
      <FavoritesProvider> 
         <UserPicker/>
  </FavoritesProvider>
       </div>
  );
}

export default App;
