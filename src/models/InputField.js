export default class InputField {
    constructor({label, type, required, defaultValue = "", options = []}) {
        this.label = label
        this.type = type
        this.required = required
        this.defaultValue = defaultValue
        this.options = options
    }
}