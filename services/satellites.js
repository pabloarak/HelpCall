const MongoLib = require('../lib/mongo');

class SatellitesService {
  constructor() {
    this.collection = 'satellites';
    this.mongoDB = new MongoLib();
    this.kenobi = { x: -500, y: -200 };
    this.skywalker = { x: 100, y: -100 };
    this.sato = { x: 500, y: 100 };
    this.ship = { x: 0, y: 0 };
  }

  async updateSatellite(satellite) {
    console.log(satellite);
    const createdSatelliteId = await this.mongoDB.update(
      this.collection,
      satellite.name,
      satellite
    );
    return createdSatelliteId;
  }

  async getSatellites() {
    const satellites = await this.mongoDB.getAll(this.collection);
    return satellites || [];
  }

  async deleteAll() {
    const deleteResponse = await this.mongoDB.delete(this.collection);
    return deleteResponse;
  }

  getDistances(satellites) {
    const distances = satellites.map((satellite) => satellite.distance);
    return distances;
  }

  getMessages(satellites) {
    const messages = satellites.map((satellite) => satellite.message);
    return messages;
  }

  getShipLocation(distances) {
    // First equation (ship.x)
    const p =
      (Math.pow(distances[1], 2) -
        Math.pow(distances[0], 2) +
        Math.pow(this.kenobi.x, 2) -
        Math.pow(this.skywalker.x, 2) +
        Math.pow(this.kenobi.y, 2) -
        Math.pow(this.skywalker.y, 2)) /
      (2 * (this.kenobi.x - this.skywalker.x));
    const q =
      (this.kenobi.y - this.skywalker.y) / (this.kenobi.x - this.skywalker.x);
    // Get second grade equation
    const a = 1 + Math.pow(q, 2);
    const b = 2 * this.sato.x * q - 2 * p * q - 2 * this.sato.y;
    const c =
      Math.pow(this.sato.x, 2) +
      Math.pow(this.sato.y, 2) -
      2 * this.sato.x * p +
      Math.pow(p, 2) -
      Math.pow(distances[2], 2);
    // Calculation of the second degree equation for Y point of the ship
    const shipY1 = Math.round(
      (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
    );
    const shipY2 = Math.round(
      (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
    );

    if (!shipY1 && !shipY2) {
      return null;
    } else if (shipY1 && !shipY2) {
      this.ship.y = shipY1;
      this.ship.x = p - q * shipY1;
    } else if (shipY2 && !shipY1) {
      this.ship.y = shipY2;
      this.ship.x = p - q * shipY2;
    } else {
      const shipX1 = Math.round(p - q * shipY1);
      const shipX2 = Math.round(p - q * shipY2);

      const distanceWithShipX1Y1 = Math.sqrt(
        Math.pow(this.sato.x - shipX1, 2) + Math.pow(this.sato.y - shipY1, 2)
      );

      const distanceWithShipX2Y2 = Math.sqrt(
        Math.pow(this.sato.x - shipX2, 2) + Math.pow(this.sato.y - shipY2, 2)
      );

      if (Math.round(distanceWithShipX1Y1 * 100) / 100 === distances[2]) {
        this.ship.x = shipX1;
        this.ship.y = shipY1;
      } else if (
        Math.round(distanceWithShipX2Y2 * 100) / 100 ===
        distances[2]
      ) {
        this.ship.x = shipX2;
        this.ship.y = shipY2;
      }
    }

    return this.ship;
  }

  getShipMessage(messages) {
    // I assume that the array containing the message has the same length on each satellite.
    const message = messages.reduce((accum, message) => {
      if (accum.length === 0) {
        return [...message];
      }

      let newArray = [];

      for (let i = 0; i < accum.length; i++) {
        if (accum[i] !== '') {
          if (accum[i] === message[i]) {
            newArray.push(accum[i]);
          } else {
            if (message[i] === '') {
              newArray.push(accum[i]);
            } else {
              newArray.push('');
            }
          }
        } else if (message[i] !== '') {
          newArray.push(message[i]);
        } else {
          newArray.push('');
        }
      }

      return [...newArray];
    }, []);

    if (!message || message.length === 0) {
      return null;
    }

    const finalMessage = message.join(' ');
    return finalMessage;
  }
}

module.exports = SatellitesService;
