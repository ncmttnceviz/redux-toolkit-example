import React, { useEffect } from 'react'
import {parseISO, formatDistanceToNow} from 'date-fns'
import {selectAllNotifications, readAllNotifications} from './notoficationsSlice';
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice';
import classNames from 'classnames';

export const NotificationsList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const notifications = useSelector(selectAllNotifications);

  useEffect(() => {
    dispatch(readAllNotifications())
  })



  const renderedNotifications = notifications.map((notification)=> {
    const notificationClassName = classNames('notification',{
      new : notification.isNew
    })
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user)=> user.id === notification.user) || {
      name : 'Unknown User'
    }
    return (
      <div className={notificationClassName} key={notification.id}>
        <div> <b>{user.name}</b> <i>{notification.message}</i> </div>
        <div title={'notification-date'}>
          <i> {timeAgo} ago</i>
        </div>
      </div>
    )
  })


  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )

}