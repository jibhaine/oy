import * as seedrandom from "seedrandom";
/**
 * Encapsulate a random number generator and a human reedable seed string.
 * @see https://github.com/davidbau/seedrandom
 * */
export class Seed {
  rng: seedrandom.prng;
  seedString: string;
  constructor(seed: string, global = false) {
    this.seedString = seed;
    this.rng = seedrandom.default(this.seedString, { global });

    //this.creationDate = moment().now();
  }
  random() {
    return this.rng.double();
  }
}

