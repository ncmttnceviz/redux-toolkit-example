import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {unwrapResult} from '@reduxjs/toolkit'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [requestStatus,setRequestStatus] = useState('idle');

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        const addPostResult = await dispatch(addNewPost({title,content,userId}));
        unwrapResult(addPostResult);
      }catch (e) {
        console.error(e)
      }finally {
        setRequestStatus('idle');
        setTitle('');
        setContent('');
      }
    }
  }

  const canSave = [title,content,userId].every(Boolean) && requestStatus === 'idle';

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
