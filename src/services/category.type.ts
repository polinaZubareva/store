import { Category } from '../models';

type TCategory = {
  ok: boolean;
  error?: Error;
  value: Category | null;
};

type TDeletedCategory = {
  ok: boolean;
  error?: Error;
  value: number | null;
};

type TUpdatedCategory = {
  ok: boolean;
  error?: Error;
  value: Category[] | null;
};

export { type TCategory, type TDeletedCategory, type TUpdatedCategory };
