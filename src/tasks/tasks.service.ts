import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {

  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return task;
  }

  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = await this.taskRepository.createTask(createTaskDto);

    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find()
  }

  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //
  //   return tasks;
  // }


  //
  // updateTaskStatusById(id: string, status: TaskStatus): Task {
  //   const task: Task = this.getTaskById(id);
  //   task.status = status;
  //
  //   return task;
  // }
  //
  // deleteTaskById(id: string): void {
  //   const foundTask = this.getTaskById(id); // will throw if no id matches
  //   this.tasks = this.tasks.filter(task => task.id !== foundTask.id);
  // }
}
