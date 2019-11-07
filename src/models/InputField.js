export default class InputField {
    constructor({label, type, required, defaultValue = "", options = [], classes = ""}) {
        this.label = label
        this.type = type
        this.required = required
        this.defaultValue = defaultValue
        this.options = options,
        this.classes = classes
    }
}