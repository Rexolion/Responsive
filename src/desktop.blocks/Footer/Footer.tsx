import { withBemMod } from '@bem-react/core'
import { footer, Footer as CommonFooter } from '../../common.blocks/Footer/Footer'
import './Footer.css'


export const Footer = withBemMod(footer(), { device: 'desktop' })(CommonFooter)
