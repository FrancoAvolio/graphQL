import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { ALL_PERSONS } from "./App";

const CREATE_PERSON = gql`
  mutation createPerson(
    $nombre: String!
    $apellido: String!
    $profesion: String!
    $edad: Int!
  ) {
    addPerson(
      nombre: $nombre
      apellido: $apellido
      profesion: $profesion
      edad: $edad
    ) {
      nombre
      id
      apellido
      profesion
      edad
    }
  }
`;
const PersonForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [profesion, setProfesion] = useState("");
  const [edad, setEdad] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }], // Refetch allPersons query after mutation is complete
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure edad is converted to an integer
    const edadInt = parseInt(edad, 10);
    if (!isNaN(edadInt)) {
      createPerson({
        variables: { nombre, apellido, profesion, edad: edadInt },
      });
      setNombre("");
      setApellido("");
      setProfesion("");
      setEdad("");
    } else {
      // Handle the case where edad is not a valid number
      console.error("Edad must be a valid number");
    }
  };

  return (
    <div>
      <h2>Crear Persona</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          placeholder="profesion"
          value={profesion}
          onChange={(e) => setProfesion(e.target.value)}
        />
        <input
          placeholder="edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <button type="submit">Crear Persona</button>
      </form>
    </div>
  );
};
export default PersonForm;
