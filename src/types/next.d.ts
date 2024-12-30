import { Metadata } from 'next';

export type PageParams = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
