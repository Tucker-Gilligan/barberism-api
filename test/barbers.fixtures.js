const BarbersService = require('../src/barbers/barbers-service');

function makeBarbersArray() {
  return [
    {
      barber_id: 1,
      barber_name: 'Bill Barber',
      barber_location: 'Alabama',
      phone_number: '000-000-0000',
      email: 'lorem.ipsum@dolor.amet',
    },
    {
      barber_id: 2,
      barber_name: 'Bob Barber',
      barber_location: 'Alaska',
      phone_number: '000-000-0000',
      email: 'lorem.ipsum@dolor.amet',
    },
    {
      barber_id: 3,
      barber_name: 'Edward Scissorhands',
      barber_location: 'Florida',
      phone_number: '000-000-0000',
      email: 'lorem.ipsum@dolor.amet',
    },
    {
      barber_id: 4,
      barber_name: 'Suzy Stylist',
      barber_location: 'Hawaii',
      phone_number: '000-000-0000',
      email: 'lorem.ipsum@dolor.amet',
    },
  ];
}

module.exports = {
  makeBarbersArray,
};
