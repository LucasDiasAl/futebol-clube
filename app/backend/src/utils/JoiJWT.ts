import * as Joi from 'joi';

export default Joi.string().pattern(/^\w+.\w+.[\w-]+$/);
