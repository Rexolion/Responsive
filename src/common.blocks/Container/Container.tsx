import { cn } from '@bem-react/classname'
import { RegistryConsumer } from '@bem-react/di'
import * as React from 'react'
import { IJsonEventData } from "../Card/__interface/card.interface";
import { card, ICardProps } from '../Card/Card'
import './Container.css'


export interface IContainerProps {
  events?: IJsonEventData[],
  device?: string,
  className?: string
}

export const container = cn('Container')

export class Container extends React.Component {
  public props: IContainerProps

  public render() {
    const { events, className, device } = this.props
    if (events === undefined) { throw new Error("Events is undefined"); }
    return (
      <RegistryConsumer>
      { registries => {
        const current = registries[container()]
        const Card = current.get<ICardProps>(card())

        return (
          <main className={className || container()}>
          <div className="Title">Лента событий</div>
          {events.map((event, i: number) => <Card cardData={event} key={i} device={device} />)}
          </main>
        )
      }}
      </RegistryConsumer>
    )
  }
}
