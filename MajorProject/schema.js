const Joi = require("joi");


module.exports.listingSchema=Joi.object({      // validation schema using joi that these objects should be required to continue ( this one is for form data)
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().allow("",null),
        price:Joi.number().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
    }).required(),
});


module.exports.reviewSchema = Joi.object({    // validation schema using joi that these objects should be required to continue ( this one is for form reviews)
   review: Joi.object({
      rating:Joi.number().required().min(1).max(5),
      comment:Joi.string().required(),

   }).required(),

});