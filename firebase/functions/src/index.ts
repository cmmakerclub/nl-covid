import * as functions from 'firebase-functions'

import { _pullData } from './workpoint/'
import { _ingestAll } from './tcgd/'

export const REGION = 'asia-northeast1'

// Cloud Schedule → Cloud Function : Call ingest daily
// https://firebase.google.com/docs/functions/schedule-functions

export const ingest = functions
  .region(REGION)
  .pubsub.schedule('every day 15:00')
  .timeZone('Asia/Bangkok')
  .onRun(async () => {
    console.info(' * Ingest begin at : ', new Date())
    await _pullData().catch(error => console.error(error.response ? JSON.stringify(error.response) : error))
    await _ingestAll().catch(error => console.error(error.response ? JSON.stringify(error.response) : error))
    console.info(' * Ingest end at : ', new Date())
  })
