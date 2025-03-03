export interface UseCase<I, R> {
  execute(params: I): Promise<R>;
}
