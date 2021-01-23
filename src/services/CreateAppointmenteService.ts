import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { AppointmentRequest } from './index.d';

class CreateAppointmenteService {
    public async execute({
        date,
        provider_id,
    }: AppointmentRequest): Promise<Appointment> {
        // get appointment repository instance
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        // parse date
        const appointmentDate = startOfHour(date);

        // search appointment with same date
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        // there is an appointment with the same date: throw error
        if (findAppointmentInSameDate !== null) {
            throw Error('This appointment is already booked.');
        }

        // create appointment with information
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        // save appointment
        await appointmentsRepository.save(appointment);

        // return created appointment
        return appointment;
    }
}

export default CreateAppointmenteService;
