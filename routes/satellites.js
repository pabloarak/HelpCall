const express = require('express');
const SatellitesService = require('../services/satellites');

const satellitesAPI = (app) => {
  const router = express.Router();

  app.use('/', router);

  const satellitesService = new SatellitesService();

  router.get('/topsecret_split/:satelliteName', (req, res, next) => {
    const { satelliteName } = req.params;
    try {
      console.log(satelliteName);
      const position = 0;
      const message = '';
      res.status(200).json({
        position,
        message,
      });
    } catch (error) {
      next(error);
    }
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
