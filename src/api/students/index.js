import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Students, { schema } from './model'

// import validate from 'express-validation';
// import validations from './students/validation';

const router = new Router()
const { firstName, lastName, birthDate, hobbies, photoUrl } = schema.tree

/**
 * @api {post} /students Create students
 * @apiName CreateStudents
 * @apiGroup Students
 * @apiParam firstName Students's firstName.
 * @apiParam lastName Students's lastName.
 * @apiParam birthDate Students's birthDate.
 * @apiParam hobbies Students's hobbies.
 * @apiParam photoUrl Students's photoUrl.
 * @apiSuccess {Object} students Students's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Students not found.
 */
router.post('/',
  body({ firstName, lastName, birthDate, hobbies, photoUrl }),
  create)

/**
 * @api {get} /students Retrieve students
 * @apiName RetrieveStudents
 * @apiGroup Students
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of students.
 * @apiSuccess {Object[]} rows List of students.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /students/:id Retrieve students
 * @apiName RetrieveStudents
 * @apiGroup Students
 * @apiSuccess {Object} students Students's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Students not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /students/:id Update students
 * @apiName UpdateStudents
 * @apiGroup Students
 * @apiParam firstName Students's firstName.
 * @apiParam lastName Students's lastName.
 * @apiParam birthDate Students's birthDate.
 * @apiParam hobbies Students's hobbies.
 * @apiParam photoUrl Students's photoUrl.
 * @apiSuccess {Object} students Students's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Students not found.
 */
router.put('/:id',
  body({ firstName, lastName, birthDate, hobbies, photoUrl }),
  update)

/**
 * @api {delete} /students/:id Delete students
 * @apiName DeleteStudents
 * @apiGroup Students
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Students not found.
 */
router.delete('/:id',
  destroy)

export default router
