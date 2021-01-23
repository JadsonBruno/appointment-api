import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmenteService from '../services/CreateAppointmenteService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// create appointment router
const appointmentsRouter = Router();

// use authenticated middleware in all appointments routes
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
    // get appointments repository
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // get all appointments from database
    const appointments = await appointmentsRepository.find();

    // return existing appointments
    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        // get appointments attributes from body
        const { provider_id, date } = req.body;

        // parse date to a usable value
        const parsedDate = startOfHour(parseISO(date));

        // get appointment service instance
        const createAppointment = new CreateAppointmenteService();

        // create appointment with the provided attributes
        const appointment = await createAppointment.execute({
            provider_id,
            date: parsedDate,
        });

        // return created appointment
        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
