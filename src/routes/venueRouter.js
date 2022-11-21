'use strict';

const express = require('express');
const router = express.Router();

const bearerAuth = require('./../auth/middleware/bearer-auth');
const permissions = require('./../auth/middleware/acl');

const { venue } = require('./../models');

router.get('/venue', bearerAuth, permissions('all'), (request, response, next) => {
  venue.read({}, true)
    .then(venueRecords => response.status(200).send(venueRecords))
    .catch(error => next(error));
});

router.get('/venue/:id', bearerAuth, permissions('rVenue'), (request, response, next) => {
  venue.read({ where: { id: request.params.id } }, false)
    .then(venueRecord => response.status(200).send(venueRecord))
    .catch(error => next(error));
});

router.post('/venue', bearerAuth, permissions('cVenue'), (request, response, next) => {
  venue.create(request.body)
    .then(venueRecord => response.status(200).send(venueRecord))
    .catch(error => next(error));
});

router.put('/venue/:id', bearerAuth, permissions('uVenue'), (request, response, next) => {
  venue.update(request.params.id, request.body)
    .then(venueRecord => response.status(200).send(venueRecord))
    .catch(error => next(error));
});

router.delete('/venue/:id', bearerAuth, permissions('dVenue'), (request, response, next) => {
  venue.delete(request.params.id)
    .then(venueRecord => response.status(200).send(venueRecord))
    .catch(error => next(error));
});

// get all the venues associated with a user id
router.get('/venue/user/:vendor_id', bearerAuth, permissions('rVenue'), (request, response, next) => {
  venue.read({ where: { vendor_id: request.params.vendor_id } }, true)
    .then(venueRecords => response.status(200).send(venueRecords))
    .catch(error => next(error));
});

module.exports = router;