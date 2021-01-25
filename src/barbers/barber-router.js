const express = require('express');
const xss = require('xss');
const { v4: uuid } = require('uuid');
const BarbersService = require('./barbers-service');
const barberRouter = express.Router();

const bodyParser = express.json();

const serializeBarber = barber => ({
  barber_id: barber.barber_id,
  barber_name: barber.barber_name,
  barber_location: barber.barber_location,
  services: barber.services,
  phone_number: barber.phone_number,
  email: barber.email,
});

//name, location, website_url, description, phone, email;

barberRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    BarbersService.getAllBarbers(knexInstance).then(barbersdb => {
      res.json(barbersdb.map(serializeBarber));
    });
  })

  .post(bodyParser, (req, res, next) => {
    // const knexInstance = req.app.post('db');

    const {
      barber_name,
      barber_location,
      services,
      phone_number,
      email,
    } = req.body;
    const newBarber = {
      barber_name,
      barber_location,
      services,
      phone_number,
      email,
    };

    // for (const [key, value] of Object.entries(newBarber)) {
    //   if (!barber_name || !barber_location || (!phone_number && !!email)) {
    //     return res.status(400).json({
    //       error: { message: `Missing '${key}' in request body` },
    //     });
    //   }
    // }

    if (!barber_name) {
      // logger.error(`Name is required`);
      return res.status(400).send('need name');
    }
    if (!barber_location) {
      // logger.error(`Location is required`);
      return res.status(400).send('need location');
    }
    if (!phone_number && !email) {
      // logger.error(`Phone number or email is required`);
      return res.status(400).send('need one method of contact');
    }
    const id = uuid();
    BarbersService.insertBarber(req.app.get('db'), newBarber)
      .then(barber => {
        res
          .status(201)
          .location(`http://localhost:8000/barbers/${id}`)
          .json(barber);
      })
      .catch(next);
  });

// then(barbersdb => {
// res.json(barbersdb.map(serializeBarber));

barberRouter
  .route('/:barber_id')
  .all((req, res, next) => {
    const knexInstance = req.app.get('db');
    BarbersService.getById(knexInstance, req.params.barber_id)
      .then(barber => {
        if (!barber) {
          return res.status(404).json({
            error: { message: `Barber does not exist` },
          });
        }
        res.barber = barber; //save the barber for the next middleware
        next(); //call next so the middleware happens!
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json({
      barber_id: res.barber.barber_id,
      barber_name: res.barber.barber_name,
      barber_location: res.barber.barber_location, //sanitize title
      services: res.barber.services, //sanitize content
      phone_number: res.barber.phone_number,
      email: res.barber.email,
    });
  })

  .delete((req, res, next) => {
    BarbersService.deleteBarber(req.app.get('db'), req.params.barber_id)
      .then(() => {
        res.status(204).end();
        console.log('deleting item at ID', req.params.barber_id);
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const {
      barber_id,
      barber_name,
      barber_location,
      services,
      phone_number,
      email,
    } = req.body;
    const barberToUpdate = {
      barber_id,
      barber_name,
      barber_location,
      services,
      phone_number,
      email,
    };

    const numberOfValues = Object.values(barberToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain barber_name, barber_location, services, phone_number or email,`,
        },
      });
    }
    BarbersService.updateBarber(
      req.app.get('db'),
      req.params.barber_id,
      barberToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = barberRouter;
