class SatellitesService {
  constructor() {
    this.kenobi = { x: -500, y: -200 };
    this.skywalker = { x: 100, y: -100 };
    this.sato = { x: 500, y: 100 };
    this.ship = { x: 0, y: 0 };
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
    // Second equation
    const a = 1 + Math.pow(q, 2);
    const b = 2 * this.kenobi.x * q - 2 * p * q - 2 * this.kenobi.y;
    const c =
      Math.pow(this.kenobi.x, 2) +
      Math.pow(this.kenobi.y, 2) -
      2 * this.kenobi.x * p +
      Math.pow(p, 2) -
      Math.pow(distances[0], 2);
    // Third equation
    const d = 2 * this.skywalker.x * q - 2 * p * q - 2 * this.skywalker.y;
    const e =
      Math.pow(this.skywalker.x, 2) +
      Math.pow(this.skywalker.y, 2) -
      2 * this.skywalker.x * p +
      Math.pow(p, 2) -
      Math.pow(distances[1], 2);
    // Ship Y position
    this.ship.y = (c * d - e * b) / (a * e - c * a);
    // Ship X position
    this.ship.x = p - q * this.ship.y;
    return this.ship;
  }

  getShipMessage(messages) {
    return '';
  }
}

module.exports = SatellitesService;
