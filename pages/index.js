"use client"

import React, { useState } from 'react';
import Login from '@/components/Login';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Participante from '@/components/Participantes'

export default function Home() {
  const [participantes, setParticipantes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [correoError, setCorreoError] = useState(false);
  const [user, setUser] = useState(null);


  // Mezclar los nombres
  function mezclar(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  // Agregar participante
  function agregarParticipante(e) {
    e.preventDefault();

    if (participantes.some((p) => p.nombre === nombre)) {
      alert("El nombre ya existe. Por favor, introduce un nombre único.");
      setNombreError(true);
      return;
    } else {
      setNombreError(false);
    }

    if (!/\S+@\S+\.\S+/.test(contacto)) {
      alert("Por favor, introduce un correo electrónico válido.");
      setCorreoError(true);
      return;
    } else {
      setCorreoError(false);
    }

    setParticipantes((prev) => [...prev, { nombre, contacto }]);
    setNombre("");
    setContacto("");
  }

  // Eliminar participante
  function eliminarParticipante(participanteParaEliminar) {
    setParticipantes((prev) =>
      prev.filter((participante) => participante !== participanteParaEliminar)
    );
  }
  // Realizar sorteo
  async function realizarSorteo() {
    if (participantes.length < 2) {
      alert("Se necesitan al menos 2 participantes para el sorteo.");
      return;
    }
  
    let mezclado = mezclar([...participantes]);
  
    // Asegurarse de que a nadie le toque él mismo
    while (mezclado.some((valor, indice) => valor === participantes[indice])) {
      mezclado = mezclar([...participantes]);
    }
  
    for (let i = 0; i < participantes.length; i++) {
      let amigoSecreto = mezclado[i];
      participantes[i].amigoSecreto = amigoSecreto.nombre;
      await enviarCorreo(participantes[i].contacto, `El amigo invisible de ${participantes[i].nombre} es: ${amigoSecreto.nombre}.`);
    }

     // Después de enviar los correos, limpiar el estado de participantes
     setParticipantes([]);

     // Mostrar una alerta
     alert("El sorteo se ha realizado con éxito y todos los participantes han recibido su amigo invisible al mail.");
  }
  // Enviar correos
  async function enviarCorreo(email, mensaje) {
    const response = await fetch('/api/enviarCorreo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, mensaje }),
    });
  
    // Obtén el cuerpo de la respuesta
    const responseBody = await response.json();
  
    if (!response.ok) {
      // Imprime el cuerpo de la respuesta antes de lanzar el error
      console.error('Error en la respuesta del servidor:', responseBody);
      throw new Error('Hay un error al enviar el correo');
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(https://www.automotivacion.net/wp-content/uploads/2013/09/los-ninos-y-la-amistad_zvr39.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {user ? (
        // Usuario autenticado, mostrar contenido de la aplicación
        <div>
          <Typography variant="h4">Bro Invisible</Typography>
          <form onSubmit={agregarParticipante}>
            <TextField
              error={nombreError}
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setNombreError(false);
              }}
              placeholder="Nombre"
              required
            />
            <TextField
              error={correoError}
              value={contacto}
              onChange={(e) => {
                setContacto(e.target.value);
                setCorreoError(false);
              }}
              placeholder="Contacto (Email)"
              required
            />
            <Button type="submit">Agregar Participante</Button>
          </form>
          {participantes.map((participante) => (
            <div key={participante.nombre}>
              {/* Renderizar cada participante */}
            </div>
          ))}
          <Button onClick={realizarSorteo}>Realizar Sorteo</Button>
        </div>
      ) : (
        // Usuario no autenticado, mostrar formulario de inicio de sesión y registro
        <div>
          <Login onLogin={setUser} />
          <Registro onRegistro={setUser} />
        </div>
      )}
    </Box>
  );
}
