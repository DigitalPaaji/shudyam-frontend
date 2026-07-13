import React, { Suspense } from 'react'
import FullCheckOutCompo from './FullCheckOutCompo'

const page = () => {
  return (
    <div>
<Suspense fallback={"<div>Loading....</div>"}>
<FullCheckOutCompo />
</Suspense>
    </div>
  )
}

export default page