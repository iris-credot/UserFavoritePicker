import React, { useEffect, useState } from "react";
import { useFavorites } from "./favoriteUserContent"; // Import the hook to access favorites context
import DisplayFavorites from "./userDisplay"; // Import the DisplayFavorites component

export default function UserPicker() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Fixed typo here
  const [error, setError] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const { makeFavorite, favorites } = useFavorites();

  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  useEffect(() => {
    const GetallUsers = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();
        setUsers(data);
        setError('');
      } catch (error) {
        console.error("Request failed:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    GetallUsers();
  }, []);

  return (
    <div className="w-full max-w-4xl bg-white flex flex-col rounded-lg">
      <div className="py-4 bg-black text-white text-4xl font-semibold font-serif flex justify-center items-center">
        <h1>User Picker 😘</h1>
      </div>
      <div className="w-full flex mt-4 ml-2 gap-60 p-2">
        <button 
          className="text-white bg-black px-4 py-2 text-2xl w-1/3" 
          onClick={() => setShowFavorites(false)} // Show all users when clicked
        >
          Your Options 😍
        </button>
        <button 
          className="text-white bg-black px-4 py-2 text-2xl w-1/3" 
          onClick={toggleShowFavorites} // Show favorite users when clicked
        >
          Favorites 💕
        </button>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="w-full max-w-2xl h-full flex justify-center items-center text-white bg-black font-serif text-6xl">
            Loading...
          </div>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : showFavorites ? (
          <DisplayFavorites favorites={favorites} /> // Show favorites when toggled
        ) : (
          <div className="overflow-auto max-h-[300px] w-full rounded-lg p-4 mt-3">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Names</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Options</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((userOne) => (
                  <tr key={userOne.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{userOne.name}</td>
                    <td className="py-2 px-4 border-b">{userOne.email}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => makeFavorite(userOne)}>
                        Favorite
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              {Array.from({ length: usersPerPage - currentUsers.length }).map((_, idx) => (
                <tr key={`empty-${idx}`}>
                  <td className="py-2 px-4 border-b">&nbsp;</td>
                  <td className="py-2 px-4 border-b">&nbsp;</td>
                  <td className="py-2 px-4 border-b" colSpan="2">&nbsp;</td>
                </tr>
              ))}
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
