import SideBar from "./SideBar"
import TopBar from "./TopBar"
import { Outlet } from "react-router-dom"

function AppShell() {
  return (
    <>
      <TopBar/>
      <SideBar/>
      <Outlet/>
    </>
  )
}

export default AppShell