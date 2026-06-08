import './App.css'
import Calender from '../packages/components/Calender'
import CalenderPage from '../packages/components/CalenderPage'
import YearCalendarView from '../packages/components/YearCalenderView'

function App() {
  
  return (
    <main>
      <section className='min-h-screen w-auto p-5 bg-orange-50'>
        <div className='p-5 overflow-clip max-w-4xl min-w-3xl'>
          <YearCalendarView year={0} />
        </div>
        <div hidden>
          <Calender year={0} initialSeason='Spring' showHeader={false} showNav={false}/>
          <Calender year={0} initialSeason='Summer' showHeader={false} showNav={false}/>
          <Calender year={0} initialSeason='Fall' showHeader={false} showNav={false}/>
          <Calender year={0} initialSeason='Winter' showHeader={false} showNav={false}/>
        </div>
      </section>
    </main>
  )
}

export default App
