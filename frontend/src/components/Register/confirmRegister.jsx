import React from 'react'
import { Message, Grid } from 'semantic-ui-react'

const Confirmed = () => (
  <Grid centered>
    <Message
      success
      header='Account created, check your email'
    />
  </Grid>
)

export default Confirmed