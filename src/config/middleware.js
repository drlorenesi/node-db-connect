const express = require('express');
const morgan = require('morgan');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.static('./src/public'));
  if (process.env.ENTORNO === 'desarrollo') {
    app.use(morgan('dev'));
  }
  if (process.env.ENTORNO === 'produccion') {
    app.use(helmet());
    app.use(compression());
  }
};
