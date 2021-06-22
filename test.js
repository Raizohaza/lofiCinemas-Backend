const jwt = require('jsonwebtoken');
function jwtAuth(id){
  const token = jwt.sign({ id }, 'mySecret');
  console.log(token);
  const decoded = jwt.verify(token, 'mySecret');
  console.log(decoded);
};

jwtAuth(23);
