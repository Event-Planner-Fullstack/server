'use strict';

const express = require('express');
const router = express.Router();

const { guest } = require('./../models');

router.get('/guest', (request, response, next) => {
  guest.read()
    .then(guestRecords => response.status(200).send(guestRecords))
    .catch(error => next(error));
});

router.get('/guest/:id', (request, response, next) => {
  guest.read({ where: {id: request.params.id} })
    .then(guestRecord => response.status(200).send(guestRecord))
    .catch(error => next(error));
});

router.post('/guest', (request, response, next) => {
  guest.create(request.body)
    .then(foodRecord => response.status(200).send(foodRecord))
    .catch(error => next(error));
});

router.put('/guest/:id', (request, response, next) => {
  guest.update(request.body, request.params.id)
    .then(foodRecord => response.status(200).send(foodRecord))
    .catch(error => next(error));
});

router.delete('/guest/:id', (request, response, next) => {
  guest.delete(request.params.id)
    .then(guestRecord => response.status(200).send(guestRecord));
});

module.exports = router;