import React from 'react'
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from '@syncfusion/ej2-react-schedule'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'
import './Calendar.css'

const Calendar = () => {
  let scheduleObj
  let calendarId =
    'abc19d60485f10b1c9ce265a2cabe5584c5ae09e8cfb10c3bd0a808a116e5395@group.calendar.google.com'
  let apiKey = 'AIzaSyAdnfdQSML8nInKuAQFa3MK4sueDrLzOUo'
  const dataManger = new DataManager({
    url:
      'https://www.googleapis.com/calendar/v3/calendars/' +
      calendarId +
      '/events?key=' +
      apiKey,
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  })
  function onDataBinding(e) {
    let items = e.result.items
    let scheduleData = []
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        let event = items[i]
        let when = event.start.dateTime
        let start = event.start.dateTime
        let end = event.end.dateTime
        if (!when) {
          when = event.start.date
          start = event.start.date
          end = event.end.date
        }
        scheduleData.push({
          Id: event.id,
          Subject: event.summary,
          StartTime: new Date(start),
          EndTime: new Date(end),
          IsAllDay: !event.start.dateTime,
        })
      }
    }
    e.result = scheduleData
  }

  return (
    <div className='m-4'>
      {/* <ScheduleComponent currentView='Month'>
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        ></Inject>
      </ScheduleComponent> */}

      <ScheduleComponent
        ref={(schedule) => (scheduleObj = schedule)}
        // width='100%'
        height='550px'
        // selectedDate={new Date(2018, 10, 14)}
        currentView='Month'
        readonly={true}
        eventSettings={{ dataSource: dataManger }}
        dataBinding={onDataBinding}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  )
}

export default Calendar
