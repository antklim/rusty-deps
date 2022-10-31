import * as action from '@actions/core'
import * as github from '@actions/github'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const timeout = action.getInput('milliseconds')
    action.debug(`Waiting ${timeout} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    action.debug(new Date().toTimeString())
    await wait(parseInt(timeout, 10))
    action.debug(new Date().toTimeString())

    const name = action.getInput('who-to-greet')
    action.info(`Hello ${name}!`)

    action.setOutput('time', new Date().toTimeString())

    const payload = JSON.stringify(github.context.payload, null, 2)
    action.info(`The event payload: ${payload}`)
  } catch (error) {
    if (error instanceof Error) action.setFailed(error.message)
  }
}

run()
