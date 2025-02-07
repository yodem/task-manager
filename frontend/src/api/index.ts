import axios from "axios";
import { TaskStatus } from "./types";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // Add authorization header when auth is implemented
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  email: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  user: User;
}

export const api = {
  async get<T>(path: string): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(path);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Network error occurred"
        );
      }
      throw error;
    }
  },

  async getUsers(): Promise<User[]> {
    return this.get<User[]>("/users");
  },

  async getUser(id: string): Promise<User> {
    return this.get<User>(`/users/${id}`);
  },

  async getTasks(): Promise<Task[]> {
    return this.get<Task[]>("/tasks");
  },

  async getTask(id: string): Promise<Task> {
    return this.get<Task>(`/tasks/${id}`);
  },

  async login(email: string, password: string): Promise<{ token: string }> {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  async register(email: string, password: string): Promise<{ token: string }> {
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  },
};
