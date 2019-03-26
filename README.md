# Snapcart Clone

[![Waffle.io - Columns and their card count](https://badge.waffle.io/the-neighborhood/snapcart-clone.svg?columns=all)](https://waffle.io/the-neighborhood/snapcart-clone)

A Snapcart clone for educational purposes

# Overview

In this project I wanted to make a clone of Snapcart. It was supposed to be an app where people will post pictures of their receipts in exchange of rewards. The data from the receipt as well as the user data (age, location, expenditure habit, etc) would have been analyzed to try and predict market conditions.

I wanted to start with a simple app that takes picture of the receipt and converts the image into readable text and stores it for analysis. This much was complete.

The project has two parts:

**A collector**
* React Native app with that just collects the image

**A data-consumer** 
* A python service that's going to do OCR and data wrangling

The collector part has an app and a backend. Entirely Node.js
The data-consumer could be a flask microservice
