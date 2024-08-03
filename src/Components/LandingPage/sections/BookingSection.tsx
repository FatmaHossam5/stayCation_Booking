import { Dayjs } from 'dayjs';
import React, { useState } from 'react'
import Date from '../../Date/Date';
import BookingSelector from './BookingSelector';
import AdsSection from './AdsSection';
import Carousel from '../../Carousel/Carousel';

export default function BookingSection() {
    const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  return (
    <>
     <div>
      <Date onDateRangeChange={setSelectedDateRange} />
      <BookingSelector selectedDateRange={selectedDateRange} />
     
    </div>
    
    
    </>
  )
}
