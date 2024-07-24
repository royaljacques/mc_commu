import { Index } from "..";

export default abstract class BaseEvent {
    constructor(public client: Index, public name: string, public once: boolean = false) { }

    abstract run(...args: any[]): Promise<void>;
}