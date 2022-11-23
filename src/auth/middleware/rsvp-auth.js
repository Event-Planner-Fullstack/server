'use strict';

const { event } = require('../../models');

module.exports = async (req, res, next) => {
  try {

    if (!req.body.inviteCode) { _authError(); }

    const requestedEvent = await event.read({ where: { inviteCode: req.body.inviteCode } });
    if (requestedEvent) {
      req.body.event_id = requestedEvent.id;
    } else {
      _authError();
    }
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('No Event Found');
  }
};