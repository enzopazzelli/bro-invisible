import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación
    // y llamar a la función onLogin cuando el inicio de sesión sea exitoso
    // Puedes utilizar bibliotecas como Auth0 o Firebase para la autenticación

    // Ejemplo de llamada a onLogin con éxito
    const user = { email: 'example@example.com', name: 'John Doe' };
    onLogin(user);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
