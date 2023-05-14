require('dotenv').config(); // Required to run test
const { queryMYSQL } = require('../../config/db/mysql');

describe('Test de conexión a MySQL', () => {
  it('- debería de conectarse a base de datos y correr un query sencillo', async () => {
    const { rows } = await queryMYSQL('SELECT NOW()');
    expect(rows.length).toEqual(1);
  });
});
