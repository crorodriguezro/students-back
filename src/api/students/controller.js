import { success, notFound } from '../../services/response/'
import { Students } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Students.create(body)
    .then((students) => students.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Students.count(query)
    .then(count => Students.find(query, select, cursor)
      .then((students) => ({
        count,
        rows: students.map((students) => students.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Students.findById(params.id)
    .then(notFound(res))
    .then((students) => students ? students.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Students.findById(params.id)
    .then(notFound(res))
    .then((students) => students ? Object.assign(students, body).save() : null)
    .then((students) => students ? students.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Students.findById(params.id)
    .then(notFound(res))
    .then((students) => students ? students.remove() : null)
    .then(success(res, 204))
    .catch(next)
