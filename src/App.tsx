import { Outlet } from "react-router"
import CommonLayout from "./components/layout/Common.layout"


function App() {


  return (
    <>
      <div>
        <CommonLayout>
          <Outlet />
        </CommonLayout>
      </div>

    </>
  )
}

export default App
