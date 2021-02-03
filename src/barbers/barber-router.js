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

barberRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    const { state } = req.query;
    if (!state) {
      BarbersService.getAllBarbers(knexInstance)
        .then(barbersdb => {
          res.json(barbersdb.map(serializeBarber));
        })
        .catch(next);
    } else {
      BarbersService.getBarbersByState(knexInstance, state)
        .then(barbersdb => {
          res.json(barbersdb.map(serializeBarber));
        })
        .catch(next);
    }
  })
  .post(bodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
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
      phone_number,
      email,
    };

    if (!barber_name) {
      return res.status(400).json('need name');
    }
    if (!barber_location) {
      return res.status(400).json('need location');
    }
    if (!phone_number && !email) {
      return res.status(400).json('need one method of contact');
    }
    const id = uuid();
    BarbersService.insertBarber(knexInstance, newBarber)
      .then(barber => {
        let { barber_id } = barber;
        let newServices = [];
        for (const item of services) {
          newServices.push({
            barber_id,
            services_id: item,
          });
        }

        BarbersService.insertBarberServices(knexInstance, newServices).then(
          () => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${id}`))
              .json(barber);
          }
        );
      })
      .catch(next);
  });

barberRouter
  .route('/:barber_id')
  .all((req, res, next) => {
    const knexInstance = req.app.get('db');
    console.log('params.barber_id', req.params.barber_id);
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
    res.json(serializeBarber(res.barber));
  })

  .delete((req, res, next) => {
    const knexInstance = req.app.get('db');
    BarbersService.deleteBarber(knexInstance, req.params.barber_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
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
      knexInstance,
      req.params.barber_id,
      barberToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).json().end();
      })
      .catch(next);
  });

module.exports = barberRouter;
