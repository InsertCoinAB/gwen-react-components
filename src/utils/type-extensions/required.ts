export type RequiredProps<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>> & Required<Pick<T, U>>
