import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [customers, setCustomers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [invited, setInvite] = React.useState([]);
  const [send, setSend] = React.useState(false);

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setCustomers(json.data);
      })
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddClick = (id) => {
    if (invited.includes(id)) {
      setInvite((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvite((prev) => [...prev, id]);
    }
  };

  const handleSendClick = () => {
    setSend(true);
  };

  return (
    <div className="App">
      {send ? (
        <Success count={invited.length} />
      ) : (
        <Users
          isLoading={isLoading}
          items={customers}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleAddClick={handleAddClick}
          invited={invited}
          handleSendClick={handleSendClick}
        />
      )}
    </div>
  );
}

export default App;
