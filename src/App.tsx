import './App.css'
import Calender from '../packages/components/Calender'

function App() {

  return (
    <main>
      <section className='min-h-screen w-auto p-5 bg-orange-50'>
        <div className='p-5 overflow-clip max-w-4xl min-w-3xl'>
          <Calender />
        </div>
      </section>
    </main>
  )
}

export default App
