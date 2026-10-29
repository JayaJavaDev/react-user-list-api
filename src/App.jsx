import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card.jsx";
const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>User List</h1>

      <div className="container" id="userContainer">
        {users.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default App;
