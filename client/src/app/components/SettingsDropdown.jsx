import React, { useContext, useState } from 'react'
import AppContext from 'app/appContext'
import { withRouter, Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings'
import { logout } from 'app/services/auth'

function SettingsDropdown(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { setAuthenticatedNavigation } = useContext(AppContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    setAuthenticatedNavigation(false)
    props.history.push('/sign-in')
  }

  return (
    <div>
      <SettingsIcon style={{ cursor: 'pointer' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link to={{
            pathname: '/preferences',
            state: { prevPath: props.location.pathname }
          }} style={{ textDecoration: 'none' }}>
            Preferences
          </Link>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default withRouter(SettingsDropdown)