export interface WrongAnswer {
    case: string;
    expected: string;
    received: string;
  }
  
  export interface CompilerResult {
    success: boolean;
    wrong_answer?: WrongAnswer[];
    failedCount: number,
    successCount: number,
}