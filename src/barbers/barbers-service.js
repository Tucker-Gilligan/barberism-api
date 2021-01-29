const BarbersService = {
  //retrieves all barbers barbers table
  getAllBarbers(db) {
    return db.from('barber').select('*');
  },
  getBarbersByState(db, state) {
    //  return db.select('*').from('barber');
    return (
      db
        .from('barber')
        .select(
          'barber.barber_id',
          'barber_name',
          'barber_location',
          'phone_number',
          'email',
          db.raw(
            "string_agg(distinct services.services_name, ',' order by services.services_name) as services"
          )
        )
        .leftJoin(
          'barber_services',
          'barber_services.barber_id',
          '=',
          'barber.barber_id'
        )
        .leftJoin(
          'services',
          'barber_services.services_id',
          '=',
          'services.services_id'
        )
        // .where({ barber_location: state })
        .where('barber_location', 'ilike', state)
        .groupBy('barber.barber_id')
    );
  },
  insertBarber(db, newBarber) {
    return db
      .insert(newBarber)
      .into('barber')
      .returning('*')
      .then(rows => rows[0]);
  },
  insertBarberServices(db, services) {
    return db
      .insert(services)
      .into('barber_services')
      .returning('*')
      .then(rows => rows[0]);
  },
  getById(db, barber_id) {
    return db.from('barber').select('*').where('barber_id', barber_id).first();
    // return db.select('*').from('barber').where('barber_id', barber_id);
    // .first();
  },
  deleteBarber(db, barber_id) {
    return db
      .select('*')
      .from('barber_services')
      .where('barber_id', barber_id)
      .delete()
      .then(() => {
        return db
          .select('*')
          .from('barber')
          .where('barber_id', barber_id)
          .delete();
      });
  },
  updateBarber(db, barber_id, newBarberFields) {
    return db('barber').where({ barber_id }).update(newBarberFields);
  },
};

module.exports = BarbersService;
