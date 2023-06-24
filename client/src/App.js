import { useState } from 'react'
import Home from './components/Home'
import Admin from './components/Admin'
import SalesLogin from './components/SalesLogin'
import AdminLogin from './components/AdminLogin'
import HOSTURL from './config'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import SnackAlert from './components/SnackBar'
// import Modal from "./components/Modal"

const App = (props) => {
  const [salesLogin, setSalesLogin] = useState(false)
  const [loginSalesError, setLoginSalesError] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const history = useHistory()

  const salesLoginHandler = (name, pass) => {
    setShowSpinner(true)
    if (name === '' || pass === '') {
      setLoginSalesError(true)
      setShowSpinner(false)
      return
    }
    const loginSales = { username: name, password: pass }
    //make an axios call to the database to fetch check user details
    axios
      .post(`${HOSTURL}/user/sales/login`, loginSales)
      .then((resp) => {
        setShowSpinner(false)
        const { verification } = resp.data

        if (verification) {
          setSalesLogin(true)
          setLoginSalesError(false)
          history.push('/home')
        } else {
          setLoginSalesError(true)
        }
      })
      .catch((error) => {
        console.log(error)
        setLoginSalesError(true)
      })
  }
  return (
    <div className='App'>
      <SnackAlert />
      {/* <Modal /> */}
      <Switch>
        <Route path='/' exact>
          <SalesLogin
            loginDetails={salesLoginHandler}
            loginError={loginSalesError}
            showSpinner={showSpinner}
          />
        </Route>
        {salesLogin && (
          <Route path='/home'>
            <Home />
          </Route>
        )}

        <Route path='/admin' exact>
          <Admin />
        </Route>
        <Route path='/admin/login'>
          <AdminLogin />
        </Route>
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default App
