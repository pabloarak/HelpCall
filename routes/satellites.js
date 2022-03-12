const express = require('express');
const SatellitesService = require('../services/satellites');

const satellitesAPI = (app) => {
  const router = express.Router();

  app.use('/', router);

  const satellitesService = new SatellitesService();

  router.get('/', (req, res, next) => {
    res.json({
      Title: 'Hello World',
    });
  });

  router.post('/topsecret', (req, res, next) => {
    const satellites = req.body.satellites;

    try {
      const distances = satellitesService.getDistances(satellites);
      const messages = satellitesService.getMessages(satellites);
      const position = satellitesService.getShipLocation(distances);
      const message = satellitesService.getShipMessage(messages);

      res.status(200).json({
        position,
        message,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

module.exports = satellitesAPI;
