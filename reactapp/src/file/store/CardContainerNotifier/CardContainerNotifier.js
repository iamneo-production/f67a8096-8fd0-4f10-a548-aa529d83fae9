export default class CardContainerNotifier {

    static _update = false;

    static update() {
        CardContainerNotifier._update = true;
    }

    static get canUpdate() { return CardContainerNotifier._update; }

    static reset() {
        CardContainerNotifier._update = false;
    }
}
