---
title: CareFit
summary: My final degree project. A workout mobile app built with Flutter and Firebase to create routines and track each session.
year: 2023
stack: [Flutter, Dart, Firebase]
cover: ./cover.png
gallery:
  - src: ./screens/01-bienvenida.png
    alt: "Welcome screen with Google, email or anonymous sign-in"
  - src: ./screens/02-inicio-sesion.png
    alt: "Sign-in form"
  - src: ./screens/03-ejercicios.png
    alt: "Exercise catalogue with each muscle group"
  - src: ./screens/04-entrenamientos.png
    alt: "CareFit routines and the user's own routines"
  - src: ./screens/05-editar-rutina.png
    alt: "Editing a routine by day with its exercises"
---

CareFit is a fitness mobile app I built as the final project of my Bachelor's Degree in Computer Science at the University of Andorra. The idea was to bring together a catalogue of well-explained exercises and each person's own routines, and to follow them while training.

## What it does

- **User accounts:** sign-up and sign-in with email or Google, anonymous access and password recovery.
- **Exercise catalogue:** each exercise has an image, muscle group, description, how to perform it and tips.
- **Custom routines:** create, edit and delete routines, choosing the exercises and their sets, reps and weight.
- **Workouts:** start a routine, follow it exercise by exercise and finish it.
- **Profile:** user details and profile picture.

## How it's built

The app is built with **Flutter** and Dart. It uses **Firebase** as its backend: Authentication for accounts, Cloud Firestore for exercises, routines and users, and Storage for images, with a local cache so they load quickly.
