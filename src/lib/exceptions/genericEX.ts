export class GenericEx extends Error {
  constructor(message = "Is Auth required") {
    super(message);
    this.name = "GenericEx";
  }
}
