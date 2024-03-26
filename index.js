import { gql } from "apollo-server";
import { ApolloServer, UserInputError } from "apollo-server";
import { v1 as uuid } from "uuid";
import axios from "axios";

const personas = [
  {
    id: 1,
    nombre: "Juancito",
    apellido: "Perez",
    edad: 20,
    profesion: "Desarrollador",
  },
  {
    id: 2,
    nombre: "Mariana",
    apellido: "Gomez",
    edad: 25,
    profesion: "Contadora",
  },
  {
    id: 3,
    nombre: "Pedro",
    apellido: "Fernandez",
    edad: 30,
    profesion: "Dise\u00f1ador",
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "Martinez",
    edad: 35,
    profesion: "Arquitecta",
  },
];

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }
  type FullName {
    nombre: String!
    apellido: String!
  }
  type Person {
    nombre: String!
    apellido: String!
    edad: Int!
    profesion: String!
    id: ID!
    fullName: FullName!
  }
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(nombre: String!): Person
  }

  type Mutation {
    addPerson(
      nombre: String!
      apellido: String!
      edad: Int!
      profesion: String!
    ): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => personas.length,
    allPersons: async () => {
      return personas; // Return the fetched personas.
    },
    findPerson: (root, args) => personas.find((p) => p.nombre === args.nombre),
  },
  Person: {
    nombre: (root) => root.nombre,
    apellido: (root) => root.apellido,
    edad: (root) => root.edad,
    profesion: (root) => root.profesion,
    id: (root) => root.id,
    fullName: (root) => {
      return { nombre: root.nombre, apellido: root.apellido };
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (personas.find((p) => p.nombre === args.nombre)) {
        throw new UserInputError("Persona ya existe", {
          invalidArgs: args.nombre, // Return the invalid arguments to the client.
        }); // Throw an error if the person already exists.
      }
      const person = { ...args, id: uuid() };
      personas.push(person);
      return person; // Return the new person object to the client.
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
