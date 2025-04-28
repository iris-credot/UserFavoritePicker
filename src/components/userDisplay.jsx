// src/components/DisplayFavorites.js
import React from 'react';

const DisplayFavorites = ({ favorites }) => {
  return (
    <div>
      <h2>Your Favorite Users</h2>
      {favorites.length > 0 ? (
        favorites.map((user) => (
          <p key={user.id}>
            Your favorite user is {user.name}, then {user.email}.
          </p>
        ))
      ) : (
        <p>No favorites yet!</p>
      )}
    </div>
  );
};

export default DisplayFavorites;
