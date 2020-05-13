import mongoose from 'mongoose';

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        return console.log(`Sucesssfully connected to ${db}`);
      })
      .catch(error => {
        console.log('Error conection: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
