import React from 'react'
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import TicketDetails from '../../../components/TicketDetails';

const Detail = () => {
  return (
    <>
        <Header />
        <Sidebar />
        <div className='absolute top-[5rem] left-56 right-0 bottom-0'>
            <TicketDetails />
        </div>
    </>
  )
}

export default Detail;