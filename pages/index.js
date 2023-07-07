"use client"

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Participante from '@/components/Participantes'

export default function Home() {
  const [participantes, setParticipantes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");

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

  function agregarParticipante(e) {
    e.preventDefault();
    if (participantes.some((p) => p.nombre === nombre)) {
      alert("El nombre ya existe. Por favor, introduce un nombre único.");
      return;
    }
    setParticipantes((prev) => [...prev, { nombre, contacto }]);
    setNombre("");
    setContacto("");
  }

  function eliminarParticipante(participanteParaEliminar) {
    setParticipantes((prev) =>
      prev.filter((participante) => participante !== participanteParaEliminar)
    );
  }

  async function realizarSorteo() {
    if (participantes.length < 2) {
      alert("Se necesitan al menos 2 participantes para el sorteo.");
      return;
    }

    let mezclado = mezclar([...participantes]);
    for (let i = 0; i < participantes.length; i++) {
      let amigoSecreto = i === participantes.length - 1 ? mezclado[0] : mezclado[i + 1];
      participantes[i].amigoSecreto = amigoSecreto.nombre;
      await enviarCorreo(participantes[i].contacto, `A ${participantes[i].nombre} le tocó ${amigoSecreto.nombre}.`);
    }
  }

  async function enviarCorreo(email, mensaje) {
    const response = await fetch('/api/enviarCorreo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, mensaje }),
    });

    if (!response.ok) {
      throw new Error('Ocurrió un error al enviar el correo');
    }
  }

  return (
    <div>
      <Typography variant="h1">Bro Invisible</Typography>
      <form onSubmit={agregarParticipante}>
        <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
        <TextField value={contacto} onChange={(e) => setContacto(e.target.value)} placeholder="Contacto (Email)" required />
        <Button type="submit">Agregar Participante</Button>
      </form>
      {participantes.map((participante) => (
        <Participante key={participante.nombre} participante={participante} onDelete={eliminarParticipante} />
      ))}
      <Button onClick={realizarSorteo}>Realizar Sorteo</Button>
    </div>
  );
}
