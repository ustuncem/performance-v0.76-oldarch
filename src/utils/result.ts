export default class Result<T> {
  code: number;
  data: T | null;
  message: string;

  private constructor(code: number, data: T | null, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }

  static success<T>(data: T | null = null, code: number = 200, message: string = ''): Result<T> {
    return new Result<T>(code, data, message);
  }

  static error<T>(
    message: string = 'An error occurred',
    code: number = 500,
    data: T | null = null
  ): Result<T> {
    return new Result<T>(code, data, message);
  }
}
