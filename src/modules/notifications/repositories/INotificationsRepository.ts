import ICreateNotificantionDTO from '../dtos/ICreateNotificantionDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificantionDTO): Promise<Notification>;
}
