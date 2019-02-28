const Transaction = require('../models/Transaction')

module.exports = function(done){
  if(process.env.NODE_ENV == 'test'){
    Transaction
      .deleteMany({})
      .then(function(){
        done()
      })
      .catch(function(err){
        console.log(err)
      })
  }
}