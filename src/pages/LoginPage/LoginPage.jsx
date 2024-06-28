import React, { useState } from 'react'

import { Input, Typography, Button, Card, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useLazyLoginUserQuery } from '../../services/userService/userService'
import { useDispatch } from 'react-redux'
import { setToken, setUser } from '../../store/reducer/userSlice/userSlice'

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loginUser] = useLazyLoginUserQuery()

  const [messageApi, contextHolder] = message.useMessage();


  const methodLoginUser = () => {

    if (!email || !password) {
      messageApi.error({
        content: 'Поля для заполнения обязательны!'
      })
    } else {
      loginUser({ email, password}).unwrap().then(res => {
        if (res?.ok ){
          localStorage.setItem('token', res.token)
          localStorage.setItem('user', JSON.stringify(res.user))

          dispatch(setUser({user: res.user}))
          dispatch(setToken({token: res.token}))

          navigate('/dashboard/')
        }
      })
    }
  }

  return (

    <div style={{
      width: '450px',
      height: 'max-content',
      // background: '#fff',
      padding: '20px',
      position: 'absolute',
      left: '35vw',
      top: '25vh'
    }}>
      {contextHolder}
      <Card>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <Typography.Title>Авторизация</Typography.Title>
          </div>

          {/* Link to auth */}
          <div>
            <Typography.Text>Нету аккаунта?
              <Typography.Link onClick={() => navigate('/auth/login')}> Зарегистрировать </Typography.Link>
            </Typography.Text>
          </div>

          {/* input form */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div>
              <Typography.Text>Email</Typography.Text>
              <Input name='email' placeholder='Email' value={email} onChange={(el) => setEmail(el.target.value)} />
            </div>
            <div>
              <Typography.Text>Пароль</Typography.Text>
              <Input.Password name='password' placeholder='Пароль' value={password} onChange={(el) => setPassword(el.target.value)} />
            </div>
          </div>

          {/* footer / buttons */}
          <div>
            <Button title='' onClick={() => methodLoginUser()}>Войти</Button>
          </div>

        </div>
      </Card>
    </div>
  )
}
