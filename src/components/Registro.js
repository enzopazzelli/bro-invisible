import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function Registro({ onRegistro }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  const handleRegistro = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de registro de usuarios
    // y llamar a la función onRegistro cuando el registro sea exitoso
    // Puedes utilizar bibliotecas como Auth0 o Firebase para el registro

    // Ejemplo de llamada a onRegistro con éxito
    const user = { email, nombre };
    onRegistro(user);
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <Button type="submit">Registrar</Button>
      </form>
    </div>
  );
}
