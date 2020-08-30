import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.route';
import providersRoutes from '@modules/appointments/infra/http/routes/providers.route';
import usersRouter from '@modules/users/infra/http/routes/users.route';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.route';
import passwordRouter from '@modules/users/infra/http/routes/password.route';
import profileRoutes from '@modules/users/infra/http/routes/profile.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRoutes);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRoutes);

export default routes;
