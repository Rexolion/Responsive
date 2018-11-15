import { withBemMod } from '@bem-react/core'
import { header, Header as CommonHeader } from '../../common.blocks/Header/Header'
import './Header.css'


export const Header = withBemMod(header(), { device: 'desktop' })(CommonHeader)
