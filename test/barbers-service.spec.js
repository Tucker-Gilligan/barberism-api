// const { expect } = require('chai');
// const BarbersService = require('../src/barbers/barbers-service');
// const knex = require('knex');
// const { data } = require('../src/logger');

// describe.only(`Articles service object`, function () {
//   let db;

//   let testBarbers = [
//     {
//       id: 1,
//       barber_name: 'tucker',
//       barber_location: 'Merica',
//       services: 'will not fart while cutting your hair',
//       phone_number: '000-000-0000',
//       email: 'asdlkfjasldfkjasdf',
//     },
//     {
//       id: 2,
//       barber_name: 'b',
//       barber_location: 'Merica',
//       services: 'wont mess up',
//       phone_number: '000-000-0000',
//       email: 'asdlkfjasldfkjasdf',
//     },
//     {
//       id: 3,
//       barber_name: 'c',
//       barber_location: 'Merica',
//       services: 'tells inappropriate jokes',
//       phone_number: '000-000-0000',
//       email: 'asdlkfjasldfkjasdf',
//     },
//   ];

//   before(() => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DB_URL,
//     });
//   });

//   before(() => db('barbers').truncate());

//   after(() => db.destroy());

//   context(`Given 'barbers` has data, () => {
//     before(() => {
//       return db.into('barbers').insert(testBarbers);
//     });
//     it(`getAllBarbers from 'barbers' table`, () => {
//       return BarbersService.getAllBarbers(db).then(actual => {
//         expect(actual).to.eql(testBarbers);
//       })
//     })
//   })
// })
