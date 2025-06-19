import express from 'express';
import bodyParser from 'body-parser';
import { sendMailToUser, sendMailToCompany } from './Mailer.js';
import cors from 'cors'

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://murali-portfolio-amber.vercel.app',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sendMailToUser( name, email );
    await sendMailToCompany( name, email, message );
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).send({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
