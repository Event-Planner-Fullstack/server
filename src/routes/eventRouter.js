'use strict';

const express = require('express');
const router = express.Router();

// const bearer = require('./../auth/middleware/bearer-auth');
// const acl = require('./../auth/acl/')

const { event } = require('./../models');

router.get('/event', (request, response, next) => {
  event.read()
    .then(eventRecords => response.status(200).send(eventRecords))
    .catch(error => next(error));
});

router.get('/event/:id', (request, response, next) => {
  event.read({ where: {id: request.params.id} })
    .then(eventRecord => response.status(200).send(eventRecord))
    .catch(error => next(error));
});

router.post('/event', (request, response, next) => {
  event.create(request.body)
    .then(foodRecord => response.status(200).send(foodRecord))
    .catch(error => next(error));
});

router.put('/event/:id', (request, response, next) => {
  event.update(request.params.id, request.body)
    .then(foodRecord => response.status(200).send(foodRecord))
    .catch(error => next(error));
});

router.delete('/event/:id', (request, response, next) => {
  event.delete(request.params.id)
    .then(eventRecord => response.status(200).send(eventRecord));
});

module.exports = router;