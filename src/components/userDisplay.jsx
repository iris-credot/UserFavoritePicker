// src/components/DisplayFavorites.js
import React from 'react';
import { useFavorites } from './favoriteUserContent';
const DisplayFavorites = ({ favorites }) => {
  const { removeFavorite } = useFavorites();
  return (
    <div className='flex flex-col justify-center items-center h-[400px]'>
      <h2 className='text-3xl font-serif '> Your Favorite Users</h2>
      <div className='mt-7'>
      {favorites.length > 0 ? (
        favorites.map((user) => (
          <div className='flex gap-3 mt-4 mb-4 md:text-base sm:text-sm text-xs  sm:ml-0 ml-5'>
          <p key={user.id}>
           - Your favorite user is <strong>{user.name}</strong> ,then <strong>{user.email}</strong>.
          </p>
          <button className='bg-red-800 text-white px-1 py-1 rounded text-xs sm:mr-0 mr-3'  onClick={() => removeFavorite(user.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p className='w-full max-w-2xl h-[200px] flex justify-center items-center text-black font-serif text-3xl md:text-6xl md:ml-10'>No favorites yet!</p>
      )}
      </div>
    </div>
  );
};

export default DisplayFavorites;
