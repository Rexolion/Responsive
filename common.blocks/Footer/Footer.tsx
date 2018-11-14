import { cn } from "@bem-react/classname";
import * as React from "react";
import "./footer.scss";

export interface IFooterProps {
    className?: string;
    device?: string;
}

export const footer = cn("Footer");
const Navigation = cn("Navigation");

export class Footer extends React.Component {
    public props: IFooterProps;

    public render() {
        return (
            <footer className={this.props.className || footer()}>
                <nav className={`${footer("Nav")} ${Navigation()}`}>
                    <a href="#" className={Navigation("Item", { size: "small" })}>Помощь</a>
                    <a href="#" className={Navigation("Item", { size: "small" })}>Обратная связь</a>
                    <a href="#" className={Navigation("Item", { size: "small" })}>Разработчикам</a>
                    <a href="#" className={Navigation("Item", { size: "small" })}>Условия использования</a>
                    <a href="./_license/license.pdf" className={Navigation("Item", { size: "small" })}>
                        Лицензия
            </a>
                </nav>
            </footer>
        );
    }
}
