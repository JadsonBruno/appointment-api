import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        // search for appointment with the provided date
        const findAppointment = await this.findOne({
            where: { date },
        });

        // return search result
        return findAppointment || null;
    }
}

export default AppointmentsRepository;
