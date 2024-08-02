import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
const app = express();

app.use(cors());
app.use(express.json());

// application routes
app.use('/api/v1/student', StudentRoutes);
app.use("/api/v1/users", UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
