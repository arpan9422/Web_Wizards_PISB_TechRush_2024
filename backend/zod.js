const zod = require('zod');
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

// Define signupSchema using CommonJS syntax
module.exports.signupSchema = zod.object({
  email: emailSchema,
  password: passwordSchema,
  // name: nameSchema, // Uncomment and add nameSchema if needed
});

module.exports.loginRouterSchema = zod.object({
  email: emailSchema,
  password: passwordSchema,
  // name: nameSchema, // Uncomment and add nameSchema if needed
});
