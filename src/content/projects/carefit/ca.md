---
title: CareFit
summary: El meu treball de fi de grau. Una app mòbil d'entrenament feta amb Flutter i Firebase per crear rutines i registrar cada sessió.
year: 2023
stack: [Flutter, Dart, Firebase]
cover: ./cover.png
---

CareFit és una aplicació mòbil de fitness que vaig desenvolupar com a treball de fi de grau del Grau en Informàtica de la Universitat d'Andorra. La idea era tenir en un sol lloc un catàleg d'exercicis ben explicats i les rutines pròpies de cada persona, i poder seguir-les durant l'entrenament.

## Què fa

- **Comptes d'usuari:** registre i inici de sessió amb correu o amb Google, i recuperació de contrasenya.
- **Catàleg d'exercicis:** cada exercici té imatge, grup muscular, descripció, com executar-lo i consells.
- **Rutines personalitzades:** crear, editar i eliminar rutines, triant els exercicis i les seves sèries, repeticions i pes.
- **Entrenament:** començar una rutina, seguir-la exercici a exercici i finalitzar-la.
- **Perfil:** dades de l'usuari i foto de perfil.

## Com està feta

L'app està desenvolupada en **Flutter** amb Dart. Fa servir **Firebase** com a backend: Authentication per als comptes, Cloud Firestore per a exercicis, rutines i usuaris, i Storage per a les imatges, amb memòria cau local perquè carreguin ràpid.
