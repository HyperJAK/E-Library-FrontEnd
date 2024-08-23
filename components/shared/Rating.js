import React from 'react'

import {random} from 'nanoid'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import {yellow} from '@mui/material/colors'

export default function Rating({rating, fontSize}) {
  const addStars = () => {
    var indents = []
    for (var i = 0; i < rating; i++) {
      indents.push(
        <StarRoundedIcon
          key={i + random(1, 10000)}
          sx={{color: yellow[500]}}
          fontSize={fontSize ? fontSize : 'large'}
        />
      )
    }
    return indents
  }

  return addStars()
}
