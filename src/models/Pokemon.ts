/* eslint-disable camelcase */
export default class Pokemon {
  constructor(
        public id: number,
        public name: string,
        public types: {type: {name: string}}[],
        public sprites: {front_default: string },
  ) {}
}
