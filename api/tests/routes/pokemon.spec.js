/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  beforeEach(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  before(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
  describe('GET /pokemons/create', () => {
    it('should get 200', () =>
      agent.get('/pokemons/create').expect(400)
    );
  });
  describe('GET /pokemons/1', () => {
    it('should get 200', () =>
      agent.get('/pokemons/1').expect(200)
    );
  });
  describe('GET single Pokemon', () => {
    it('should get 200', () =>
      agent.get('/pokemons?name=pikachu')
      .expect(200)
    );
    it('should get a JSON', () => {
      agent.get('/pokemons?name=pikachu')
      .expect('Content-Type', /text/)
    });
    it("should get 1 element", () => {
      agent.get('/pokemons?name=pikachu')
      .expect('Content-Length', '20')
    })
  });
});
