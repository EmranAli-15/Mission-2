import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
const app = express();

console.log(process.cwd());

app.use(express.json());
app.use(cors());



// /////////////////////////////////////////////////////
// ROUTERS

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
// //////////////////////////////////////////////////////


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next) => {
  res.status(404).json({
    message: 'No route found',
  })
})

export default app;


