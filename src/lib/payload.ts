import { getPayload } from 'payload'
import config from '@/payload.config'

/** Cached Payload client for server components and actions. */
export async function getPayloadClient() {
  return getPayload({ config: await config })
}
