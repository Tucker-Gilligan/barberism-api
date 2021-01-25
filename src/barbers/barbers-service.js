const BarbersService = {
  //retrieves all barbers barbers table
  getAllBarbers(db) {
    return db.select('*').from('barber');
  },
  insertBarber(db, newBarber) {
    return db
      .insert(newBarber)
      .into('barber')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(db, barber_id) {
    return db.from('barber').select('*').where('barber_id', barber_id).first();
    // return db.select('*').from('barber').where('barber_id', barber_id);
    // .first();
  },
  deleteBarber(db, barber_id) {
    return db.select('*').from('barber').where('barber_id', barber_id).delete();
  },
  updateBarber(db, barber_id, newBarberFields) {
    return db('barber').where({ barber_id }).update(newBarberFields);
  },
};

module.exports = BarbersService;
