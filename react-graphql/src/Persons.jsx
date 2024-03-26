import { gql, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(nombre: $nameToSearch) {
      nombre
      apellido
      id
      profesion
      edad
    }
  }
`;

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState(null);

  const showPerson = (nombre) => {
    getPerson({ variables: { nameToSearch: nombre } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.nombre}</h2>
        <p>{person.apellido}</p>
        <p>{person.edad}</p>
        <p>{person.profesion}</p>
        <button onClick={() => setPerson(null)}>Close</button>
      </div>
    );
  }

  if (persons === null) return null;

  return (
    <div>
      {persons.map((person) => (
        <div
          key={person.id}
          onClick={() => {
            showPerson(person.nombre);
            setPerson(person);
          }}
        >
          {person.nombre} {person.apellido}
        </div>
      ))}
    </div>
  );
};

export default Persons;
