import { compose, withBemMod } from '@bem-react/core'
import { Registry, withRegistry } from '@bem-react/di'
import { container } from '../../common.blocks/Container/Container'
import { footer } from '../../common.blocks/Footer/Footer'
import { header } from '../../common.blocks/Header/Header'
import { IRootProps, root, Root as CommonRoot } from '../../common.blocks/Root/Root'
import { Container } from '../Container/Container'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import './Root.css'

const registry = new Registry({ id: root() })
registry.set(header(), Header)
registry.set(container(), Container)
registry.set(footer(), Footer)

export const Root = compose(
  withBemMod(root(), { device: 'mobile' }),
  withRegistry<IRootProps>(registry)
)(CommonRoot)
