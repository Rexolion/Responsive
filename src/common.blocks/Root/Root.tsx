import { cn } from "@bem-react/classname";
import { RegistryConsumer } from "@bem-react/di";
import * as React from "react";
import { IJsonEventData } from "../Card/_interface/card.interface";
import { container, IContainerProps } from "../Container/Container";
import { footer, IFooterProps } from "../Footer/Footer";
import { header, IHeaderProps } from "../Header/Header";
import "./Root.css";

export interface IRootProps {
    events: {};
    device?: string;
    className?: string;
}

export const root = cn("Root");

export class Root extends React.Component {
    public props: IRootProps;

    public render() {
        const { events, device, className } = this.props;
        if (container() === undefined) { throw Error; }
        return (
            <RegistryConsumer>
                {(registries) => {
                    const current = registries[root()];
                    const Container = current.get<IContainerProps>(container());
                    const Header = current.get<IHeaderProps>(header());
                    const Footer = current.get<IFooterProps>(footer());

                    return (
                        <main className={className || root()}>
                            <Header device={device} />
                            <Container events={events as IJsonEventData[]} device={device} />
                            <Footer device={device} />
                        </main>
                    );
                }}
            </RegistryConsumer>
        );
    }
}
