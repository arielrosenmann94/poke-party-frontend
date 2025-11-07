# Poké Party — Frontend

Interfaz moderna tipo Pokédex futurista para organizar tu escuadrón Pokémon.
Construida con React + Vite + TypeScript.

Permite:

Capturar Pokémon aleatorios desde PokeAPI

Ver estadísticas y tipos

Armar un equipo Party (máx. 6)

Guardar el resto en Box

Optimizar equipo automáticamente

## Requisitos

Node.js 24.x

npm 11.x

Backend de Poké Party en ejecución
https://github.com/arielrosenmann94/poke-party-backend.git

 ## Instalación

Clonar repositorio

git clone 
[<TU-USUARIO>/poke-party-frontend.git](https://github.com/arielrosenmann94/poke-party-backend.git)
cd poke-party-frontend

Instalar dependencias

npm install

## Variables de entorno

Crear archivo .env en la raíz:

VITE_API_URL=http://localhost:4000

Modificar en caso de usar otro host/puerto.

## Ejecutar la app

Modo desarrollo:

npm run dev

Abrir en el navegador:
http://localhost:5173

Compilar para producción:

npm run build

Vista previa prod:

npm run preview

## Features principales

✔ UI estilo Pokédex futurista
✔ Captura Pokémon aleatorios
✔ Traducción de tipos al español
✔ Party limitada a 6 (máximo permitido)
✔ Box secundario
✔ Estadísticas visuales
✔ Botones animados
✔ Integración completa con backend

## Organización del proyecto

poke-party-frontend
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── PokemonCard.tsx
│ │ ├── StatsList.tsx
│ │ └── TypePicker.tsx
│ ├── styles/
│ ├── utils/
│ ├── api.ts
│ ├── types.ts
│ ├── App.tsx
│ └── main.tsx
├── .env
├── package.json
└── README.md

## Scripts disponibles

npm run dev
→ Desarrollo

npm run build
→ Producción

npm run preview
→ Previsualizar build

## Integración con backend

El frontend consume el backend vía REST.
Configuración en .env:

VITE_API_URL=http://localhost:4000

El backend debe estar corriendo antes de usar la UI.

## Estado del proyecto

Este frontend cumple con:

Integración con PokeAPI (vía backend)

UI responsiva moderna

Muestra estadísticas y tipos

Party y Box con sus límites

Instalación y ejecución documentadas

Código modular y limpio

Experiencia visual atractiva
