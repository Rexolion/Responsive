import { cn } from "@bem-react/classname";
import * as React from "react";
import "./Header.css";

export interface IHeaderProps {
    className?: string;
    device?: string;
    toggleNav?: () => void;
}

export const header = cn("Header");
const navigation = cn("Navigation");

export class Header extends React.Component {
    public props: IHeaderProps;

    public render() {
        return (
            <header className={this.props.className || header()}>
                <div className={header("Container")}>
                    <img className={header("Logo")} src="./_assets/logo.png" alt="Яндекс Дом" />
                    <nav className={`${header("Navigation")} ${navigation()}`}>
                        <a href="#" className={navigation("Item", { size: "large", active: true })}>События</a>
                        <a href="#" className={navigation("Item", { size: "large" })}>Сводка</a>
                        <a href="#" className={navigation("Item", { size: "large" })}>Видеонаблюдение</a>
                    </nav>
                </div>
            </header>
        );
    }
}
