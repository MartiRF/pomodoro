import { useState } from "react"
import { Modal } from "./Modal"

export const Config = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState({focus:5,minutos:10})

  const onAplicar = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <div className="flex flex-col m-2 justify-center items-center">
          <h1 className="text-3xl">Configuracion</h1>
          <form className="mt-2">
            <div className="flex flex-col items-center justify-start w-full min-w-[8rem]">
              <div className="flex justify-between w-full pt-1">
                <label>Focus:</label>
                <input
                  className="border-solid border-2 border-yellow-400 rounded-lg"
                  id="minutosFocus"
                  type="number"
                  name="minutosFocus"
                  step="1"
                  min="1"
                  max="59"
                  required />
              </div>
              <div className="flex justify-between w-full pt-1">
                <label >Free:</label>
                <input
                  className="border-solid border-2 border-yellow-400 rounded-lg"
                  id="minutosFree"
                  type="number"
                  name="minutosFree"
                  step="1"
                  min="1"
                  max="59"
                  required />
              </div>
            </div>
            <button onClick={onAplicar} className="btn_primary" type="button">Aplicar</button>
          </form>
        </div>
      </Modal >
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="btn_primary">
        Configuracion
      </button>
    </>
  )
}