import { useDispatch, useSelector } from 'react-redux';
import { setFilters, setTitle } from "../store/FiltersSlice";

export function useFilters() {
  const filters = useSelector((state: any) => state.filters);
  const dispatch = useDispatch();

  const updateFilters = (newFilters: any) => {
    // Обновляет фильтры в Redux
    dispatch(setFilters(newFilters));
  };

  const updateTitle = (newTitle: string) => {
    dispatch(setTitle(newTitle)); // Используйте экшн setTitle из filtersSlice
  };

  // Напишите дополнительные функции здесь, если нужно специфичное обращение к фильтрам

  return { filters, updateFilters, updateTitle};
}