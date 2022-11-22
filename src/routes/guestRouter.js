'use strict';

const express = require('express');
const router = express.Router();

const bearer = require('./../auth/middleware/bearer-auth');
const permissions = require('./../auth/middleware/acl');
const rsvp = require('./../auth/middleware/rsvp-auth');

const { guest } = require('./../models');

router.get('/guest', (request, response, next) => {
  guest.read({}, true)
    .then(guestRecords => response.status(200).send(guestRecords))
    .catch(error => next(error));
});

router.get('/guest/:id', bearer, permissions('rGuest'), (request, response, next) => {
  guest.read({ where: { id: request.params.id } }, false)
    .then(guestRecord => response.status(200).send(guestRecord))
    .catch(error => next(error));
});

router.post('/guest', rsvp, (request, response, next) => {
  guest.create(request.body)
    .then(guestRecord => response.status(200).send(guestRecord))
    .catch(error => next(error));
});

router.put('/guest/:id', bearer, permissions('uGuest'), (request, response, next) => {
  guest.update(request.params.id, request.body)
    .then(guestRecord => response.status(200).send(guestRecord))
    .catch(error => next(error));
});

router.delete('/guest/:id', bearer, permissions('dGuest'), (request, response, next) => {
  guest.delete(request.params.id)
    .then(guestRecord => response.status(200).send(guestRecord));
});

// get all the guests associated with an event id
router.get('/guest/event/:event_id', bearer, permissions('rGuest'), (request, response, next) => {
  guest.read({ where: { event_id: request.params.event_id } }, true)
    .then(guestList => response.status(200).send(guestList))
    .catch(error => next(error));
});

module.exports = router;