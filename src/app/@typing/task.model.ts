export interface UserListResponse {
  success: boolean;
  users: UserList[];
}

export interface UserList {
  id: number;
  name: string;
  picture: string;
}

export interface CreateNewTask {
  message: string;
  due_date?: string;
  priority?: number;
  assigned_to?: number | string;
}

export interface UpdateTask extends CreateNewTask {
  taskid?: string;
}
