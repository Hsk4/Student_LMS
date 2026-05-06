import './App.css'
import { useState } from 'react'
import Button from './components/common/Button'
import Modal from './components/common/Modal'
function App() {
const [isOpen, setIsOpen] = useState(false)
  return (
    <>


    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Modal Title</h2>
        <p>This is modal content.</p>

        <div className="mt-4">
          <Button onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  
  </>

    
  )
}

export default App
