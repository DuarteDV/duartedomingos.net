---
title: CareFit
summary: Mi trabajo de fin de grado. Una app móvil de entrenamiento hecha con Flutter y Firebase para crear rutinas y registrar cada sesión.
year: 2023
stack: [Flutter, Dart, Firebase]
cover: ./cover.png
---

CareFit es una aplicación móvil de fitness que desarrollé como trabajo de fin de grado del Grado en Informática de la Universitat d'Andorra. La idea era tener en un solo sitio un catálogo de ejercicios bien explicados y las rutinas propias de cada persona, y poder seguirlas durante el entrenamiento.

## Qué hace

- **Cuentas de usuario:** registro e inicio de sesión con correo o con Google, y recuperación de contraseña.
- **Catálogo de ejercicios:** cada ejercicio tiene imagen, grupo muscular, descripción, cómo ejecutarlo y consejos.
- **Rutinas personalizadas:** crear, editar y eliminar rutinas, eligiendo los ejercicios y sus series, repeticiones y peso.
- **Entrenamiento:** empezar una rutina, seguirla ejercicio a ejercicio y finalizarla.
- **Perfil:** datos del usuario y foto de perfil.

## Cómo está hecha

La app está desarrollada en **Flutter** con Dart. Usa **Firebase** como backend: Authentication para las cuentas, Cloud Firestore para ejercicios, rutinas y usuarios, y Storage para las imágenes, con caché local para que carguen rápido.
