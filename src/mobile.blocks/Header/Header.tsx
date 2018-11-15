import { withBemMod } from '@bem-react/core'
import * as React from 'react'
import { header, Header as CommonHeader, IHeaderProps } from '../../common.blocks/Header/Header'
import './Header.css'


export const Header = withBemMod<IHeaderProps>(header(), { device: 'mobile' }, (headeree, props) => {
  const newProps = {
    ...props,
    toggleNav: () => document.body.classList.toggle('openNav')
  }

  return <Header {...newProps}/>
})(CommonHeader)
