import * as Joi from 'joi';

export default Joi.object({
  email: Joi.string().pattern(/^[\w-.]+@[\w-]+\.+\w{2,4}$/).required(),
  password: Joi.string().min(6).required(),
});
