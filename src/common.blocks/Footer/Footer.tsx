import { cn } from '@bem-react/classname'
import * as React from 'react';
import './Footer.css'

export interface IFooterProps {
  className?: string,
  device?: string
}

export const footer = cn('Footer')
const nav = cn('Navigation')

export class Footer extends React.Component {
  public props: IFooterProps

  public render() {
    return (
      <footer className={this.props.className || footer()}>
        <nav className={`${footer('Nav')} ${nav()}`}>
          <a href="#" className={nav('Item', { size: 'small' })}>Помощь</a>
          <a href="#" className={nav('Item', { size: 'small' })}>Обратная связь</a>
          <a href="#" className={nav('Item', { size: 'small' })}>Разработчикам</a>
          <a href="#" className={nav('Item', { size: 'small' })}>Условия использования</a>
          <a href="__license/license.pdf"
          className={nav('Item', { size: 'small' })}>
            Авторские права
          </a>
        </nav>
      </footer>
    )
  }
}
