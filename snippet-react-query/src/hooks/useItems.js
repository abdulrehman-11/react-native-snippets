/** @format */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchItems,
  fetchItem,
  createItem,
  updateItem,
  deleteItem,
} from "../api/api";

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
};

export const useItem = (id) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id),
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });
};

export const useUpdateItem = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item) => updateItem(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries(["item", id]);
      queryClient.invalidateQueries(["items"]);
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });
};
