import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';
import usersRouter from './routes/users.js';
import 'dotenv/config';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
