import React from 'react'
import { Message } from 'semantic-ui-react'

const Confirmed = () => (
  <Message compact
    success
    header='Your email address has been successfully confirmed'
    content='You may now log-in with the email you have chosen'
  />
)

export default Confirmed