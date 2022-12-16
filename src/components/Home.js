import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='d-flex justify-content-center pt-5 home' >
      <div className=' w-75'>
        <div className='col-md-6'>
          <h2 style={{ color: '#ffffff', paddingTop: '50px', paddingBottom: '10px' }}>Find Your Covid-19 Report</h2>
           
            <Link to='/report' className='btn homeBtn' >Find Your Report   <FaLongArrowAltRight /> </Link>
        
        </div>
        <div className='col-md-6'>

        </div>
      </div>
    </div>
  )
}
