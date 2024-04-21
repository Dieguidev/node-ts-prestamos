import 'dotenv/config'
import { get } from 'env-var'


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  URL_SWAGGER: get('URL_SWAGGER').required().asString(),
}
