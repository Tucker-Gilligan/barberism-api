const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeBarbersArray, makeMaliciousBarber } = require('./barbers.fixtures');

describe('Barbers Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db.raw('TRUNCATE barber_services, barber'));

  afterEach('cleanup', () => db.raw('TRUNCATE barber_services, barber'));

  describe(`GET /api/barbers`, () => {
    context(`Given there are barbers in the database`, () => {
      const testBarbers = makeBarbersArray();

      beforeEach('insert barbers', () => {
        return db.into('barber').insert(testBarbers).returning('*');
      });

      it(`Responds with 200 and a list of all of the barbers`, () => {
        return supertest(app).get('/api/barbers').expect(200, testBarbers);
      });
    });
  });

  describe(`GET /?state=barber_location`, () => {
    context(`Given no barbers`, () => {
      it(`responds with 200 and an empty list`, () => {
        const barber_location = 'Alaska';
        return supertest(app)
          .get(`/api/barbers/?state=${barber_location}`)
          .expect(200, []);
      });
    });

    context('Given there are barbers in the database', () => {
      const testBarbers = makeBarbersArray();
      beforeEach('insert barbers', () => {
        return db
          .into('barber')
          .insert(testBarbers)
          .returning('*')
          .then(response => {
            console.log('all barbers from db', response);
          });
      });

      it(`Responds with 200 and a list of barbers`, () => {
        const barber_location = 'Alaska';
        const barber_id = 2;
        const expectedBarber = {
          barber_id: 2,
          barber_name: 'Bob Barber',
          barber_location: 'Alaska',
          services: null,
          phone_number: '000-000-0000',
          email: 'lorem.ipsum@dolor.amet',
        };
        return supertest(app)
          .get(`/api/barbers/?state=${barber_location}`)
          .expect(200, [expectedBarber]);
      });
    });
  });

  describe(`GET /:barber_id`, () => {
    context('Given there are barbers in the database', () => {
      const testBarbers = makeBarbersArray();
      console.log('test barbers', testBarbers);

      beforeEach('insert barbers', () => {
        return db.into('barber').insert(testBarbers).returning('*');
      });

      it('responds with 200 and the specified barber', () => {
        const barberId = 2;
        const expectedBarber = testBarbers[barberId - 1];
        return supertest(app)
          .get(`/api/barbers/${barberId}`)
          .expect(200, expectedBarber)
          .then(console.log('expected barber', expectedBarber));
      });
    });
  });

  describe(`PATCH /:barber_id`, () => {
    context('Given there are barbers in the database', () => {
      const testBarbers = makeBarbersArray();
      beforeEach('insert barbers', () => {
        return db.into('barber').insert(testBarbers).returning('*');
      });

      it('responds with 204 and updates the barber', () => {
        const idToUpdate = 2;
        const updateBarber = {
          barber_name: 'updated barber name',
          barber_location: 'New Jersey',
          phone_number: '123-456-7890',
          email: 'updated@email.updated',
        };

        const expectedBarber = {
          ...testBarbers[idToUpdate - 1],
          ...updateBarber,
        };

        return supertest(app)
          .patch(`/api/barbers/${idToUpdate}`)
          .send(updateBarber)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/barbers/${idToUpdate}`)
              .expect(expectedBarber)
          );
      });
    });
  });

  describe(`DELETE /api/barbers/:barber_id`, () => {
    context(`Given there are barbers in the database`, () => {
      const testBarbers = makeBarbersArray();

      beforeEach('insert barbers', () => {
        return db.into('barber').insert(testBarbers).returning('*');
      });

      it('responds with 204 and removes the barber', () => {
        const barberToRemove = 2;
        const expectedBarbers = testBarbers.filter(
          barber => barber.barber_id !== barberToRemove
        );
        return supertest(app)
          .delete(`/api/barbers/${barberToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app).get(`/api/barbers`).expect(expectedBarbers)
          );
      });
    });
  });
});
