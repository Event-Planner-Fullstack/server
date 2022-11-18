'use strict';

const express = require('express');
const router = express.Router();

const { venue } = require('./../models');

router.get('/venue', (request, response, next) => {
  venue.read()
    .then(venueRecords => response.status(200).send(venueRecords))
    .catch(error => next(error));
});

router.get('/venue/:id', (request, response, next) => {
  venue.read({ where: { id: request.params.id } })
    .then(venueRecord => response.status(200).send(venueRecord))
    .catch(error => next(error));
});

router.post('/venue', (request, response, next) => {
  venue.create(request.body)
    .then(venueRecord => response.status(200).send(venueRecord))
    .catch(error => next(error));
});

router.put('/venue/:id', (request, response, next) => {
  venue.update(request.params.id, request.body)
    .then(venueRecord => response.status(200).send(venueRecord))
    .catch(error => next(error));
});

router.delete('/venue/:id', (request, response, next) => {
  venue.delete(request.params.id)
    .then(venueRecord => response.status(200).send(venueRecord))
    .catch(error => next(error));
});

// get all the venues associated with a user id
router.get('/venue/user/user_id', (request, response, next) => {
  venue.read({ where: { user_id: request.params.user_id } })
    .then(venueRecords => response.status(200).send(venueRecords))
    .catch(error => next(error));
});

module.exports = router;