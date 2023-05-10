import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import FullCalendar from '@fullcalendar/react';
import React from 'react';

// https://fullcalendar.io/docs/google-calendar
function Calendarpg() {
  // Apikey는 환경 변수를 이용해 숨겼다
  const apiKey = process.env.REACT_APP_CAL_API_KEY;

  return (
    <div className="cal-container">
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={apiKey}
        events={{
          googleCalendarId: 'whitesky0109@gmail.com',
        }}
        eventDisplay="block"
        eventTextColor="#FFF"
        eventColor="#F2921D"
        height="660px"
        Toolbar
      />
    </div>
  );
}

export default {
  title: 'Example/FullCalendar',
  component: Calendarpg,
};

const Template = Calendarpg;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Example = Template.bind({});
