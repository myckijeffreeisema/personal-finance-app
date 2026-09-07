import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { useTheme } from "./hooks/useTheme"

export const App = () => {
  const theme = useTheme()
  return (
    <div>
      <Toaster theme={theme.theme === "dark" ? "dark" : "light"} richColors/>
      <Outlet />
    </div>
  )
}
