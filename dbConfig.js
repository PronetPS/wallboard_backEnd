const  config = {
    user:  'sa', // sql user
    password:  'sa', //sql user password
    server:  'localhost', // if it does not work try- localhost
    database:  'BAFL_IN_WB',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'SQLEXPRESS'  // SQL Server instance name
    },
    port:  1433
  }
  
  module.exports = config;