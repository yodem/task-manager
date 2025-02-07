import { useQuery } from "@tanstack/react-query";
import { api } from "./index";

export const usersKeys = {
  all: ["users"] as const,
  detail: (id: string) => [...usersKeys.all, id] as const,
};

export const tasksKeys = {
  all: ["tasks"] as const,
  detail: (id: string) => [...tasksKeys.all, id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: usersKeys.all,
    queryFn: () => api.getUsers(),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => api.getUser(id),
    enabled: !!id,
  });
}

export function useTasks() {
  return useQuery({
    queryKey: tasksKeys.all,
    queryFn: () => api.getTasks(),
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: tasksKeys.detail(id),
    queryFn: () => api.getTask(id),
    enabled: !!id,
  });
}
