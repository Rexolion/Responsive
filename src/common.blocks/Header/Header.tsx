import { cn } from '@bem-react/classname'
import * as React from 'react'
import './Header.css'

export interface IHeaderProps {
  className?: string,
  device?: string,
  toggleNav?: () => void
}

export const header = cn('Header')
const nav = cn('Nav')

export class Header extends React.Component {
  public props: IHeaderProps

  public render() {
    return (
      <header className={this.props.className || header()}>
        <div className={header('Container')}>
          <img className={header('Logo')} src="__assets/logo.svg" alt="Яндекс Дом" />
          <span className={nav('MobileIcon')} onClick={this.props.toggleNav}/>
          <nav className={`${header('Nav')} ${nav()}`}>
            <a href="#" className={nav('Item', { size: 'large', active: true } )}>События</a>
            <a href="#" className={nav('Item', { size: 'large'} )}>Сводка</a>
            <a href="#" className={nav('Item', { size: 'large'} )}>Видеонаблюдение</a>
          </nav>
        </div>
      </header>
    )
  }
}
