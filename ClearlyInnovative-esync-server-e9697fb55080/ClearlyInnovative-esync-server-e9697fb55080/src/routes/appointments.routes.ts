import asyncHandler from 'express-async-handler'
import Router from 'express'

import { Appointments } from '../models/appointments'

export const appointmentsRouter = Router()

// find many
appointmentsRouter.get('/', asyncHandler(async (request, response) => {
  const foundAppointments = await Appointments.find()
  response.json(foundAppointments)
}))

// find one
appointmentsRouter.get('/:id', asyncHandler(async (request, response) => {
  const foundAppointments = await Appointments.findOne({ _id: request.params.id })
  response.json(foundAppointments)
}))

// create one
appointmentsRouter.post('/', asyncHandler(async (request, response) => {
  const createdAppointments = await Appointments.create(new Appointments(request.body))
  response.json(createdAppointments)
}))

// update one
appointmentsRouter.patch('/:id', asyncHandler(async (request, response) => {
  const updatedAppointments = await Appointments.findOneAndUpdate({ _id: request.params.id }, { $set: request.body })
  response.json(updatedAppointments)
}))

// delete one
appointmentsRouter.delete('/:id', asyncHandler(async (request, response) => {
  const deletedAppointments = await Appointments.findByIdAndDelete(request.params.id)
  response.json(deletedAppointments)
}))