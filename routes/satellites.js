const express = require('express');
const SatellitesService = require('../services/satellites');
const {
  getDistanceAndMessageSchema,
  updateSatelliteSchema,
} = require('../utils/schemas/satellites');
const validationHandler = require('../utils/middleware/validationHandler');

const satellitesAPI = (app) => {
  const router = express.Router();
  const satelliteNamesList = ['kenobi', 'skywalker', 'sato'];

  app.use('/', router);

  const satellitesService = new SatellitesService();

  router.post(
    '/topsecret',
    validationHandler(getDistanceAndMessageSchema),
    (req, res, next) => {
      const satellites = req.body.satellites;

      try {
        const distances = satellitesService.getDistances(satellites);
        const messages = satellitesService.getMessages(satellites);
        const position = satellitesService.getShipLocation(distances);
        const message = satellitesService.getShipMessage(messages);

        if (!position || !message) {
          res.status(404).send('Not found');
        } else {
          res.status(200).json({
            position,
            message,
          });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/topsecret_split/:satelliteName',
    validationHandler(updateSatelliteSchema),
    async (req, res, next) => {
      const { satelliteName } = req.params;
      const satellite = { ...req.body, name: satelliteName };
      try {
        if (satelliteNamesList.includes(satelliteName)) {
          const updatedSatelliteId = await satellitesService.updateSatellite(
            satellite
          );

          const satellites = await satellitesService.getSatellites();

          if (satellites.length === 3) {
            const satellitesDistances = [
              satellites.find((sat) => sat.name === 'kenobi').distance,
              satellites.find((sat) => sat.name === 'skywalker').distance,
              satellites.find((sat) => sat.name === 'sato').distance,
            ];

            const satellitesMessages = [
              satellites.find((sat) => sat.name === 'kenobi').message,
              satellites.find((sat) => sat.name === 'skywalker').message,
              satellites.find((sat) => sat.name === 'sato').message,
            ];

            const distances =
              satellitesService.getDistances(satellitesDistances);
            const messages = satellitesService.getMessages(satellitesMessages);
            const position = satellitesService.getShipLocation(distances);
            const message = satellitesService.getShipMessage(messages);

            if (!position || !message) {
              res.status(404).send('Not found');
            } else {
              await await satellitesService.deleteAll();
              
              res.status(200).json({
                position,
                message,
              });
            }
          } else {
            res.status(201).json({
              data: updatedSatelliteId,
              message:
                'Information entered. It is necessary to enter the information of the 3 satellites (kenobi, skywalker and sato) to obtain the position and the message of the ship.',
            });
          }
        } else {
          res
            .status(404)
            .send(
              'The name of the satellite can only be: kenobi, skywalker or sato.'
            );
        }
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/topsecret_split/:satelliteName',
    validationHandler(updateSatelliteSchema),
    async (req, res, next) => {
      const { satelliteName } = req.params;
      const satellite = { ...req.body, name: satelliteName };
      try {
        if (satelliteNamesList.includes(satelliteName)) {
          const updatedSatelliteId = await satellitesService.updateSatellite(
            satellite
          );

          const satellites = await satellitesService.getSatellites();

          if (satellites.length === 3) {
            const satellitesDistances = [
              satellites.find((sat) => sat.name === 'kenobi').distance,
              satellites.find((sat) => sat.name === 'skywalker').distance,
              satellites.find((sat) => sat.name === 'sato').distance,
            ];

            const satellitesMessages = [
              satellites.find((sat) => sat.name === 'kenobi').message,
              satellites.find((sat) => sat.name === 'skywalker').message,
              satellites.find((sat) => sat.name === 'sato').message,
            ];

            const distances =
              satellitesService.getDistances(satellitesDistances);
            const messages = satellitesService.getMessages(satellitesMessages);
            const position = satellitesService.getShipLocation(distances);
            const message = satellitesService.getShipMessage(messages);

            if (!position || !message) {
              res.status(404).send('Not found');
            } else {
              res.status(200).json({
                position,
                message,
              });
            }
          } else {
            res.status(201).json({
              data: updatedSatelliteId,
              message:
                'Information entered. It is necessary to enter the information of the 3 satellites (kenobi, skywalker and sato) to obtain the position and the message of the ship.',
            });
          }
        } else {
          res
            .status(404)
            .send(
              'The name of the satellite can only be: kenobi, skywalker or sato.'
            );
        }
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = satellitesAPI;
