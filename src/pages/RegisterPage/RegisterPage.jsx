import React, { useState } from 'react'

import { Input, Typography, Button, Card, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useLazyRegisterUserQuery } from '../../services/userService/userService'

export const RegisterPage = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [createUser] = useLazyRegisterUserQuery()

  const [messageApi, contextHolder] = message.useMessage();

  const methodRegisterUser = () => {

    if (!email || !name || !password) {
      messageApi.error({
        content: 'Поля для заполнения обязательны!'
      })
    } else {
      createUser({ email, name, password})
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
            <Typography.Title>Регистрация</Typography.Title>
          </div>

          {/* Link to auth */}
          <div>
            <Typography.Text>Уже зарегистрировались?
              <Typography.Link onClick={() => navigate('/auth/login')}> Авторизуйтесь </Typography.Link>
              или
              <Typography.Link onClick={() => navigate('/auth/reset_pwd')}> Восстановить пароль</Typography.Link>
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
              <Input required name='email' placeholder='Email' value={email} onChange={(el) => setEmail(el.target.value)}/>
            </div>
            <div>
              <Typography.Text>Имя</Typography.Text>
              <Input required name='name' placeholder='Имя' value={name} onChange={(el) => setName(el.target.value)}/>
            </div>
            <div>
              <Typography.Text>Пароль</Typography.Text>
              <Input.Password required name='password' placeholder='Пароль' value={password} onChange={(el) => setPassword(el.target.value)}/>
            </div>
          </div>

          {/* footer / buttons */}
          <div>
            <Button title='' onClick={() => methodRegisterUser()}>Зарегистрироваться</Button>
          </div>

        </div>
      </Card>
    </div>
  )
}
