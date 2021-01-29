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

// const maliciousBarber = {
//   barber_id: 911,
//   barber_name: 'Taking over your computer in 3...2...1...',
//   barber_location: 'Colorado',
//   phone_number: 'Naughty naughty very naughty <script>alert("xss");</script>',
//   email:
//     '`Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`',
// };
// const expectedBarber = {
//   ...maliciousBarber,
//   barber_id: 911,
//   barber_name: 'Taking over your computer in 3...2...1...',
//   phone_number: 'Naughty naughty very naughty <script>alert("xss");</script>',
//   email:
//     '`Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`',
// };
// return {
//   maliciousBarber,
//   expectedBarber,
// };
// }

module.exports = {
  makeBarbersArray,
  // makeMaliciousBarber,
};
