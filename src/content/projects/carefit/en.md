---
title: CareFit
summary: My final degree project. A workout mobile app built with Flutter and Firebase to create routines and track each session.
year: 2023
stack: [Flutter, Dart, Firebase]
cover: ./cover.png
---

CareFit is a fitness mobile app I built as the final project of my Bachelor's Degree in Computer Science at the University of Andorra. The idea was to bring together a catalogue of well-explained exercises and each person's own routines, and to follow them while training.

## What it does

- **User accounts:** sign-up and sign-in with email or Google, plus password recovery.
- **Exercise catalogue:** each exercise has an image, muscle group, description, how to perform it and tips.
- **Custom routines:** create, edit and delete routines, choosing the exercises and their sets, reps and weight.
- **Workouts:** start a routine, follow it exercise by exercise and finish it.
- **Profile:** user details and profile picture.

## How it's built

The app is built with **Flutter** and Dart. It uses **Firebase** as its backend: Authentication for accounts, Cloud Firestore for exercises, routines and users, and Storage for images, with a local cache so they load quickly.
