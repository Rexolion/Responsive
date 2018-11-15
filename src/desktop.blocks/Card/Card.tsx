import { withBemMod } from '@bem-react/core'
import { card, Card as CommonCard } from '../../common.blocks/Card/Card'
import './Card.css'


export const Card = withBemMod(card(), { device: 'desktop' })(CommonCard)
