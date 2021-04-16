import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAllNotifications, selectAllNotifications} from '../features/notifications/notoficationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);

  const unReadNotifications = notifications.filter((notification)=> notification.isNew === true).length;
  const badge = <span className={'badge'}> {unReadNotifications} </span>;
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to={'/'}>Posts</Link>
            <Link to={'/users'}>Users</Link>
            <Link to={'/notifications'}>Notifications {badge} </Link>
            <button onClick={()=> dispatch(fetchAllNotifications())}>Refresh Notification</button>
          </div>
        </div>
      </section>
    </nav>
  )
}
