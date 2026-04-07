const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saloni:KEjr7FehAX3oaC8C@neighbourhood-security.kcujzhs.mongodb.net/security_db?retryWrites=true&w=majority');
const User = require('./backend/models/User');

async function run() {
  await User.updateOne({ email: 'admin@test.com' }, { role: 'admin' }, { upsert: true });
  console.log('Admin user created/updated');
  mongoose.disconnect();
}
run();

