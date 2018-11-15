import { compose, withBemMod } from '@bem-react/core'
import { Registry, withRegistry } from '@bem-react/di'
import { card } from '../../common.blocks/Card/Card'
import { container, Container as CommonContainer, IContainerProps } from '../../common.blocks/Container/Container'
import { Card } from '../Card/Card'
import './Container.css'


const registry = new Registry({ id: container() })
registry.set(card(), Card)

export const Container = compose(
  withBemMod(container(), { device: 'mobile' }),
  withRegistry<IContainerProps>(registry)
)(CommonContainer)
