"use client"

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Participante from '@/components/Participantes'

export default function Home() {
  const [participantes, setParticipantes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [correoError, setCorreoError] = useState(false);


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
    <div>
      <Typography variant="h4">Bro Invisible</Typography>
      <form onSubmit={agregarParticipante}>
        <TextField
          error={nombreError}
          value={nombre}
          onChange={(e) => { setNombre(e.target.value); setNombreError(false); }}
          placeholder="Nombre"
          required
        />{" "}
        <TextField
          error={correoError}
          value={contacto}
          onChange={(e) => { setContacto(e.target.value); setCorreoError(false); }}
          placeholder="Contacto (Email)"
          required
        />

        <Button type="submit">Agregar Participante</Button>
      </form>
      {participantes.map((participante) => (
        <Participante key={participante.nombre} participante={participante} onDelete={eliminarParticipante} />
      ))}
      <Button onClick={realizarSorteo}>Realizar Sorteo</Button>
    </div>
  );
}
