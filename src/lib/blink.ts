import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'saas-time-tracker-u0blit2t',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_q0w7fvgR434bdCjk2bsiQz8Fw7rqx1Y9',
  auth: { mode: 'headless' }
})
