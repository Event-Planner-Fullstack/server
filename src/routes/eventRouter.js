'use strict';

const express = require('express');
const router = express.Router();

const bearerAuth = require('./../auth/middleware/bearer-auth');
const permissions = require('./../auth/middleware/acl');

const { event } = require('./../models');

router.get('/event', bearerAuth, permissions('all'), (request, response, next) => {
  event.read({}, true)
    .then(eventRecords => response.status(200).send(eventRecords))
    .catch(error => next(error));
});

router.get('/event/:id', bearerAuth, permissions('rEvent'), (request, response, next) => {
  event.read({ where: { id: request.params.id } }, false)
    .then(eventRecord => response.status(200).send(eventRecord))
    .catch(error => next(error));
});

router.post('/event', bearerAuth, permissions('cEvent'), (request, response, next) => {
  event.create(request.body)
    .then(eventRecord => response.status(200).send(eventRecord))
    .catch(error => next(error));
});

router.put('/event/:id', bearerAuth, permissions('uEvent'), (request, response, next) => {
  event.update(request.params.id, request.body)
    .then(eventRecord => response.status(200).send(eventRecord))
    .catch(error => next(error));
});

router.delete('/event/:id', bearerAuth, permissions('dEvent'), (request, response, next) => {
  event.delete(request.params.id)
    .then(eventRecord => response.status(200).send(eventRecord))
    .catch(error => next(error));
});

// get all the events associated with a user id
router.get('/event/user/:client_id', bearerAuth, permissions('rEvent'), (request, response, next) => {
  event.read({ where: { client_id: request.params.client_id } }, true)
    .then(userEvents => response.status(200).send(userEvents))
    .catch(error => next(error));
});

// get all the events associated with a venue id
router.get('/event/venue/:venue_id', bearerAuth, permissions('rEvent'), (request, response, next) => {
  event.read({ where: { venue_id: request.params.venue_id } }, true)
    .then(eventRecords => response.status(200).send(eventRecords))
    .catch(error => next(error));
});

module.exports = router;