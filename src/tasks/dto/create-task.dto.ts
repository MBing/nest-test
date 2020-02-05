export class CreateTaskDto {
  title: string;
  description: string;

  constructor(body) {
    this.title = body.title;
    this.description = body.description;
  }
}
