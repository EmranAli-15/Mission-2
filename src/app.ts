import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from './app/modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from './app/modules/academicDepartment/academicDepartment.route';
import { courseRoutes } from './app/modules/course/course.route';
import { semesterRegistrationRoutes } from './app/modules/semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from './app/modules/offeredCourse/offeredCourse.route';
import { authRoutes } from './app/modules/auth/auth.route';
const app = express();

app.use(express.json());
app.use(cors());



// /////////////////////////////////////////////////////
// ROUTERS

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
app.use('/api/v1/academic-faculty', academicFacultyRoutes);
app.use('/api/v1/academic-department', academicDepartmentRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/semester-registration', semesterRegistrationRoutes)
app.use('/api/v1/offered-course', offeredCourseRoutes);
app.use('/api/v1/auth', authRoutes);

// //////////////////////////////////////////////////////


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})


app.use((req: Request, res: Response, next) => {
  res.status(404).json({
    message: 'No route found',
  })
})

app.use(globalErrorHandler);

export default app;


