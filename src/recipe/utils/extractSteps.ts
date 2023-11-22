import { AnalyzedInstruction } from '../types/recipe-api-types';

export const extractSteps = (steps: AnalyzedInstruction[]): string => {
  let allSteps: string = '';
  const instructions = steps[0].steps;

  for (let i = 0; i < instructions.length; i++) {
    allSteps = allSteps + instructions[i].step + ' ';
  }

  return allSteps;
};
