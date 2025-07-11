import { celebrate, Joi, Segments } from 'celebrate';

export const UpdateUserSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    oldPassword: Joi.string(),
    password: Joi.string().optional(),
    password_confirmation: Joi.string()
    .valid(Joi.ref('password'))
    .when(('password'), {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  }),

})
