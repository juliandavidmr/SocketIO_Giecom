'use strict';

class Sensor {
  constructor(msg) {
    this.msg = msg;
  }

  get area() {
    return this.msg;
  }
}

module.exports = new Sensor("Hola julian");
