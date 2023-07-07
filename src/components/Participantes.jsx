import React from "react";
import { Box, Typography, Button } from "@mui/material";

function Participante({ participante, onDelete }) {
  return (
    <Box my={2}>
      <Typography variant="h6">{participante.nombre}</Typography>
      <Typography variant="body1">{participante.contacto}</Typography>
      <Button variant="outlined" color="secondary" onClick={() => onDelete(participante)}>
        Eliminar
      </Button>
    </Box>
  );
}

export default Participante;
