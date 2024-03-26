import { useEffect, useState } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Persons from "./Persons";

const ALL_PERSONS = gql`
  query {
    allPersons {
      id
      nombre
      apellido
      edad
      profesion
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(ALL_PERSONS);
  if (error) return <p style={{ color: "red" }}>Error : {error.message}</p>;

  return (
    <div className="App">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div style={{ cursor: "pointer", borderBottom: "1px solid black" }}>
          <Persons persons={data?.allPersons} />
        </div>
      )}
    </div>
  );
}

export default App;
