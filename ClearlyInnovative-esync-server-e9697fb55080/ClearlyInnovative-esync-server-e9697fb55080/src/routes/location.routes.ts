import asyncHandler from 'express-async-handler'
import Router from 'express'

import { Location } from '../models/location'

export const locationsRouter = Router()

// find many
locationsRouter.get('/', asyncHandler(async (request, response) => {
  const foundLocations = await Location.find()
  response.json(foundLocations)
}))

// find one
locationsRouter.get('/:id', asyncHandler(async (request, response) => {
  const foundLocation = await Location.findOne({ _id: request.params.id })
  response.json(foundLocation)
}))

// create one
locationsRouter.post('/', asyncHandler(async (request, response) => {
  const createdLocation = await Location.create(new Location(request.body))
  response.json(createdLocation)
}))

// update one
locationsRouter.patch('/:id', asyncHandler(async (request, response) => {
  const updatedLocation = await Location.findOneAndUpdate({ _id: request.params.id }, { $set: request.body })
  response.json(updatedLocation)
}))

// delete one
locationsRouter.delete('/:id', asyncHandler(async (request, response) => {
  const deletedLocation = await Location.findByIdAndDelete(request.params.id)
  response.json(deletedLocation)
}))