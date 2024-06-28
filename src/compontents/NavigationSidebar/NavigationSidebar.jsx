import React, { useState } from 'react'

import { Button, Menu } from 'antd'
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoGrid, IoReader, IoSettings } from 'react-icons/io5';
import { GrTask } from 'react-icons/gr';

import classes from './NavigationSidebar.module.scss'
const NavigationSidebar = () => {

  const [collapseMenu, setCollapseMenu] = useState(false)

  const menuItems = [
    // { id: 1, label: 'Главная', key: 1, link: '/', icon: <IoHome /> },
    { id: 2, label: 'Планшет', key: 2, link: '/info', icon: <IoGrid size={22} /> },
    { id: 3, label: 'Все курсы', key: 3, link: '/user', icon: <IoReader size={22} /> },
    { id: 4, label: 'Задачи', key: 4, link: '/auth', icon: <GrTask size={22} /> },
    // { id: 5, label: 'Настройки', key: 5, link: '/auth', icon: <IoSettings size={22} /> },
  ]

  const footerMenuItems = [

    { id: 1, label: 'Настройки', key: 1, link: '/auth', icon: <IoSettings size={22} /> },
  ]

  return (
    <div className={classes.sidebar} style={{ minWidth: `${collapseMenu ? '80px' : '250px'}`, maxWidth: `${collapseMenu ? '80px' : '250px'}` }}>
          <div>
            <div style={{ marginLeft: '25px', }}>
              <Button type='text' style={{ color: '#fff' }}
                icon={<GiHamburgerMenu size={18}
                  onClick={() => setCollapseMenu(!collapseMenu)}
                />} />
            </div>

            <Menu theme='dark'
              items={menuItems}
              defaultSelectedKeys={['2']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              inlineCollapsed={collapseMenu}
              className={classes.sidebar_menu}
            />
          </div>

          <Menu theme='dark'
            items={footerMenuItems}
            mode="inline"
            inlineCollapsed={collapseMenu}
            className={classes.sidebar_menu}
          />
        </div>
  )
}

export default NavigationSidebar;