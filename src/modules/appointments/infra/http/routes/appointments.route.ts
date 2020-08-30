import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureSession from '@modules/users/infra/http/middlewares/ensureSession';
import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProvidersAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providersAppointmentsController = new ProvidersAppointmentsController();

appointmentsRouter.use(ensureSession);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;
