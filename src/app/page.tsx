'use client'

import { Button } from '@/components/ui/button'
import { CalendarDateRangePicker } from '@/components/ui/calendar-date-range-picker'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { DayPicker } from 'react-day-picker'


export default function Home() {
  return (
    <>
      <h1 className="text-5xl font-bold tracking-tight m-10 text-center">NRFight Better Reservation</h1>

      <div className='flex flex-col gap-10 m-8'>

        <div className='flex flex-col gap-3'>
          <h2>ID des cours à réserver</h2>

          <Input placeholder='ID Cours' className='w-1/3' />
          <Button variant="secondary" className='w-1/3'>Ajouter des cours</Button>
        </div>

        <div className='flex flex-col gap-3'>
          <h2>Jours à exclure</h2>

          <CalendarDateRangePicker />
          <Button variant="secondary" className='w-1/3'>Ajouter des jours à exclure</Button>
        </div>

        <Button>Envoyer</Button>

      </div>
    </>
  )
}
