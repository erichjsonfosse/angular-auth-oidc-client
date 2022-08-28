export class ErrorBuilder {
  public static buildError(name: string, message: string, caller: string = null) {
    return {
      name: this.buildErrorName(caller, name),
      message
    }
  }

  private static buildErrorName(caller: string = null, name: string): string {
    return caller ? caller + ': ' + name : name;
  }
}
