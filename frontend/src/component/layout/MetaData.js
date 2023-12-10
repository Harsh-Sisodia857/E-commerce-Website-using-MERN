import React from 'react'
import Helmet from 'react-helmet';

// To render title dynamically on every page
function MetaData({title}) {
  return (
      <Helmet>
          <title>
              {title}
          </title>
    </Helmet>
  )
}

export default MetaData